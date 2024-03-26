//* Original Code Below:
//* CloeLiang (Liang Xin Chloe) Repo: https://github.com/ChloeLiang/rhythm-game
//* Demo of Unmodified Code: https://chloeliang.github.io/rhythm-game/

//! IF USING THIS FILE, REMEMBER TO INVOKE THIS SCRIPT RIGHT AFTER THE "songSettings" SCRIPT

// isHolding variable sets each key that is going to be used as false. ' ' is known as SPACEBAR
//! make sure this matches with the key sheet inside the songSettings.js
var isHolding = {
  s: false,
  d: false,
};
//* Creates a  songlist with audio tracks for the game
const songlist = {
  Tutorial: "audio/music/Tutorial.mp3",
  sonicAndMJ: "audio/music/Carnival_Night_X_MJ.mp3",
  // NIKKEShop: "audio/music/Goddess_of_Victory_NIKKE_Shop.mp3",
  RacingIntoTheNight: "audio/music/racingIntoTheNight.mp3",
  DDU_DU: "audio/music/BLACKPINK_DDU-DU_DDU-DU.mp3",
  TripInnocent: "audio/music/Trip_Innocent_of_D_(Instrumental).mp3",
  Idol: "audio/music/Idol.mp3",
  DRIVE: "audio/music/DRIVE.mp3"
}
const fullSongArray = Object.values(songlist);
// hits variable stores information about the player's note's when hitting them
var hits = {perfect: 0, good: 0, bad: 0, miss: 0};
// multiplier variable sets a multiplier score for each note judgement
var multiplier = {
  perfect: 1,
  good: 0.8,
  bad: 0.5,
  miss: 0,
  combo40: 1.05,
  combo80: 1.10
};
//* create various global variables to use inside other functions. isPlaying variable checks for gameplay status
var isPlaying = false;
// checks the speed of each note the user wants
var speed = 0;
// keeps track of the user's combo
var combo = 0;
//  keeps track of the user's max combo
var maxCombo = 0;
// keeps track of the user's score
var score = 0;
// names the animation of the notes
var animation = 'moveDown';
// creates a startTime variable
var startTime;
// creates a trackContainer variable
var trackContainer;
// creates a tracks variable
var tracks;
// creates a keypress variable
var keypress;
// creates a comboText variable
var comboText;
//* create global function to initialize the game
function startGame() {
  initializeNotes();
  // setupSpeed();
  // setupChallenge();
  setupKeys();
  setupNoteMiss();
  }
