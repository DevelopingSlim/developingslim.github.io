const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false; 
let score = 0; 
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    startGame();
  })
  .catch(err => {
    console.error('Error al cargar las preguntas desde el archivo JSON:', err);
  });



// CONSTANTS 
const CORRECT_BONUS = 1; 
const MAX_QUESITONS = 460; 

startGame = () => {
    questionCounter = 0;
    score = 0; 
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESITONS){
      localStorage.setItem('mostRecentScore', score);
      // Go to the final page 
      return(window.location.assign('end.html'));
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESITONS}`;

    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESITONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply == 'correct'){
      incrementScore(CORRECT_BONUS);
    }

    // Adds a class to the element
    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
    
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};