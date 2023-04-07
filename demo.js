//constants
const startBtn = document.getElementById("play-btn");
// const stopBtn = document.getElementById("stop-btn");
const replayBtn = document.getElementById("replay-btn");
const scoreText = document.getElementById("score");
const spawnText = document.getElementById("spawn");

const statsDiv = document.getElementById("stats");
const shotsText = document.getElementById("shots");
const scoreTextFinal = document.getElementById("score2");
const percentHitsText = document.getElementById("percent-hits");
const percentMissesText = document.getElementById("percent-misses");

//bind on load
startBtn.addEventListener("click", startGame); 
// stopBtn.addEventListener("click", stopSpawn);
replayBtn.addEventListener("click", function() {
    location.reload()
}); 

//variablesssss
let spawnerID;
let spawnedAmnt = 0;
let timesClicked = 0;
let score = 0;

function initTimer(){
    var sec = 4;    //set lower for test
    var timer = setInterval(function(){
        document.getElementById("timer").innerText='00:'+sec;
        sec--;
        if (sec < 0) {
            endGame()
            clearInterval(timer);
        }
    }, 1000);
}

function startGame(){
    startBtn.remove()
    //for amnt of shots
    //bind here so clicking the btn doesnt count as one
    setTimeout(() => {
        window.addEventListener("click", function() {
            timesClicked++;
            console.log("times clicked: " + timesClicked);
        }); 
    }, 500);

    initTimer();

    spawnerID = window.setInterval(() => {
        addTarget();
        console.log("Delayed for 1/2 second.");
    }, 500);  
}

function endGame(){
    clearInterval(spawnerID)   //run this first
    console.log("spawner stopped")
    
    let targetsOnScreen = document.getElementsByClassName("target");
    for (let i = 0; i <= targetsOnScreen.length; i++) {
        targetsOnScreen[i].remove();
    }

    let percentHits = ((score / timesClicked) * 100).toFixed(2);
    let percentMisses = (((timesClicked - score) / timesClicked) * 100).toFixed(2);
    console.log(score + " / " + timesClicked + " = " + percentHits + "\n" + timesClicked + " - " + score + " / " +  timesClicked + " = " + percentMisses)

    replayBtn.style.display = "block";
    statsDiv.style.display = "block";
    shotsText.innerText = timesClicked;
    scoreTextFinal.innerText = score;
    if(percentHits === NaN){
        console.log("reach")
        percentHits = 0;
    }
    if (percentMisses === NaN) {
        console.log("reach")
        percentMisses = 0;
    }
    percentHitsText.innerText = percentHits + "%";
    percentMissesText.innerText = percentMisses + "%";
}

//handler attached to each spawned target
function shootHandler(element){
    element.remove();
    score++;
    scoreText.innerText = score;
    // console.log(score)
}

function addTarget() {
    const stage = document.getElementById("stage");
    
    const target = document.createElement("div");
    target.classList.add("target");
    target.addEventListener("click", function() {
        shootHandler(target);
    }); 

    stage.append(target);
    spawnedAmnt++;
    spawnText.innerText = spawnedAmnt;
}