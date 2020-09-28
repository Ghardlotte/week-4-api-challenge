var currentQuestionIndex = 0
var time = question.length * 15;
var timerId;

//variables for dom
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.querySelector("button.submitBtn");
var startBtn = document.getElementById("startBtn");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var secondsLeft = (questions.length * 15 + 1);
var submitScore = document.querySelector("#submit-score");
var userScore = document.getElementById("user-score");
var userNameInput;
var questionhead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questions = -1;
var answer;

function startTimer() {
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');
    setTimer();
    makeQuestions();
}

function setTimer() {
    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "time: " + seocondsLeft;


        if (secondsLeft === 0 || questionsNumber === question.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
                }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer;
    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";
}

var choices = questions[questionNumber].choices;

for (var q = 0; q < choices.length; q++) {
    var nextChoice = document.createElement("button");

    nextChoice.textContent = choices[q]
    answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
}

function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}

startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
});

var newScore = {
    name: userNameInput,
    score: secondsLeft};

var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
highScores.push(newScore)
localStorage.setItem("highScores", JSON.stringify(highScores));


function hideFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.style.display='none'
}

function showFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback,1000);
        showFeedback();   
    } else {
        pEl.innerHTML = "Sorry, that's incorrect.";
        setTimeout(hideFeedback,1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }    
    makeQuestions();
});