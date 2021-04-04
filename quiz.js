const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D")
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "O nome Olinda foi dado a partir de uma frase dita por: ",
        imgSrc : "img/1.jpg",
        choiceA : 'Duarte Coelho',
        choiceB : 'João de Barros',
        choiceC : 'Pedro Lopes de Souza',
        choiceD : 'Martin Afonso',
        correct : "A"
    },{
        question : "Qual era o nome da aldeia localizada onde Olinda é hoje?",
        imgSrc : "img/2.jpg",
        choiceA : 'Guarani',
        choiceB : 'Marim',
        choiceC : 'Kaiowá',
        choiceD : 'Wajãpi',
        correct : "B"
    },{
        question : "Quantas bacias hidrográficas Olinda possui?",
        imgSrc : "img/3.jpg",
        choiceA : 1,
        choiceB : 'Nenhuma',
        choiceC : 2,
        choiceD : 3,
        correct : "C"
    },{
        question : "Qual o nome do país que invadiu Olinda em 1630?",
        imgSrc : "img/4.jpg",
        choiceA : 'Portugal',
        choiceB : 'Espanha',
        choiceC : 'Alemanha',
        choiceD : 'Holanda',
        correct : "D"
    },{
        question : "Qual desses títulos Olinda não possui?",
        imgSrc : "img/5.jpg",
        choiceA : 'Capital Brasileira da Cultura',
        choiceB : 'Monumento Internacional',
        choiceC : 'Patrimônio Histórico da Humanidade',
        choiceD : 'Cidade Ecológica',
        correct : "B"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
           
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        
        score++;
        
        answerIsCorrect();
    }else{
        
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
   
    const scorePerCent = Math.round(100 * score/questions.length);
    
    
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















