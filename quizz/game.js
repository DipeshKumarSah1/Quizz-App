const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let scorre = 0;
let questionCounter = 0;
let avilableQuestions = [];

let questions = [
  {
    question: "Inside Which HTML element do we put the javascript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "what is the correct syntex for referring to an external script called 'abc.js' ? ",
    choice1: "<script href='abc.js'>",
    choice2: "<script name='abc.js'>",
    choice3: "<script src='abc.js'>",
    choice4: "<script file='abc.js'>",
    answer: 3
  },
  {
    question: "How do you write 'Hello world' in alert box?",
    choice1: "msgBox('Hello world');",
    choice2: "alertbox('Hello world');",
    choice3: "msg('Hello world');",
    choice4: 'alert("Hello world");',
    answer: 4
  }
];

//Constants

const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avilableQuestions = [...questions];

  getNewQuestion();
};

getNewQuestion = () => {
  if (avilableQuestions.length === 0 || questionCounter >= MAX_QUESTION) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} /${MAX_QUESTION}`;
  //Update the progress Bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  const questionIndex = Math.floor(Math.random() * avilableQuestions.length);
  currentQuestion = avilableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  avilableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
startGame();