const gameStylesheet = document.styleSheets[1];
//* the variable "initializeNotes" includes a function to be executed when called. this function gets the notes ready for the game
var initializeNotes = function () {
  var noteElement;
  var trackElement;
  // checks if the trackContainer variable has any child nodes
  while (trackContainer.hasChildNodes()) {
    // remove the last child node from trackContainer
    trackContainer.removeChild(trackContainer.lastChild);
  }
  //* looks inside the song object and gets the sheet array to execute the following function. the sheet's values is placed on the key variable
  song.sheet.forEach( function (key, index) {
    // trackElement will create itself a div for how many notes are included in the song sheet and have a class named "track"
    trackElement = document.createElement('div');
    trackElement.classList.add('track');
    // for each keyboard input's notes inside of the sheet (key) value, create this many divs inside of the trackElement div with specified classes (the note variable is inside the songSettings.js)
    key.notes.forEach( function (note) {
      // noteElement will create a div with a class of "note". It will also include a class of "note--X", where X is the array's place number (s notes will have "note--0")
      noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.classList.add('note--' + index);
      // backgroundColor grabs the color string from the key variable (from songSettings)
      noteElement.style.backgroundColor = key.color;
      // animationName sets the specifed animation style from the variable animation (string)
      noteElement.style.animationName = animation;
      // animationTimingfunction sets how the animation should be timed (ease-in, ease-out, etc.). linear is default 
      noteElement.style.animationTimingFunction = 'linear';
      // animationDuration sets the amount of time the animation lasts. grabs the number from the note's duration and subtracks it by the speed variable. a "s" string is included to specify seconds
      noteElement.style.animationDuration = note.duration - speed + 's';
      //! Notes can be reduced by 2.8 to reduce delay. This may cause conflicts if the music sheet is below 2.8 seconds at start
      noteElement.style.animationDelay = note.delay + speed + 's';
      // animationPlayState specifies if the div is playing an animation or not. default value is set to "pause"
      noteElement.style.animationPlayState = 'paused';
      // appends (adds) a child to the variable trackElement (<div class="track">)
      trackElement.appendChild(noteElement);
    });
    // trackContainer appends (adds) a child from the trackElement variable
    trackContainer.appendChild(trackElement);
    tracks = document.querySelectorAll('.track');
  });
};
//* the variable "setupSpeed" includes a function to execute when called. this function sets the speed for the notes
var setupSpeed = function () {
  // querySelectorAll selects every element with the specified conditions. in this case, a class named btn--small
  var buttons = document.querySelectorAll('.btn--small');
  //* iterates each element with a class name of "btn--small" to check if the user has clicked on a specific speed setting button. each element gets placed inside the button variable
  buttons.forEach ( function (button) {
    button.addEventListener('click', function () {
      // if statement executes if the user picks a button with a innerHTML (text) of "1x". This applies to the else if conditions.
      if (this.innerHTML === '1x') {
        // the first class with the "btn--small" will now include the "btn--selected" class name. speed variable will equal to the parsed integer (1) minus 1
        buttons[0].className = 'btn btn--small btn--selected';
        buttons[1].className = 'btn btn--small';
        buttons[2].className = 'btn btn--small';
        // speed = 0
        speed = parseInt(this.innerHTML) - 1;
      }
      else if (this.innerHTML === '2x') {
        // the second class with the "btn--small" will now include the "btn--selected" class name. speed variable will equal to the parsed integer (2) minus 1
        buttons[0].className = 'btn btn--small';
        buttons[1].className = 'btn btn--small btn--selected';
        buttons[2].className = 'btn btn--small';
        // speed = 1
        speed = parseInt(this.innerHTML) - 1;
      }
      else if (this.innerHTML === '3x') {
        // the third class with the "btn--small" will now include the "btn--selected" class name. speed variable will equal to the parsed integer (3) minus 1
        buttons[0].className = 'btn btn--small';
        buttons[1].className = 'btn btn--small';
        buttons[2].className = 'btn btn--small btn--selected';
        // speed = 2
        speed = parseInt(this.innerHTML) - 1;
      }
      //// Re-loeads the initializeNotes (variable) function with updated speed settings
      //// initializeNotes();
    });
  });
};
//* the variable "setupChallenge" will check if the player wants to add a extra complication to their gameplay (Fader)
var setupChallenge = function () {
  // create a local variable called enabled to check if the player already enabled it or not
  var enabled = false;
  var challenge = document.querySelector('.config__challenge').getElementsByTagName("button")[0];
  // adds a event listener that will check if the player clicked on the fader button (challenge variable). event variable will temporary have the challenge variable data
  challenge.addEventListener('click', function (event) {
    if (enabled) {
      // remove the "btn--selected" class from the fader button and the enabled variable becomes false
      event.target.className = 'btn btn--small';
      enabled = false;
      animation = updateAnimation(enabled);
    }
    else if (!enabled) {
      // add the "btn--selected" class to the fader button and the enabled variable becomes true. executes updateAnimation function
      event.target.className = 'btn btn--small btn--selected';
      enabled = true;
      animation = updateAnimation(enabled);
    }
  });
};
//* the variable "updateAnimation" updates the css animation of the notes to a different one
var updateAnimation = function (animationBoolean) {
  // trigger varaible stores a true or false statement
  var trigger = animationBoolean;
  if (trigger) {
    var animationUpdate = 'moveDownFade';
    //// initializeNotes();
    return animationUpdate;
  }
  else if (!trigger) {
    var animationRevert = 'moveDown';
    //// initializeNotes();
    return animationRevert;
  }
};
//* adds a way for the player to insert a video to play in the background
var MVOption = function () {
  var buttonState = false;
  var MVButton = document.querySelector(".config__MV").getElementsByTagName("button")[0]
  MVButton.addEventListener("click", function (button) {
    if (!buttonState) {
      // makes MVAccepted true. A video will play in the background.
      button.target.className = "btn btn--small btn--selected";
      buttonState = true;
      MVAccepted = true;
    }
    else {
      // makes MVAccepted false. A video will NOT play in the background.
      button.target.className = "btn btn--small";
      buttonState = false;
      MVAccepted = false;
    }
  })
}
//* adds a way for the player to randomize the note order before gameplay
var randomizeOption = function () {
  var buttonState = false;
  var randomButton = document.querySelector(".config__randomize").getElementsByTagName("button")[0];
  randomButton.addEventListener("click", function (button) {
    if (!buttonState) {
      // makes MVAccepted true. A video will play in the background.
      button.target.className = "btn btn--small btn--selected";
      buttonState = true;
      randomNotes = true;
    }
    else {
      // makes MVAccepted false. A video will NOT play in the background.
      button.target.className = "btn btn--small";
      buttonState = false;
      randomNotes = false;
    }
  })
}
//* adds a way for the player to see audio visualizer in the background during gameplay
var audioVisualizerOption = function () {
  var buttonState = false;
  var audioVisualizerButton = document.querySelector(".config__audioVisualizer").getElementsByTagName("button")[0];
  audioVisualizerButton.addEventListener("click", function (button) {
    if (!buttonState) {
      // makes MVAccepted true. A video will play in the background.
      button.target.className = "btn btn--small btn--selected";
      buttonState = true;
    }
    else {
      // makes MVAccepted false. A video will NOT play in the background.
      button.target.className = "btn btn--small";
      buttonState = false;
    }
  })
}
//* the variable "startTimer" sets up the timer for the user to see while playing the game
var HUDdisplay;
var startTimer = function (duration) {
  // the display variable targets the element with a class name of "summary__timer"
  var timertextDisplay = document.querySelector('.summary__timer');
  var timerContainer = document.querySelector(".timerContainer");
  var scoreContainer = document.querySelector('.scoreContainer');
  // timer variable will have the song's duration value
  var timer = duration;
  // variables minutes and seconds get made
  var minutes;
  var seconds;
  //// change the display's ("summary__timer") styles to block and make it show up during gameplay
  //// timerContainer.style.display = 'block';
  //// timerContainer.style.opacity = 1;
  //* songDurationInterval variable will include logic for initiating a reverse timer. Has a interval of executing every second (1000 milliseconds)
  var progressBarActivated = false;
  HUDdisplay = false;
  var songDurationInterval = setInterval( function () {
    // the minutes variable gains a rounded down integer from "timer / 60"
    minutes = Math.floor(timer / 60);
    // the seconds timer variable gains the result of " timer % 60" (% => Remainder)
    seconds = timer % 60;
    //* variable minutes and seconds checks for their values with the help of a ternary assignment (? => ternary), their values will get replaced based on the outcome
    // if minutes and/or seconds is less than 10, a string of "0" plus the value of the current minutes/seconds will be the new value
    // if the statement for minutes and/or seconds is false, the value of minutes and/or seconds stays the same
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // change the textContent of the display variable based on the minutes and seconds
    timertextDisplay.textContent = minutes + ':' + seconds;
    if (HUDdisplay == false) {
      timerContainer.style.display = 'block';
      timerContainer.style.opacity = 1;
      scoreContainer.style.display = 'block';
      scoreContainer.style.opacity = 1;
      HUDdisplay = true;
    }
    if (progressBarActivated == false) {
      progressBar();
      progressBarActivated = true
    }
    //* if the timer is less than 0, remove the interval (stop looping), execute the showResult function, and change the style of the comboText variable
    if (--timer < 0) {
      clearInterval(songDurationInterval);
      showResult();
      // change the comboText style's transition and opacity
      comboText.style.transition = 'all 1s';
      comboText.style.opacity = 0;
    }
  }, 1000);
};
//* the variable "showResults" will write downthe user's score and show how data about their note presses
var showResult = function () {
  // select the corresponding classes and change the textContent for the user's note data
  document.querySelector('.perfectCount').textContent = hits.perfect;
  document.querySelector('.goodCount').textContent = hits.good;
  document.querySelector('.badCount').textContent = hits.bad;
  document.querySelector('.missCount').textContent = hits.miss;
  document.querySelector('.comboCount').textContent = maxCombo;
  document.querySelector('.scoreCount').textContent = score;
  // hide the song countdown from the screen
  document.querySelector('.timerContainer').style.opacity = 0;
  // hide the score countup from the screen
  document.querySelector('.scoreContainer').style.opacity = 0;
  loadingScreenToggle();
  // various timeouts are called here. This creates a transition from the loading screen to the results screen
  setTimeout(() => {
    resultsScreenToggle();
    setTimeout(() => {
      loadingScreenToggle();
      setTimeout(() => {
        var resultMusic = new Audio("audio/music/results_screen/INTERNET_OVERDOSE_loop.mp3");
        resultMusic.load();
        resultMusic.play();
        resultMusic.addEventListener("ended", () => {
          resultMusic.play();
        });
        document.querySelector('.summaryResult').style.opacity = 1;
      }, 500);
    }, 500)
  }, 2000);
  HUDdisplay = false;
};
//* keeps track of the player's misssed notes and records them for the player to see in the results screen
var setupNoteMiss = function () {
  trackContainer.addEventListener('animationend', function (event) {
    // index variable will contain the trackContainer's 2nd class name as its target
    var index = event.target.classList.item(1)[6];
    // Execute the following functions with updated code from the user missing a note
    // the following functions sends a "miss" string as temporary data for three functions
    displayAccuracy('miss');
    updateHits('miss');
    updateCombo('miss');
    // execute the updateMaxCombo to check if the max combo has to be changed
    updateMaxCombo();
    // executes the removeNoteFromTrack function to remove the note from the game
    removeNoteFromTrack(event.target.parentNode, event.target);
    // execute the updateNext function to ready the next note
    updateNext(index);
  });
};
//* the variable "setupKeys" makes the player press keys one at a time and prevents a keydown event from being executed infinitely
var setupKeys = function () {
  // trigger the event whenever the user holds down a key note. Will not execute a infinite loop.
  // "event" variable Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Event
  document.addEventListener('keydown', function (event) {
    // keyIndex will execute getKeyIndex function for its value
    var keyIndex = getKeyIndex(event.key);
    // only execute if the user is holding down a key from the getKeyIndex and its value is not equal to -1
    if (Object.keys(isHolding).indexOf(event.key) !== -1 && !isHolding[event.key]) {
      // sets the specified key from the isHolding variable's array to true
      isHolding[event.key] = true;
      // Grabs the element with a class of "keypress" and the specified index to style it with a display of block
      // EX: User presses "f" key => grab the 2nd element with a class of "keypress"
      keypress[keyIndex].style.display = 'block';
      // execute if the variable isPlaying is true and if the firstchild of the track element is present
      if (isPlaying && tracks[keyIndex].firstChild) {
        // execute judge function with keyIndex variable
        judge(keyIndex);
      }
    }
  });
  // checks if the key being pressed has been lifted (returns -1 if its not a valid key).
  document.addEventListener('keyup', function (event) {
    // object returns -1 if event.key is not part of isHolding variable 
    if (Object.keys(isHolding).indexOf(event.key) !== -1) {
      var keyIndex = getKeyIndex(event.key);
      isHolding[event.key] = false;
      keypress[keyIndex].style.display = 'none';
    }
  });
};
//* the variable "getKeyIndex" stores the keys the player can press to interact with the game track
var getKeyIndex = function (key) {
  // more notes can be added to this function by giving them a key and a index number. The index number represents which row the key is
  if (key === 's') {
    return 0;
  } 
  else if (key === 'd') {
    return 1;
  } 
};
//* The variable "judge" initiates the judgement conditions and execute various other functions
var judge = function (index) {
  // timeInSecond variable stores the Date.now() minus the startTime variable. the result then gets divided by 1000 to show the result in seconds
  var timeInSecond = (Date.now() - startTime) / 1000;
  // timeNoteIndex gets a variable from the song.sheet (songSettings.js) array. It will then grab the current "next" number from the key(variabel key).next
  var nextNoteIndex = song.sheet[index].next;
  // nextNote variable prepares the next note of a specified key by grabbing the key variable from the specified sheet and go inside its notes array and takes the next note based on the index variable (unique for this function)
  var nextNote = song.sheet[index].notes[nextNoteIndex];
  // perfectTime variable determines what value should a perfectly hit note should be considered and stores it inside itself
  var perfectTime = nextNote.duration + nextNote.delay;
  // accuracy variable will have the abslute value of the given equation to represent note accuracy
  var accuracy = Math.abs(timeInSecond - perfectTime);
  // console.log(accuracy);
  // prepare the hitJudgement variable for this function only (local variable)
  var hitJudgement;
  //  As long as the note has travelled less than 3/4 (75%) of the height of the track, any key press on this track will be ignored.
  if (accuracy > (nextNote.duration - speed) / 6) {
    // stops executing the current function
    return;
  }
  // hitJudgement variable contains the result of the getHitJudgement function. uses the accuracy variable.
  hitJudgement = getHitJudgement(accuracy);
  // executes displayAccuracy function. uses hitJudgement variable
  displayAccuracy(hitJudgement);
  // executes showHitEffect function. uses index variable (temporary key value)
  showHitEffect(index);
  // executes updateHits function. uses hitJudgement variable
  updateHits(hitJudgement);
  // executes updateCombo function. uses hitJudgement variable
  updateCombo(hitJudgement);
  // Executes updateMaxCombo function
  updateMaxCombo();
  // executes calculateScore function. uses hitJudgement variable
  calculateScore(hitJudgement);
  // executes removeNoteFromTrack function. uses 3 variables for temporary data
  // tracks[index] stores the track row with the corresponding key
  // tracks[index].firstElementChild is similar to the first value above, but it grabs the most recent note from the track's row
  removeNoteFromTrack(tracks[index], tracks[index].firstElementChild);
  // executes the updateNext function. uses the index variable (temporary key value)
  updateNext(index);
};
//* the variable "getHitJudgement" sets judgement on the notes. judgement is based on a fixed accuracy (not the variable accuracy)
var getHitJudgement = function (accuracy) {
  // adjusts the accuracy of a note on the judgement line. (increase the values for easier timming). Increase/Decrease calibrate only when making small adjustments
  switch (speed) {
    case 0:
      callibrate = 0.08
      if (accuracy <= 0.023 + (callibrate / 2 + 0.015) ) {
        return 'perfect';
      }
      else if (accuracy < 0.25 + callibrate) {
        return 'good';
      }
      else if (accuracy < 0.4 + callibrate) {
        return 'bad';
      }
      else {
        return 'miss';
      }
    case 1:
      callibrate = 0.04
      if (accuracy <= 0.03 + (callibrate / 2) ) {
        return 'perfect';
      }
      else if (accuracy < 0.11 + callibrate) {
        return 'good';
      }
      else if (accuracy < 0.28 + callibrate) {
        return 'bad';
      }
      else {
        return 'miss';
      }
    case 2:
      callibrate = 0.02
      if (accuracy <= 0.045 + (callibrate / 2) ) {
        
        return 'perfect';
      }
      else if (accuracy < 0.072 + callibrate) {
        return 'good';
      }
      else if (accuracy < 0.158 + callibrate) {
        return 'bad';
      }
      else {
        console.log(accuracy);
        return 'miss';
      }
  }
  
};
//* the variable "displayAccuracy" will display the accuracy of the user's input on the track when hitting a note
var displayAccuracy = function (accuracy) {
  // variable accuracyText holds the ability to create a div element
  var accuracyText = document.createElement('div');
  // the element with a class "hit__accuracy" gets removed as soons as possible
  document.querySelector('.hit__accuracy').remove();
  // the div from the accuracyText variable gets a class of "hit__accuracy" then gets a class of "hit__accuracy(accuracy)" based on the accuracy variable (hitJudgement variable)
  accuracyText.classList.add('hit__accuracy');
  accuracyText.classList.add('hit__accuracy--' + accuracy);
  // the new div element gets its HTML modified with a accuracy label. This becomes a string inside the div
  accuracyText.textContent = accuracy;
  // the accuracyText div element gets appended (added) to a element with a class "hit". The added div gets treated  as a child node
  document.querySelector('.hit').appendChild(accuracyText);
};
//* the variable "showHitEffect" gives the designated track row color when hitting a note
var showHitEffect = function (index) {
  // the key variable selects all elements with a class "key", but it will only select one element based on the index variable (from getKeyIndex function)
  var key = document.querySelectorAll('.key')[index];
  // the hitEffect variable will be able to create a div element on call. The variable gets called afterwards and the newly created div ghets a class of "key__hit"
  var hitEffect = document.createElement('div');
  hitEffect.classList.add('key__hit');
  // appends (add) the hitEffect as a child to the key variable 
  key.appendChild(hitEffect);
};
//* the variable "updateHits" keeps adding each note that has been hit by the user. The index specifies which value should be increased inside the hits object
var updateHits = function (judgement) {
  hits[judgement]++;
};
//* the variable "updateCombo" will keep track of the user's current combo. If the player gets a bad or miss, the combo resets
var updateCombo = function (judgement) {
  // if statement executes on a "bad" or "miss" judgement
  if (judgement === 'bad' || judgement === 'miss') {
    // combo gets reset and the combo gets removed from the player's sight
    combo = 0;
    comboText.textContent = '';
  } 
  else {
    // combo gets increased by one and then gets displayed on the game
    comboText.textContent = ++combo;
  }
};
//* the variable "updateMaxCombo" checks if the player has surpassed the highest current combo during gameplay. 
var updateMaxCombo = function () {
  maxCombo = maxCombo > combo ? maxCombo : combo;
};
//* the variable "calculateScore" will calculate the user's score based on how many notes have been hit and what type of judghement the note recieved
var calculateScore = function (judgement) {
  // the following if statements are required to lock certain point calculations. These requirements are based on the user's performance in keeping thier combo going throughout the game
  if (combo >= 80) {
    score += 1000 * multiplier[judgement] * multiplier.combo80;
  } else if (combo >= 40) {
    score += 1000 * multiplier[judgement] * multiplier.combo40;
  } else {
    score += 1000 * multiplier[judgement];
  }
  playerScoreDisplay(score);
};
//* the varaible "removeNoteFromTrack" will remove the in-game note when the player either misses or hits the note
var removeNoteFromTrack = function (parent, child) {
  // the parent (tacks[index]) will have its child (tracks[index].firstChild) removed
  parent.removeChild(child);
};
//* the variable "updateNext" will update the varaible key's "next" value. This value gets incremented (add) by 1
var updateNext = function (index) {
  // changes the value of "next" inside the ley variables in songSettings.js
  song.sheet[index].next++;
};
//* the variable "progressBar" will update the progress bar based on the time of the music
//! Currerntly not being used
var progressBar = function() {
  // get the element that contains the progress bar inside a progressBarContainer variable
  var progressBarContainer = document.getElementById("musicProgress");
  // musicDuration variable contains the song's duration
  var musicDuration = song.duration;
  // progressBarFillTimer object contains data for the progress bar's music duration and how many times it will run
  //! Currently not used 
  const progressBarFillTimer = {
    // duration = song length in seconds (1000 = 1 second)
    duration: musicDuration * 1000,
    // iterations = how many times the code should run
    iterations: 1
  };
  //* insert a new class rule called "animationProgressToggle" inside the game.css file. This gets overwritten every single time the progressBar function gets updated with a new song
  //// gameStylesheet.insertRule(".animationProgressToggle { animation: progressBarFill " + progressBarFillTimer.duration + "ms " + progressBarFillTimer.iterations + " linear", 5);
  // toggles newly added class
  progressBarContainer.classList.toggle("animationProgressToggle");
  // create a event listener for the progress bar. removes the class from the progress bar and then deletes it from the game.css file only if the animation of the progress bar ends
  progressBarContainer.addEventListener("animationend", () => {
    progressBarContainer.classList.toggle("animationProgressToggle");
    // gameStylesheet.deleteRule(5);
  });
}
//* the varaible "playerScore" will display the user's score during gameplay
var playerScoreDisplay = function(updatedScore) {
  updatedScore = score;
  document.querySelector(".playerScore").textContent = score;
}
//* execute the following code after the page loads
window.onload = function () {
  // sets up the trackContainer variable with an element with the class "track-container"
  trackContainer = document.querySelector('.track-container');
  // keypress variable selects every element with the class "keypress" and adds them to a nodeList
  keypress = document.querySelectorAll('.keypress');
  // comboText variable selects an element with the "hit__combo" class
  comboText = document.querySelector('.hit__combo');
  // readyGameplaySong variable loads a song from songlist object
  readyGameplaySong = new Audio(songlist.sonicAndMJ);
  setupSpeed();
  setupChallenge();
  MVOption();
  randomizeOption();
  audioVisualizerOption();
}
