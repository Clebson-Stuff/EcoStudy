const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const elQuestionCounter = document.getElementById('questionCounter');
const elScore = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0.
let availableQuestions = [];

let questions = [
    {
        question: "Quais são os sistemas ecológicos?",
        choice1: "Reino, Filo, Classe, Ordem, Família, Gênero e espécie.",
        choice2: "Indivíduo, População, Comunidade, Espécie e Biosfera.",
        choice3: "Indivíduo, População, Comunidade, Ecossistema e Biosfera.",
        choice4: "Nenhuma das opções.",
        answer: 3
    },
    {
        question: "O que é um Indivíduo?",
        choice1: "Um organismo vivo pertencente a uma espécie.",
        choice2: "Um conjunto de biomas.",
        choice3: "Uma unidade de medida.",
        choice4: "Nenhuma das opções.",
        answer: 1
    },
    {
        question: "Quais não são os sistemas ecológicos?",
        choice1: "Reino, Filo, Classe, Ordem, Família, Gênero e espécie.",
        choice2: "Indivíduo, População, Comunidade, Espécie e Biosfera.",
        choice3: "Indivíduo, População, Comunidade, Ecossistema e Biosfera.",
        choice4: "Nenhuma das opções.",
        answer: 3
    }
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTION = questions.length;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
        return window.location.assign('/end.html');
    }
    questionCounter++;
    elQuestionCounter.innerText = `${questionCounter}/${MAX_QUESTION}`;
    elScore.innerText = score;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect';
        if(selectedAnswer == currentQuestion.answer){
            score += CORRECT_BONUS;
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();

        }, 1000);
    });
}); 
startGame();


