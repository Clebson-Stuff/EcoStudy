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
        question: "O que é população?",
        choice1: "Conjunto de indivíduos de espécies diferentes.",
        choice2: "Conjunto de indivíduos da mesma espécie.",
        choice3: "Conjunto de biomas.",
        choice4: "Nenhuma das opções.",
        answer: 2
    },
    {
        question: "O que são comunidades?",
        choice1: "Conjunto de ecossistemas.",
        choice2: "Conjunto de indivíduos da mesma espécie.",
        choice3: "Conjunto de seres bióticos e  abióticos.",
        choice4: "Conjunto de populações de diferentes espécies.",
        answer: 4
    },
    {
        question: "O que são ecossistemas?",
        choice1: "Conjunto formado pelas comunidades biológicas em interação com os fatores abióticos do meio.",
        choice2: "Conjunto de indivíduos.",
        choice3: "Conjunto de populações de diferentes espécies.",
        choice4: "Letra A e B estão corretas.",
        answer: 1
    },
    {
        question: "O que é a Biosfera?",
        choice1: "Conjunto das comunidades.",
        choice2: "Conjunto dos indivíduos de espécies diferentes.",
        choice3: "Conjunto de indivíduos da mesma espécie.",
        choice4: "Conjunto de todos os ecossistemas.",
        answer: 4
    },
    {
        question: "O que é Ecologia?",
        choice1: "Área que estuda os insetos.",
        choice2: "Área que estuda as interações dos organismos entre si e com o meio.",
        choice3: "Área que estuda os minerais e a Terra.",
        choice4: "Área que estuda as mudanças climáticas.",
        answer: 2
    },
    {
        question: "Quais são os biomas brasileiros?",
        choice1: "Mata Atlântica, Amazônia, Savana,Cerrado, Pampas e Pantanal.",
        choice2: "Mata Atlântica, Amazônia, Caatinga, Cerrado, Pampas e  Tundra.",
        choice3: "Mata Atlântica, Amazônia, Caatinga, Cerrado, Pampas e Pantanal.",
        choice4: "Mata Atlântica, Taiga, Caatinga, Cerrado, Pampas e Pantanal.",
        answer: 3
    },
    {
        question: "O que é Ecologia?",
        choice1: "Área que estuda os insetos.",
        choice2: "Área que estuda as interações dos organismos entre si e com o meio.",
        choice3: "Área que estuda os minerais e a Terra.",
        choice4: "Área que estuda as mudanças climáticas.",
        answer: 2
    },
    {
        question: "O que é Taxonomia?",
        choice1: "Um ramo responsável por atribuir nomes para os organismos.",
        choice2: "Um ramo responsável por colocar em ordem os organismos.",
        choice3: "Um ramo responsável por descobrir as compostos químicos.",
        choice4: "Um ramo responsável por estudar as plantas.",
        answer: 1
    },
    {
        question: "O que é Sistemática?",
        choice1: "Um ramo responsável por estudar as plantas",
        choice2: "Estudo dos protozoários.",
        choice3: "Um ramo responsável por colocar em ordem os organismos, a partir das suas características.",
        choice4: "Um ramo responsável por atribuir nomes para os organismos.",
        answer: 3
    },
    {
        question: "O que é Filogenia?",
        choice1: " Um ramo responsável por descobrir as compostos químicos.",
        choice2: "Um ramo responsável por atribuir nomes para os organismos.",
        choice3: "Um ramo responsável por estudar as plantas.",
        choice4: "Um ramo que estuda as relações evolutivas das espécies.",
        answer: 4
    },
    {
        question: "Quais são os 3 tipos de distribuição dos organismos?",
        choice1: "Homogênea, agrupada e exclusiva.",
        choice2: "Unidas, agrupada e homogênea.",
        choice3: "Aleatória, compacta e agrupada.",
        choice4: "Homogênea, agrupada e aleatória.",
        answer: 4
    },
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTION = 5;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = randomQuestion();
    console.log(availableQuestions);
    getNewQuestion();
};

randomQuestion = (arr) =>{
    var num = [];
    while(num.length<MAX_QUESTION){
        var aleatorio = Math.floor(Math.random() * MAX_QUESTION);
        if(num.indexOf(aleatorio) == -1){
            num.push(aleatorio);
        }
    }
    console.log(num);
    console.log(num.length);
    let questionsReturn  = [];
    for(var i =0; i<MAX_QUESTION;i++){
        questionsReturn.push(questions[num[i]]);
    }
    console.log
    return questionsReturn;
} 

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    elQuestionCounter.innerText = `${questionCounter}/${MAX_QUESTION}`;
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
    elScore.innerText = score;
}
startGame();


