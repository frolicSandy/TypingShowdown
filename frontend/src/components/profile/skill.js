import React from "react";

const SkillLevel = (props) => {
  let skillLevel;
  switch (true) {
    case props.wpm < 15:
      skillLevel = "Iron";
      break;
    case props.wpm > 15 && props.wpm < 30:
      skillLevel = "Bronze";
      break;
    case props.wpm > 30 && props.wpm < 60:
      skillLevel = "Silver";
      break;
    case props.wpm >= 60 && props.wpm < 80:
      skillLevel = "Gold";
      break;
    case props.wpm >= 80 && props.wpm < 100:
      skillLevel = "Platinum";
      break;
    case props.wpm >= 100 && props.wpm < 150:
      skillLevel = "Diamond";
      break;
    case props.wpm >= 150 && props.wpm < 200:
      skillLevel = "Ascendant";
      break;
    case props.wpm >= 200:
      skillLevel = "Radiant";
      break;
    default:
      skillLevel = "Calibrating...";
  }

  return <p className="profile-skill-level">{skillLevel}</p>;
};

export default SkillLevel;
