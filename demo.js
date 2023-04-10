//constants
const stage = document.getElementById("stage");
const startBtn = document.getElementById("play-btn");
// const stopBtn = document.getElementById("stop-btn");
const replayBtn = document.getElementById("replay-btn");
const scoreText = document.getElementById("score");
const spawnText = document.getElementById("spawn");

const statsDiv = document.getElementById("stats");
const hudDiv = document.getElementById("hud");
const timerText = document.getElementById("timer");
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
var widthBoundary = 640;
var heightBoundary = 480;
let spawnerID;
let clickCountID;
let spawnedAmnt = 0;
let timesClicked = 0;
let score = 0;
let spawnedOnStart = false;

function initTimer(){
    var sec = 59;    //set lower for test
    var timer = setInterval(function(){
        timerText.innerText='00:'+sec;
        sec--;
        if(sec < 11){
            timerText.style.color = "red";
        }
        if (sec == -1) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function startGame(){
    startBtn.remove();
    stage.style.display= "block";

    //for amnt of shots
    //bind here so clicking the btn doesnt count as one
    clickCountID = setTimeout(() => {
        window.addEventListener("click", function() {
            timesClicked++;
            console.log("times clicked: " + timesClicked);
        }); 
    }, 500);

    initTimer();
    spawnTargetsOnStart();

    //reset event listener
    spawnerID = window.setInterval(() => {
        spawnTarget();
        console.log("Delayed for 1 second.");
    }, 1000);  
}

function endGame(){
    stopSpawn();
    stopClickCount();

    stage.remove();
    hudDiv.style.display = "none";
    document.getElementById("instructions").style.display = "none";

    let percentHits = ((score / timesClicked) * 100).toFixed(2);
    let percentMisses = (((timesClicked - score) / timesClicked) * 100).toFixed(2);
    console.log(score + " / " + timesClicked + " = " + percentHits + "\n" + timesClicked + " - " + score + " / " +  timesClicked + " = " + percentMisses);

    //so that NaN isnt shown
    if(score == 0){
        console.log("reach")
        percentHits = 0;
        percentMisses = 0;
    }

    replayBtn.style.display = "block";
    statsDiv.style.display = "block";
    shotsText.innerText = timesClicked;
    scoreTextFinal.innerText = score;
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

function spawnTargetsOnStart() {
    for (let i = 0; i < 100; i++) {
        const target = document.createElement("div");
        target.classList.add("target");
        target.addEventListener("click", function() {
            shootHandler(target);
        });

        //set random spawn y coord to push target down
        let randomY = Math.ceil((Math.random() * heightBoundary));
        target.style.top = randomY + "px";

        //add the elem to the stage
        stage.append(target);
        spawnedAmnt++;
        spawnText.innerText = spawnedAmnt;

        //pick a random animation
        getRandomAnim(target)
    }
}

function spawnTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.addEventListener("click", function() {
        shootHandler(target);
    });

    //set random spawn y coord to push target down
    let randomY = Math.ceil((Math.random() * heightBoundary));
    //set spawn for each target
    target.style.top = randomY + "px";

    //add the elem to the stage
    stage.append(target);
    spawnedAmnt++;
    spawnText.innerText = spawnedAmnt;

    //pick a random animation
    getRandomAnim(target)
}

function getRandomAnim(currentTarget){
    //get random vals to use
    let randomChoice = Math.floor(Math.random() * 2);
    let randomDelay = (Math.random() * 1500);
    // let randomDuration = (Math.random() * 14000);
    let randomDuration = (Math.random()* ((12000 - 4000) + 1) + 4000);
    let animChoice;

    switch (randomChoice) {
        case 0:     //left
            animChoice = currentTarget.animate(
                [
                    { transform: "translateX(" + widthBoundary + "px)" }, 
                    { transform: "translateX(0%)" },
                ], {
                    easing: 'ease-in',
                    duration: randomDuration,
                    direction: 'alternate',
                    iterations: Infinity,
                    delay: randomDelay
                }
            );
            break;
        case 1:     //right
            animChoice = currentTarget.animate(
                [
                    { transform: "translateX(0px)" }, 
                    { transform: "translateX(" + widthBoundary + "px)" }, 
                ], {
                    easing: 'ease-in',
                    duration: randomDuration,
                    direction: 'alternate',
                    iterations: Infinity,
                    delay: randomDelay
                }
            );
            break;
    }

    animChoice.play();
}

function stopSpawn(){
    clearInterval(spawnerID);
    console.log("spawner stopped");
}

function stopClickCount(){
    clearInterval(clickCountID);
    console.log("click-count stopped");
}