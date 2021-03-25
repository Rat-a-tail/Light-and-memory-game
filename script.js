/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

// global constants
const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence


//Global Variables
var pattern = [6, 5, 2, 3, 2, 1, 2, 4, 5];
var progress = 0; 
var gamePlaying = false;

var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;


function startGame(){ 
    //initialize game variables
    progress = 0;
    gamePlaying = true;
  
  // swap the Start and Stop buttons
document.getElementById("startBtn").classList.add("hidden");
document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
    //initialize game variables
  //alert("got to stop game" + progress);
    gamePlaying = false;
  
  // swap the Start and Stop buttons
document.getElementById("startBtn").classList.remove("hidden");
document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 279.6,
  2: 150,
  3: 332,
  4: 406.2,
  5: 500,
  6: 900
  
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)



function lightButton(btn){
  //document.getElementById("button"+btn).classList.add("lit")
  
  document.getElementById("Button"+btn+ "Btn").classList.add("lit")
  //alert( " executed lightbutton function");
}
function clearButton(btn){
  document.getElementById("Button"+btn+ "Btn").classList.remove("lit")
}


function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    // used alerts and realised sounds not playing
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
    // alert("completed playSingClue");
  }
}


function playClueSequence(){
  //console.log("hsdhgsfh")
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far  pattern.length
    //alert("hello " + i );
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms") // prints staments
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime; 
    delay += cluePauseTime;
  }
}
// len -- look up in java script to find length of array.
//console.error -- turns stuff red.

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won.");
}


function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
    if (pattern[guessCounter] == btn) {
    if (guessCounter == progress) {
      if (guessCounter == pattern.length - 1) {
        winGame();
      }
      else{
        ++ progress;
        playClueSequence();
      }
    }
    else{
      ++ guessCounter;
    }
    
  }
  else{
    loseGame();
  }
}
 
/*

// Things I could have improved on the app:
use a loop for the last  checks to make sure each key is being played. 
I also found that replacing btn with ""Button"+btn+ "Btn")" made a difference with so that the sounds 
are played to the user and they can be heard. I used alerts to enable me debug this.

*/
  
  /*
  let j =0;
  while (j < pattern.length){
  if (pattern[guessCounter] == btn && guessCounter == progress && guessCounter == pattern.length - 1){
    winGame();
  }
  else{
    ++ progress;
    playClueSequence();
  }
  else{
    ++ guessCounter;
  }
}
else{
  loseGame;
}
  } */


  // alert("here")


  



  
   
    

  
    
  /* 
  if(pattern[guessCounter] == btn){
    //Guess was correct!
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        //GAME OVER: WIN!
        winGame();
      }else{
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    }else{
      //so far so good... check the next guess
      guessCounter++;
    }
  }else{
    //Guess was incorrect
    //GAME OVER: LOSE!
    loseGame();
  }
*/
  
