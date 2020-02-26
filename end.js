const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore') || 0;
const finalScore = document.getElementById('finalScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',()=> {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e =>{
    console.log('Clicked the save button');
    e.preventDefault();
}