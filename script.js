var currentQuestionIndex = 0
var time = question.length * 15;
var timerId;

//variables for dom
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");


questionsEl.removeAttribute("class");

timerId = setInterval(clocktick, 1000);

timerEl.textContent = time;

getQuestion();
}

function time() {
    var timeLeft = 50;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }


if(confirm("clear memory")){
    localStorage.clear()
  }


 

  function getQuestion() {

    var currentQuestion = questions[currentQuestionindex];

    var titleEl = document.getElementById(question-title);
    titleEl.textContent = currentQuestion.title;

    choices.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
    })
  }

  // We start the game with a score of 0.
  var score = 0;

  // Loop over every question object
  for (var i = 0; i < questions.length; i++) {
    // Display current question to user and ask OK/Cancel
    //users answer is equal to the result of the confirmation of the question
    // referring to a property
    var answer = confirm(questions[i].q);
    // Compare answers
    if (
      (answer === true && questions[i].a === 't') ||
      (answer === false && questions[i].a === 'f')
    ) {
      // Increase score
      score++;
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
  }
  if(score > localStorage.getItem("highScore")){
    localStorage.setItem("highScore", score)
    alert("you got a new highscore!!!!!!!!!!!")
  }
  // Show total at end
  alert('You got ' + score + '/' + questions.length);

  startBtn.onclick = time;