const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  console.log("clicked the save button");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScore.push(score);
  console.log(highScore);
};
