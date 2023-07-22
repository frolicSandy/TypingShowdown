let phrases = [
  ["Every great magic trick consists of three parts or acts. The first part is called The Pledge. The magician shows you something ordinary. Perhaps he asks you to inspect it to see if it is indeed real. But of course... it probably isn't. The second act is called The Turn. Now you're looking for the secret... but you won't find it, because you're not really looking. You don't really want to know. You want to be fooled.", "The Prestige"],
  ['Words per minute is a measure of typing speed, commonly used in recruitment. For the purposes of WPM measurement, a word is standardized to five characters or keystrokes. Therefore, "brown" counts as one word, but "mozzarella" counts as two.', "Wikipedia: Typing"],
  ["They need you right now, but when they don't, they'll cast you out, like a leper! You see, their morals, their code, it's a bad joke. Dropped at the first sign of trouble. They're only as good as the world allows them to be. When the chips are down, these... civilized people, they'll eat each other. See, I'm not a monster. I'm just ahead of the curve.", "The Dark Knight"],
  ["It's been more than thirty years since the wolf and the winter cold. And now, as then, it is not fear that grips him, only restlessness. A heightened sense of things. The seaborn breeze, coolly, kissing the sweat at his chest and neck. Gulls cawing, complaining, even as they feast on the thousands of floating dead. The steady breathing of the 300 at his back, ready to die for him without a moment's pause. Everyone of them ready, to die.", "300"],
  ["I know what it's like to lose. To feel so desperately that you're right, yet to fail nonetheless. It's frightening, turns the legs to jelly. I ask you to what end? Dread it. Run from it. Destiny arrives all the same. And now it's here.", "Avengers: Infinity War"],
  ["If I drive for you, you give me a time and a place. I give you a five-minute window, anything happens in that five minutes and I'm yours no matter what. I don't sit in while you're running it down. I don't carry a gun. I drive.", "Driver"],
  ['Do you understand that the world does not revolve around you and your "do whatever it takes, ruin as many people\'s lives, so long as you can make a name for yourself as an investigatory journalist, no matter how many friends you lose or people you leave dead and bloodied along the way, just so long as you make a name for yourself as an investigatory journalist, no matter how many friends you lose or people you leave dead and bloodied and dying along the way?', "Zoolander"],
  ["Sometimes I'll start a sentence, and I don't even know where it's going. I just hope I find it along the way. Like an improv conversation. An improversation.", "The Office"],
  ["I don't have money. But what I do have are a very particular set of skills; skills I have acquired over a very long career. Skills that make me a nightmare for people like you. If you let my daughter go now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will kill you.", "Taken"],
  ["Wha? Wait, let me explain something to you. I am not Mr. Lebowski. You're Mr. Lebowski. I'm the dude. So that's what you call me. You know. Uh, that or His Dudeness, Duder, or uh El Duderino if you're not into the whole brevity thing.", "The Big Lebowski"],
  ["I just want to tell you how I'm feeling. Gotta make you understand. Never gonna give you up, never gonna let you down, never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.", "Never Gonna Give You Up"],
  ["Will you fight? Aye, fight and you may die, run and you'll live, at least a while. And dying in your beds many years from now, would you be willing to trade all of this, from this day to that, for one chance, just one chance, to come back here and tell our enemies that they may take our lives but they'll never take our freedom!", "Braveheart"],
  ["The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness. For he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know I am the Lord when I lay my vengeance upon thee." , "Pulp Fiction"],
  ["Drainage! Drainage, Eli, you boy. Drained dry. I'm so sorry. Here, if you have a milkshake, and I have a milkshake, and I have a straw. There it is, that's a straw, you see? You watching? And my straw reaches across the room, and starts to drink your milkshake... I... drink... your... milkshake! I drink it up!", "There Will Be Blood"],
  ["I personally believe that US Americans are unable to do so because, uh, some, uh, people out there in our nation don't have maps and, uh, I believe that our education like such as in South Africa and, uh, the Iraq, everywhere like such as, and, I believe that they should, our education over here in the U.S. should help the U.S., uh, or, uh, should help South Africa and should help the Iraq and the Asian countries, so we will be able to build up our future. For our children.", "Miss Teen USA pageant 2007"],
  ["Hey. Hey! Do you know me? I'm the guy that tells you there are guys you can hit and there's guys you can't. Now that's not quite a guy you can't hit, but it's almost a guy you can't hit. So I'm gonna make a ruling on this right now. You don't hit him. Understand?", "The Departed"],
  ["Some men are born mediocre, some men achieve mediocrity, and some men have mediocrity thrust upon them. With Major Major it had been all three. Even among men lacking all distinction he inevitably stood out as a man lacking more distinction than all the rest, and people who met him were always impressed by how unimpressive he was.", "Catch-22"],
  ["He struggled with himself, too. I saw it -- I heard it. I saw the inconceivable mystery of a soul that knew no restraint, no faith, and no fear, yet struggling blindly with itself.", "Heart of Darkness"],
  ["Nobody is gonna hit as hard as life, but it ain't how hard you can hit. It's how hard you can get hit and keep moving forward. It's how much you can take, and keep moving forward. That's how winning is done.", "Rocky"],
  ["The Ministry of Truth, which concerned itself with news, entertainment, education, and the fine arts. The Ministry of Peace, which concerned itself with war. The Ministry of Love, which maintained law and order. And the Ministry of Plenty, which was responsible for economic affairs.", "Nineteen Eighty-Four"],
  ["It was times like these when I thought my father, who hated guns and had never been to any wars, was the bravest man who ever lived.", "To Kill A Mockingbird"],
  ["You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You're on your own. And you know what you know. And YOU are the one who'll decide where to go...", "Oh, the Places You'll Go!"],
  ["The rules of the Hunger Games are simple. In punishment for the uprising, each of the twelve districts must provide one girl and one boy, called tributes, to participate. The twenty-four tributes will be imprisoned in a vast outdoor arena that could hold anything from a burning desert to a frozen wasteland. Over a period of several weeks, the competitors must fight to the death. The last tribute standing wins.", "The Hunger Games"],
  ["Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.", "John Green, The Fault in Our Stars"],
  ["Wherever you fly, you'll be best of the best. Wherever you go, you will top all the rest. Except when you don't. Because, sometimes, you won't. I'm sorry to say so but, sadly, it's true that Bang-ups and Hang-ups can happen to you.", "Oh! The Places You'll Go"],
  ["The experience was powerful and fundamental. It seemed to me that it had always felt like this to be a human in the wild, and as long as the wild existed it would always feel this way.", "Wild"],
  ["I was told love should be unconditional. That's the rule, everyone says so. But if love has no boundaries, no limits, no conditions, why should anyone try to do the right thing ever?", "Gone Girl"],
  ["Autonomy, complexity, and a connection between effort and reward are, most people will agree, the three qualities that work has to have if it is to be satisfying.", "Outliers"],
  ["Never give up, no matter how far behind you are, no matter how unlikely it seems you will catch your competitor in front of you. Keep pushing until the checkered flag falls.", "The Art of Racing in the Rain"],
  ["There was a stage and a PA up in western Massachusetts and the kids came from miles around to get messed up on the music. And she drove down from Bowdoin with a carload of girlfriends, to meet some boys and maybe eat some mushrooms. And they did, and she got sick, and now she's pinned and way too shaky.", "The Perks of Being a Wallflower"],
  ["I've missed more than 9,000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life, and that is why I succeed.", "Michael Jordan on the Pursuit of Excellence"],
  ["Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.", "Steve Jobs"],
  ["Work hard for what you want because it won't come to you without a fight. You have to be strong and courageous and know that you can do anything you put your mind to. If somebody puts you down or criticizes you, just keep on believing in yourself and turn it into something positive.", "Leah LaBelle"],
]


export const randomPhrase = () => { 
  let phraseNum = Math.floor(Math.random() * phrases.length);
  return phrases[phraseNum];
}