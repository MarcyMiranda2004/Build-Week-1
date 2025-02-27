const questions = [
  {
    question:
      "Qual è il tag principale che racchiude tutto il contenuto di una pagina HTML?",
    answers: ["&lt;head&gt;", "&lt;body&gt;", "&lt;html&gt;", "&lt;title&gt;"],
    correctAnswer: "&lt;html&gt;",
    type: "multiple",
  },
  {
    question: "Quale proprietà CSS si usa per cambiare il colore del testo?",
    answers: ["font-color", "text-style", "color", "background-color"],
    correctAnswer: "color",
    type: "multiple",
  },
  {
    question:
      "Quale tag HTML viene usato per creare un collegamento ipertestuale?",
    answers: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;url&gt;"],
    correctAnswer: "&lt;a&gt;",
    type: "multiple",
  },
  {
    question: "Quale proprietà CSS rende il testo più spesso (grassetto)?",
    answers: ["font-weight", "bold", "text-style", "font-bold"],
    correctAnswer: "font-weight",
    type: "multiple",
  },
  {
    question:
      "Con quale tag si collega un file CSS esterno a un documento HTML?",
    answers: ["&lt;script&gt;", "&lt;css&gt;", "&lt;link&gt;", "&lt;style&gt;"],
    correctAnswer: "&lt;link&gt;",
    type: "multiple",
  },
  {
    question:
      "Qual è la sintassi corretta per dichiarare una funzione in JavaScript?",
    answers: [
      "function myFunction()",
      "def myFunction()",
      "fun myFunction()",
      "create function myFunction()",
    ],
    correctAnswer: "function myFunction()",
    type: "multiple",
  },
  {
    question: "Quale metodo JavaScript seleziona un elemento HTML tramite ID?",
    answers: [
      "getElementById()",
      "querySelector()",
      "getElementByClass()",
      "selectById()",
    ],
    correctAnswer: "getElementById()",
    type: "multiple",
  },
  {
    question: "Quale sintassi è corretta per scrivere un commento in CSS?",
    answers: [
      "// Questo è un commento",
      "&lt;!-- Questo è un commento --&gt;",
      "/* Questo è un commento */",
      "' Questo è un commento",
    ],
    correctAnswer: "/* Questo è un commento */",
    type: "multiple",
  },
  {
    question:
      "Il CSS viene utilizzato per definire lo stile di una pagina web.",
    answers: ["Vero", "Falso"],
    correctAnswer: "Vero",
    type: "truefalse",
  },
  {
    question:
      "In JavaScript, 'let' e 'var' hanno lo stesso comportamento senza differenze.",
    answers: ["Vero", "Falso"],
    correctAnswer: "Falso",
    type: "truefalse",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = 0;
const totalTime = 30;
const totalCircleLength = 455;
let timer;

function loadQuestion() {
  clearInterval(timer);
  let timeLeft = totalTime;
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  document.getElementById("answers").innerHTML = question.answers
    .map(
      (answer) =>
        `<button class="answer-button" onclick="selectAnswer('${answer.replace(
          /'/g,
          "&#39;"
        )}')">${answer}</button>`
    )
    .join("<br>");
  document.getElementById("timerText").textContent = timeLeft;
  document.getElementById("questionsCounter").innerHTML = `Domanda ${
    currentQuestionIndex + 1
  } / ${questions.length}`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timerText").textContent = timeLeft;
    document.getElementById("progressCircle").style.strokeDashoffset =
      totalCircleLength - (timeLeft / totalTime) * totalCircleLength;
    if (timeLeft <= 0) {
      clearInterval(timer);
      wrongAnswers++;
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(answer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  document.querySelectorAll(".answer-button").forEach((button) => {
    button.disabled = true;
    button.style.backgroundColor =
      button.textContent === correctAnswer
        ? "#4CAF50"
        : button.textContent === answer
        ? "#f44336"
        : "#9E9E9E";
  });
  if (answer === correctAnswer) {
    score++;
  } else {
    wrongAnswers++;
  }
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  if (++currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    let totalQuestions = score + wrongAnswers;
    localStorage.setItem("score", score);
    localStorage.setItem("wrongAnswers", wrongAnswers);
    localStorage.setItem("totalQuestions", totalQuestions);
    window.location.href = "result.html";
  }
}

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
  loadQuestion();
}

shuffleQuestions();
