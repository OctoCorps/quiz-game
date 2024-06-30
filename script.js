const questions = [
    {
        question: "Identify this leukocyte:", // 1
        image: "https://o.quizlet.com/eo7rlS.ElNu0ob.CJJtbSQ.jpg",
        answer: "Neutrophil"
    },
    {
        question: "Identify this leukocyte:", //2
        image: "https://o.quizlet.com/gcpvkkKnb.-vIgBB8PMZLw.jpg",
        answer: "Eosinophil"
    },
    {
        question: "Identify this leukocyte:", //3
        image: "https://o.quizlet.com/1c.cCFw2TdOz0ZkHwDsdJA.jpg",
        answer: "Basophil"
    },
    {
        question: "Identify this leukocyte:",//4
        image: "https://o.quizlet.com/lfpWJry7Kfcy12Y-Bt6yIA.jpg",
        answer: "Neutrophil"
    },
    {
        question: "Identify this leukocyte:",//5
        image: "https://o.quizlet.com/XIQGWcjQ91cyA2uwAG91gg.jpg",
        answer: "Lymphocyte"
    },
    {
        question: "Identify this leukocyte:",//6
        image: "https://o.quizlet.com/TVArNwdjd07F.N-tLIzF6Q.jpg",
        answer: "Eosinophil"
    },
    {
        question: "Identify this leukocyte:",//7
        image: "https://o.quizlet.com/a1QKehSVArM1DUoGTOeKPA.jpg",
        answer: "Monocyte"
    },
    {
        question: "Identify this leukocyte:", //8
        image: "https://o.quizlet.com/IX-LBCBEMx6bqJkM5tK4rQ.jpg",
        answer: "Monocyte "
    },
    {
        question: "Identify this leukocyte:", //9
        image: "https://o.quizlet.com/XBfxtFtQEzI1nBjqX0hu2g.jpg",
        answer: "Eosinophil"
    },
    {
        question: "Identify this leukocyte:", //10
        image: "https://o.quizlet.com/s2iFsg9G5HsIfIg00zlWcw.jpg",
        answer: "Lymphocyte"
    },
    /*
    {
        question: "Identify this leukocyte:", //11
        image: "https://example.com/image11.jpg",
        answer: "Answer11"
    },
    {
        question: "Identify this leukocyte:",//12
        image: "https://example.com/image12.jpg",
        answer: "Answer12"
    },
    {
        question: "Identify this leukocyte:",//13
        image: "https://example.com/image13.jpg",
        answer: "Answer13"
    },
    {
        question: "Identify this leukocyte:",//14
        image: "https://example.com/image14.jpg",
        answer: "Answer14"
    },
    {
        question: "Identify this leukocyte:",//15
        image: "https://example.com/image15.jpg",
        answer: "Answer15"
    }
  */
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startTimer() {
    let timeLeft = 20; 
    timer = setInterval(() => {
        timeLeft--;
        updateTimer(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function updateTimer(secondsLeft) {
    const timerElements = document.getElementsByClassName('timer');
    Array.from(timerElements).forEach(element => {
        element.textContent = `${secondsLeft} seconds left`;
    });
}

function loadQuestion() {
    clearInterval(timer); 
    startTimer(); 

    const questionEl = document.getElementById('question');
    const questionImageEl = document.getElementById('questionImage');
    const answerInputEl = document.getElementById('answerInput');
    const resultIconEl = document.getElementById('resultIcon');
    const currentQuestion = questions[currentQuestionIndex];

    questionEl.textContent = currentQuestion.question;
    questionImageEl.src = currentQuestion.image;
    answerInputEl.value = '';
    answerInputEl.disabled = false;
    resultIconEl.innerHTML = '';
    document.getElementById('answerSection').classList.remove('d-none');
    document.getElementById('nextBtn').classList.add('d-none');
    document.getElementsByClassName('timer')[0].classList.remove('d-none');
}


function submitAnswer() {
    const answerInputEl = document.getElementById('answerInput');
    const nextBtn = document.getElementById('nextBtn');
    const resultIconEl = document.getElementById('resultIcon');
    const currentQuestion = questions[currentQuestionIndex];

    clearInterval(timer); 

    if (answerInputEl.value.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        score++;
        resultIconEl.innerHTML = '<i class="fas fa-check-circle text-success"></i>';
    } else {
        resultIconEl.innerHTML = '<i class="fas fa-times-circle text-danger"></i>';
    }

    answerInputEl.disabled = true;
    nextBtn.classList.remove('d-none');
}


function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    const questionEl = document.getElementById('question');
    const questionImageEl = document.getElementById('questionImage');
    const answerSectionEl = document.getElementById('answerSection');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const revealAnswersBtn = document.getElementById('revealAnswersBtn');
    const scoreEl = document.getElementById('score');

    questionEl.textContent = 'Quiz Completed!';
    questionImageEl.src = ''; 
    questionImageEl.classList.add('d-none'); 
    answerSectionEl.classList.add('d-none');
    nextBtn.classList.add('d-none');
    restartBtn.classList.remove('d-none');
    revealAnswersBtn.classList.remove('d-none');
    scoreEl.textContent = `Your Score: ${score}/${questions.length}`;
    
    document.getElementsByClassName('timer')[0].classList.add('d-none'); 
}


function revealAnswers() {
    const answersEl = document.getElementById('answers');
    answersEl.classList.remove('d-none');
    answersEl.innerHTML = '<h4>Correct Answers:</h4>';
    
    questions.forEach((question, index) => {
        answersEl.innerHTML += `<p>${index + 1}. ${question.question} <strong>${question.answer}</strong></p>`;
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer); // Clear any running timer
    document.getElementById('restartBtn').classList.add('d-none');
    document.getElementById('revealAnswersBtn').classList.add('d-none');
    document.getElementById('answers').classList.add('d-none');
    document.getElementById('score').textContent = '';
    loadQuestion();
}

window.onload = loadQuestion;