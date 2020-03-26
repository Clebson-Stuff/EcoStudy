const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const elQuestionCounter = document.getElementById('questionCounter');
const elScore = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0
let availableQuestions = [];

let questions = [
    {
        question: "Quais são os 3 tipos de distribuição de população?",
        choice1: "Homogênea, agrupada e exclusiva.",
        choice2: "Unidas, agrupada e homogênea.",
        choice3: "Aleatória, compacta e agrupada.",
        choice4: "Homogênea, agrupada e aleatória",
        answer: 4
    },
    {
        question: "Quais são os 3 modelos de subpopulações?",
        choice1: "Metapopulação básico, metapopulação fonte-poço e metapopulação linear.",
        choice2: "Metapopulação complexa, metapopulação fonte-poço e metapopulação básica.",
        choice3: "Metapopulação básico, metapopulação aleatória e metapopulação uniforme.",
        choice4: "Metapopulação básico, metapopulação fonte-poço e metapopulação de paisagem",
        answer: 4
    },
    {
        question: "O que é crescimento exponencial?",
        choice1: "Modelo de crescimento populacional no qual a população aumenta continuamente a uma taxa exponencial.",
        choice2: "É o tempo necessário para que uma população duplique em tamanho",
        choice3: "São fatores que afetam o tamanho populacional em relação à densidade.",
        choice4: "É o tamanho populacional máximo que pode ser suportado pelo ambiente",
        answer: 1
    },
    {
        question: "O que é mutualismo?",
        choice1: "Organismo que vive dentro ou sobre outro organismo, mas raramente o mata.",
        choice2: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice3: "Organismo que consome produtores, como plantas e algas.",
        choice4: "Organismo que mata e consome parcial ou totalmente outro indivíduo.",
        answer: 2
    },
    {
        question: "O que é parasitismo?",
        choice1: "Organismo que vive dentro ou sobre outro organismo, mas raramente o mata.",
        choice2: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice3: "Organismo que consome produtores, como plantas e algas.",
        choice4: "Organismo que mata e consome parcial ou totalmente outro indivíduo.",
        answer: 1
    },
    {
        question: "O que é competição?",
        choice1: "Organismo que vive dentro ou sobre outro organismo, mas raramente o mata.",
        choice2: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice3: "Organismo que consome produtores, como plantas e algas.",
        choice4: "Interação com efeitos negativos entre duas espécies que dependem do mesmo recurso limitante para sobreviver, crescer e se reproduzir.",
        answer: 4
    },
    {
        question: "O que é herbivoria?",
        choice1: "Organismo que vive dentro ou sobre outro organismo, mas raramente o mata.",
        choice2: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice3: "Organismo que consome produtores, como plantas e algas.",
        choice4: "Interação com efeitos negativos entre duas espécies que dependem do mesmo recurso limitante para sobreviver, crescer e se reproduzir.",
        answer: 3
    },
    {
        question: "O que é predação?",
        choice1: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice2: "Organismo que consome produtores, como plantas e algas.",
        choice3: "Interação que  organismos  matam e consomem parcial ou totalmente outro indivíduo.",
        choice4: "Interação com efeitos negativos entre duas espécies que dependem do mesmo recurso limitante para sobreviver, crescer e se reproduzir.",
        answer: 3
    },
    {
        question: "O que é comensalismo?",
        choice1: "Organismo que vive dentro ou sobre outro organismo, mas raramente o mata.",
        choice2: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice3: "Interação na qual duas espécies vivem em estreita associação, e uma espécie recebe um benefício enquanto a outra não tem benefício e nem custo.",
        choice4: "Organismo que mata e consome parcial ou totalmente outro indivíduo.",
        answer: 3
    },
    {
        question: "O que é detritivoria?",
        choice1: "Organismo que vive dentro ou sobre outro organismo, mas raramente o mata.",
        choice2: "Interação entre duas espécies em que cada uma recebe benefícios da outra.",
        choice3: "Interação na qual duas espécies vivem em estreita associação, e uma espécie recebe um benefício enquanto a outra não tem benefício e nem custo.",
        choice4: "Interação que um organismo  se alimenta de matéria orgânica morta e rejeitos conhecidos como detritos.",
        answer: 4
    },
    {
        question: "O que é genótipo?",
        choice1: "Atributos de um organismo, tais como comportamento, morfologia, ou fisiologia.",
        choice2: "Conjunto de genes de um organismo.",
        choice3: "O processo de dividir habitats grandes em diversos habitats menores.",
        choice4: "Grupo de espécies que se alimenta de itens semelhantes.",
        answer: 2
    },
    {
        question: "O que é fenótipo?",
        choice1: "Grupo de espécies que se alimenta de itens semelhantes.",
        choice2: "O processo de dividir habitats grandes em diversos habitats menores.",
        choice3: "Atributos de um organismo, tais como comportamento, morfologia, ou fisiologia.",
        choice4: "Conjunto de genes de um organismo.",
        answer: 3
    },
    {
        question: "O que é mimetismo?",
        choice1: "Movimento de indivíduos de uma área para outra.",
        choice2: "Uma estratégia na qual a não palatabilidade evolui em associação a cores e padrões muito notáveis.",
        choice3: "A evolução de novas espécies.",
        choice4: "Organismo que imita morfologia de outro indivíduo.",
        answer: 4
    },
    {
        question: "O que é aposematismo?",
        choice1: "Movimento de indivíduos de uma área para outra.",
        choice2: "Uma estratégia na qual a não palatabilidade evolui em associação a cores e padrões muito notáveis.",
        choice3: "A evolução de novas espécies.",
        choice4: "Organismo que imita morfologia de outro indivíduo.",
        answer: 3
    },
    {
        question: "O que é camuflagem?",
        choice1: "Movimento de indivíduos de uma área para outra.",
        choice2: "Uma estratégia na qual a não palatabilidade evolui em associação a cores e padrões muito notáveis.",
        choice3: "Estratégia que o indivíduo se combina com seu ambiente ou confundir o perfil de um indivíduo para se misturar melhor com o ambiente de fundo.",
        choice4: "Organismo que imita morfologia de outro indivíduo.",
        answer: 3
    },
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTION = questions.length;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = randomQuestion();
    console.log(availableQuestions);
    getNewQuestion();
};

randomQuestion = (arr) =>{
    return arr;
} 

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign('/end2.html');
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


