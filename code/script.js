

function light() {
    let element = document.querySelector("body")
    let con = document.querySelectorAll("#quiz");
    element.style.backgroundColor = "#F5F6FA";
    element.style.backgroundImage = "url(/images/pattern-background-desktop-light.svg)";
    element.style.color = "black";
    con.forEach(bg => {
        bg.style.backgroundColor = "#fff";
    });
};
function Dark() {
    let element = document.querySelector("body");
    let con = document.querySelectorAll("#quiz"); 
    let col = document.getElementsByClassName("quiz");
    element.style.backgroundColor = "#313E51";
    element.style.backgroundImage = "none";
    element.style.color = "white";
    con.forEach(bg => {
        bg.style.backgroundColor = "#778ca3";
    });   
};

let questionElement = document.getElementById('text1');
let answerElement = document.getElementById('quiz');
let quesNumber = document.getElementById('quesNo');
let nextbtn = document.getElementById('next_btn');
nextbtn.style.display = 'none';
let pick = document.querySelector('.text2');
let answerbody = document.getElementById('answer');
answerbody.style.display = 'none';
let showScore = document.querySelector('.showScore');
let head = document.querySelector('.header');
let main = document.querySelector('.main');
let su = document.querySelector('.su');
su.style.display = 'none';
let rese = document.querySelector('#reset');
rese.style.display = 'none';
let progressBar = document.getElementById('file');
progressBar.max = 10;
progressBar.style.display = 'none';
let ans = null;
let selectedBtn = null;
let questions = [];
let currentQuestion = null;
let randomQuestion = [];
let currentQuestionIndex = 0;
let score = 0;

function Quiz(subject) {
    fetch(subject+"_ques.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        randomQuestion = getRandomQuestions(questions, 10);
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    })
    .catch((error) =>{console.error("Error", error)});
    nextbtn.style.display = '';
    pick.style.display = 'none';
    progressBar.style.display = '';
    answerbody.style.display = '';
}
function getRandomQuestions(array, count) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
return shuffled.slice(0, count);
}
function showQuestion() {
    currentQuestion = randomQuestion[currentQuestionIndex];
    let quesNo = currentQuestionIndex + 1;
    quesNumber.innerHTML = 'Question No. ' + quesNo;
    questionElement.innerHTML = currentQuestion.question;
    questionElement.style.fontSize = '35px';
    currentQuestion.options.forEach(option  => {
        const li = document.createElement('li');
        const q = answerbody.appendChild(li);
        q.innerHTML = option;
        q.classList.add('quiz');
        li.addEventListener('click', function selected() {
            selectedBtn = li.textContent;
            q.classList.add('selected');
});     
    }) 
    document.getElementById('quiz_con').innerHTML = '';
}
rese.addEventListener('click', function load(){
    location.reload(); 
})

nextbtn.addEventListener('click', function next() {
        if(selectedBtn == null){
            alert('Please select a answer');
            return;
            }
            
        let ans = currentQuestion.answer;
            if(selectedBtn == ans) {
                score++;
            }
            currentQuestionIndex++;
            answerbody.innerHTML = '';
            selectedBtn = null;
            if (currentQuestionIndex == 10) {
                head.innerHTML = '';
                main.innerHTML = '';
                showScore.innerText = 'Your score is ' + score + ' out of 10';
                showScore.classList.add('showScoreu');
                su.style.display = '';
                nextbtn.style.display = 'none';
                rese.style.display = '';
                rese.classList.add('reset');
            }
            showQuestion();
            progressBar.value = currentQuestionIndex + 1;
        })





