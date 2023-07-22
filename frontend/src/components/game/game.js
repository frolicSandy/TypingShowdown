import React from 'react';
import Rocket from '../rocket/rocket';
import _ from 'lodash';

class Game extends React.Component {
    constructor(props) {
      super(props);
      let { phrase, phraseLength, socket, gameId, players } = this.props;
      this.state = {
        socket,
        phrase,
        phraseLength,
        difficulty: "easy",
        duration: 60, 
        incorrectLetters: [],
        correctLetters: [],
        timeElapsed: 0.001,
        typedEntries: 0,
        players,
        wordsPerMin: 0,
        mistakes: 0,
        countdown: 0,
        countdownTimer: "5...",
        gameId,
        gameWon: false,
        timer: 0,
        interval: "",
        timerInterval: "",
        ignoreKeys: ['Alt', 'Meta', 'Tab', 'Control','Shift','CapsLock', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'],
      };
      this.incrementTime = this.incrementTime.bind(this);
      this.decreaseTimer = this.decreaseTimer.bind(this);
      this.detectKeyPresses = this.detectKeyPresses.bind(this);
      this.sendProgress = this.sendProgress.bind(this);
      this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
      this.handleDurationChange = this.handleDurationChange.bind(this);
    }

    componentDidMount() {
      document.title = "Typing Showdown | Game";
      document.addEventListener("keydown", this.detectKeyPresses);
      if (this.props.type === "multiplayer") {
        this.countownTimer();
      }
      this.state.socket.on('receive_progress', (data) => {
        if (this.props.type === 'practice'){
          this.setState({ players: {} });
        }
        if (data.gameId === this.state.gameId){
          let playerProgress = this.state.players;
          playerProgress[data.playerId] = data;
          this.setState({ players: playerProgress });
        }
      });
    }

    componentDidUpdate() {
      this.checkInput();
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.detectKeyPresses);
      this.props.clearCurrentGame();      
    }

    handleDifficultyChange(e) {
      this.setState({ difficulty: e.target.value });
      
      if (e.target.value === "hard") {
        let newPhrase = this.props.phrase;
        newPhrase = newPhrase.join("");
        newPhrase = newPhrase.split("");
        this.setState({ phrase: newPhrase });
        // console.log(newPhrase);

      } else if (e.target.value === "medium") {
        let newPhrase = this.props.phrase;
        if(newPhrase.length > 150)
          newPhrase.length = 150;
        newPhrase = newPhrase.join("");
        newPhrase = newPhrase.split("");
        this.setState({ phrase: newPhrase });
        // console.log(newPhrase);
        
      } else if (e.target.value === "easy") {
        let newPhrase = this.props.phrase;
        if(newPhrase.length > 75)
          newPhrase.length = 75;
        newPhrase = newPhrase.join("");
        newPhrase = _.lowerCase(newPhrase);
        newPhrase = newPhrase.split("");
        this.setState({ phrase: newPhrase });
        // console.log(newPhrase);

      } 
      
    }

    handleDurationChange(e) {
      this.setState({ duration: e.target.value });
      this.setState({ timer: e.target.value});
    }

    detectKeyPresses(e) {
      let newPhrase = this.state.phrase;
      let newIncorrectLetters = this.state.incorrectLetters;
      let newCorrectLetters = this.state.correctLetters;
      let nextLetter;
      if (this.state.countdown === 0){
          if (e.key === 'Enter'){
            this.countownTimer();
          }
        } else if (this.state.countdown === 2){
          if (this.state.typedEntries === 0){
            this.setState( { interval: setInterval(this.incrementTime, 10), timeElapsed: 0.01, });
            this.setState( { timerInterval: setInterval(this.decreaseTimer, 1000), timer: this.state.duration, });
          }
          if (this.state.ignoreKeys.includes(e.key)) {
          } else if(this.state.timer <= 0) {
            clearInterval(this.state.interval);
            clearInterval(this.state.timerInterval);
            let accuracy = Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0).toString()
            document.removeEventListener("keydown", this.detectKeyPresses);
            this.props.openModal({ type: 'gameStats', wordsPerMin: this.state.wordsPerMin, time: this.state.timeElapsed, accuracy: accuracy, phraseOrigin: this.props.phraseOrigin});
            
          } else if (e.key === 'Backspace' || e.key === 'Delete'){
            if (newIncorrectLetters.length){
              nextLetter = newIncorrectLetters.pop();
              newPhrase.unshift(nextLetter);
            } else if (newCorrectLetters.length){
              nextLetter = newCorrectLetters.pop();
              newPhrase.unshift(nextLetter);
            }
          } else if (e.key === newPhrase[0] && newIncorrectLetters.length === 0) {
            nextLetter = newPhrase.shift();
            newCorrectLetters.push(nextLetter);
          } else if ( (e.key !== newPhrase[0] || newIncorrectLetters.length ) && newPhrase.length) {
            nextLetter = newPhrase.shift();
            newIncorrectLetters.push(nextLetter);
            this.setState({ mistakes: this.state.mistakes + 1 });
          }
          this.setState({ 
            incorrectLetters: newIncorrectLetters,
            correctLetters: newCorrectLetters,
            phrase: newPhrase,
            typedEntries: this.state.typedEntries+1,
          });
          this.sendProgress();
      }
    }

    checkInput() {
      if (!this.state.phrase.length && !this.state.incorrectLetters.length && !this.state.gameWon) {
        let time = this.state.timeElapsed;
        let accuracy = Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0).toString()
        this.setState({
          gameWon: true,
          wordsPerMin: Math.floor((this.state.phraseLength / 5) / (time / 60))
        });
        if (this.props.loggedIn && this.props.type !== 'practice'){
          this.props.saveRace({
            user: this.props.user.id,
            username: this.props.user.username,
            averageSpeed: Math.floor((this.state.phraseLength / 5) / (time / 60)).toString(),
            accuracy: accuracy,
            gameId: this.state.gameId,
          });
        }
        clearInterval(this.state.interval);
        clearInterval(this.state.timerInterval);
        document.removeEventListener("keydown", this.detectKeyPresses);
        this.props.openModal({ type: 'gameStats', wordsPerMin: this.state.wordsPerMin, time: this.state.timeElapsed, accuracy: accuracy, phraseOrigin: this.props.phraseOrigin});
      }
    }

    sendProgress() {
      let username = this.props.user.username ? this.props.user.username : "Guest";
      let progress = (this.state.correctLetters.length / this.state.phraseLength * 100).toFixed(2);
      let gameId = this.state.gameId;
      this.state.socket.emit('send_progress', {
        gameId,
        username,
        progress 
      });
    }

    countownTimer() {
      this.setState( { countdown: 1 });
      setTimeout( () => this.setState( {countdownTimer: "4..." }), 1000);
      setTimeout( () => this.setState( {countdownTimer: "3..." }), 2000);
      setTimeout( () => this.setState( {countdownTimer: "2..." }), 3000);
      setTimeout( () => this.setState( {countdownTimer: "1..." }), 4000);
      setTimeout( () => this.setState( {countdown: 2 }), 5000);
    }

    incrementTime() {
      let newTime = this.state.timeElapsed+0.01;
      this.setState({
        timeElapsed: newTime,
        wordsPerMin: Math.floor(( (this.state.correctLetters.length || 0) / 5) / (newTime / 60)),
      });
    }

    decreaseTimer() {
      let newTime = this.state.timer-1;
      this.setState({
        timer: newTime,
      });
    }


    render () {      

      let rockets = (
        <div>
          { 
            Object.values(this.state.players).map ( player => (
              <Rocket key={player.playerId} playerId={player.playerId} username={player.username} progress={player.progress}/>
            ))
          }     
        </div>
      )

      let countdown1 = (
        <>
          <div className="countdown flex">
            <div className='container-game'>
              <div className="bold-div">
                <label htmlFor="difficulty" className="">
                  Difficulty:
                </label>
                <select className='bold-div-spacing' id="difficulty" value={this.state.difficulty} onChange={this.handleDifficultyChange}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className='bold-div'>
                <label htmlFor="duration" className="">
                  Duration (seconds):
                </label>
                <input className='bold-div-spacing adjust' id="duration" value={this.state.duration} onChange={this.handleDurationChange}>
                </input>
              </div>
            </div>
            <h1>Press <span>Enter</span> to get started</h1>
          </div>
        </>
      ) 

      let countdownMulti = (
        <>
          <div className="countdown flex">
          <h1>Get Ready</h1>
          </div>
        </>
      )

      let countdown2 = (
        <>
          <div className="countdown flex-column">
            <h1> Start typing in:</h1>
            <h1>{this.state.countdownTimer}</h1>
            <h3>Tip: If you make a mistake, press <span>Backspace</span> to correct it</h3>
          </div>
        </>
      )

      let gameRender = (
            <>
            <div className="answer-phrase flex">
                        <pre>
                          { this.state.correctLetters.length ? (<span className="green">{ this.state.correctLetters.join("")}</span>) : "" }
                          { this.state.incorrectLetters.length ? (<span className="red">{ this.state.incorrectLetters.join("") }</span>) : "" }
                          <span className="regular" >{ this.state.phrase.join("") || ""} </span>
                        </pre>
                    </div>
                    <div className={`game-stats flex ${this.state.gameWon ? "finished": ""}`}>
                      <p className={`wpm flex`}>Words per minute: {this.state.wordsPerMin}</p>
                      <p className={`wpm flex`}>Timer: <div>{this.state.timer}</div> seconds</p>
                      <p className={`wpm flex`}>Accuracy: { `${Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0)}%` }</p>
              </div>
            </>
          )

        return (
          <>
            <div className="game-area-parent flex-column">
              <div className="progress-meter flex">
                  
                  <img className="earth" alt='earth' src="./assets/man1-removebg.png"/>
                  { rockets }
                  <img className="mars" alt='mars' src="./assets/godfather69.png"/>
              </div>
              <div className="game-area">
                { (this.props.type === "multiplayer" && this.state.countdown === 0) ? countdownMulti : this.state.countdown === 0 ?  countdown1 : this.state.countdown === 1 ? countdown2 : gameRender }
              </div>
            </div>
          </>
        )
    }
}

export default Game;