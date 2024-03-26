//* tells the game if random notes should replace the pre-made notes
var randomNotes = false;
//* Different songs inside the songPreviewList object with their representing names
const songPreviewList = {
  Tutorial: new Audio("audio/music/preview/Tutorial_preview.mp3"),
  sonicAndJackson: new Audio("audio/music/preview/Carnival_Night_X_MJ_preview.mp3"),
  // NIKKEShop: new Audio("audio/music/preview/Goddess_of_Victory_NIKKE_Shop_preview.mp3"),
  RacingIntoTheNight: new Audio("audio/music/preview/racingIntoTheNight_preview.mp3"),
  DduDdu: new Audio("audio/music/preview/DDU_DU_DUU-DU_preview.mp3"),
  TripInnocent: new Audio("audio/music/preview/Trip_Innocent_of_D_(Instrumental)_preview.mp3"),
  Idol: new Audio("audio/music/preview/Idol_preview.mp3"),
  DRIVE: new Audio("audio/music/preview/DRIVE_preview.mp3")
};
//* Different MV inside the backgroundMV object with their representing names
const backgroundMV = {
  sonicAndJackson: "audio/video/Sonic3_Carnival_Night_480p.mp4",
  DduDdu: "audio/video/Dududu_480p.mp4",
  TripInnocent: "audio/video/Trip_Innocent_Of_D_480p.mp4",
  Idol: "audio/video/Idol_480p.mp4"
}
//* holds a .csv file for a selected song whcih includes the timestamps of a song
const CSVFileDirectory = {
  DRIVE: "songsheets/DRIVE.csv"
}
// converts the song previews into a array
const songPreviewArray = Object.values(songPreviewList);
var mainScreen = document.getElementById("mainScreen");

// target start button
var startButton = document.body.getElementsByClassName("startButton")[0];
var songListContainer = document.getElementById("playSongContainer");
//* make the player press play to reveal the song list. This allows the audio request to be accepted from the user instead of forcing audio to the user
startButton.addEventListener("click", () => {
  startButton.remove();
  setTimeout( () => {
    songListContainer.style.display = "block";
    setTimeout( () => {
      songListContainer.style.opacity = "1";
      songListContainer.style.visibility = "visible";
    }, 1);
  }, 100);
})


// target other buttons
var exitButton = document.body.getElementsByClassName("exitButton")[0];
// create object class to store boolean values for toggle


// Option button 
var optionButton = document.body.getElementsByClassName("optionButton")[0];
var optionVisible = true;
var J$optionTarget = "#settingsContainer";
optionButton.addEventListener("click", () => {
  // this condition prevents animation spam from Jquery code
  if (!($(J$optionTarget).is(':animated'))) {
    if (optionVisible) {
      $(J$optionTarget).slideToggle(500);
      optionVisible = false;
    }
    else {
      $(J$optionTarget).slideToggle(500);
      optionVisible = true;
    }
  }
})
// instruction button
var instructionButton = document.body.getElementsByClassName("instructionButton")[0];
var instructionVisible = true;
var J$instructionTarget = "#informationContainer";
instructionButton.addEventListener("click", () => {
  // this condition prevents animation spam from Jquery code
  if (!($(J$instructionTarget).is(':animated'))) {
    if (instructionVisible) {
      $(J$instructionTarget).slideToggle(500);
      instructionVisible = false;
    }
    else {
      $(J$instructionTarget).slideToggle(500);
      instructionVisible = true;
    }
  }
})
// Exit button
exitButton.addEventListener("click", () => {
  // closes current window for user
  window.close();
})



var loadingScreen = document.getElementById("loadingScreen");
var resultsScreen = document.getElementById("resultsScreen");
var bodytag = document.body;
//* reveals loading screen (can be reversed)
function loadingScreenToggle() {
  loadingScreen.classList.toggle("loadingScreenVisibility");
  bodytag.classList.toggle("noScroll");
}
//* reveals result screen (can be reversed)
function resultsScreenToggle() {
  resultsScreen.classList.toggle("resultsScreenVisibility");
  bodytag.classList.toggle("noScroll");
}

// getInformationPlaceholder variable fetches the element containing each song preview
var getInformationPlaceholder = document.getElementById("playSongContainer").getElementsByClassName("informationPlaceholder")[0];
// thumbnailString variable gets a array of elements with a class of "songContainer"
var thumbnailString = getInformationPlaceholder.getElementsByClassName("songContainer");

//* songHolderArray constant grabs each element with a "songContainer" class and places them in a array. thumbnailArray grabs each element with a "songCoverContainer" class and places it inside a array. playButtonArray grabs all the available play Buttons.
const songHolderArray = getSongContainer();
const thumbnailArray = getSongThumbnail(songHolderArray);
const playButtonArray = getPlayButton(getSongContainer());
// following code cycles the setupThumbnails function for each avaialable song Container
for (var i = 0; i < songHolderArray.length; ++i) {
  setupThumbnails(songHolderArray[i].parentElement, thumbnailArray[i], songPreviewArray[i]);
  setupPlayButton(playButtonArray[i], songPreviewArray[i]);
}
// the following three functions organizes the song previews inside each HTML element with a songContainer
function getSongContainer() {
  var outsideSongHolderArray = [];
  for (var i = 0; i < thumbnailString.length; ++i) {
    outsideSongHolderArray[i] = getInformationPlaceholder.getElementsByClassName("songContainer")[i];
  }
  return outsideSongHolderArray;
}
function getSongThumbnail(songElement) {
  var getThumbnailArray = songElement;
  for (var i = 0; i < songElement.length; ++i) {
    getThumbnailArray.splice(i, 1, getThumbnailArray[i].getElementsByClassName("songCoverContainer")[0]);
  }
  return getThumbnailArray;
}
function getPlayButton(songArray) {
  var songs = songArray;
  for (i = 0; i < songs.length; ++i) {
    songs.splice(i, 1, songs[i].getElementsByClassName("playSongButton")[0]);
  }
  return songs;
}

//* SetupPlayButton readies gameplay, then starts the game
function setupPlayButton(playButton, songPreview) {
    // add event Listeners for executing the game with the specified song sheet
    playButton.addEventListener("click", () => {
    thumbnailMusicCheck(songPreview);
    loadingScreenToggle();
    // wait for the loading screen to go away, then start game
    loadingScreen.addEventListener("animationend", initializeGame(songPreview));
  })
  // checks if the thumbnail music is playing. If true, shut it off
  function thumbnailMusicCheck(check) {
    if (!check.paused) {
      check.load();
    }
  }
}
//* setupPlayButton manipulates the preview thumbnail with color and sound
function setupThumbnails(songHolder, thumbnail, selectedSong) {
  thumbnail.addEventListener("mouseenter", () => {
    selectedSong.play();
    if (thumbnail.classList.contains("colorizedThumbnail") != true) {
      thumbnail.classList.toggle("colorizedThumbnail");
      // thumbnailCheck variable will grab the thumbnail's file name which will be used for the following switch statement
      var thumbnailCheck = thumbnail.getElementsByClassName("songCover")[0].src.split("/").pop();
      // Checks if a specified thumbnail has some extra modifications based on file name
      switch (thumbnailCheck) {
        case "NIKKE_Shop_Static.png":
          thumbnail.getElementsByClassName("songCover")[0].src = "img/previewImages/NIKKE_Shop.gif"
          break;
      }
      
    }
  })
  songHolder.addEventListener("mouseleave", () => {
    selectedSong.load();
    selectedSong.pause();
    if (thumbnail.classList.contains("colorizedThumbnail") != false) {
      thumbnail.classList.toggle("colorizedThumbnail");
      // thumbnailCheck variable will grab the thumbnail's file name which will be used for a switch statement
      var thumbnailCheck = thumbnail.getElementsByClassName("songCover")[0].src.split("/").pop();
      // Checks if a specified thumbnail has some extra modifications based on file name
      switch (thumbnailCheck) {
        case "NIKKE_Shop.gif":
          thumbnail.getElementsByClassName("songCover")[0].src = "img/previewImages/NIKKE_Shop_Static.png"
          break;
      }
    }
  })
  // Checks if the song preview ended. Plays the song again
  selectedSong.addEventListener("ended", () => {
    selectedSong.play();
  })
}
//* initializeGame function starts the game based on the user's song choice
function initializeGame(check) {
  startGame();
  // checks which song the player has chosen and gets the notes ready.
  switch (check) {
    case songPreviewArray[0]:
      replaceLoadingImage(0);
      replaceSongsheet(Tutorial_L, Tutorial_R, fullSongArray[0], Tutorial_L.timestamp);
      showGameplayArea();
      break;
    case songPreviewArray[1]:
      replaceLoadingImage(1);
      replaceSongsheet(sonicAndMJ_L, sonicAndMJ_R, fullSongArray[1], sonicAndMJ_L.timestamp);
      showGameplayArea();
      if (MVAccepted) {
        prepareMV(backgroundMV.sonicAndJackson);
      }
      break;
    // case songPreviewArray[2]:
    //   replaceLoadingImage(2);
    //   replaceSongsheet(NIKKEShop_L, NIKKEShop_R, fullSongArray[2], NIKKEShop_L.timestamp);
    //   showGameplayArea();
    //   break;
    case songPreviewArray[2]:
      replaceLoadingImage(2);
      replaceSongsheet(RacingIntoTheNight_L, RacingIntoTheNight_R, fullSongArray[2], RacingIntoTheNight_L.timestamp);
      showGameplayArea();
      break;
    case songPreviewArray[3]:
      replaceLoadingImage(3);
      replaceSongsheet(DduDdu_L, DduDdu_R, fullSongArray[3], DduDdu_L.timestamp);
      showGameplayArea();
      if (MVAccepted) {
        prepareMV(backgroundMV.DduDdu);
      }
      break;
    case songPreviewArray[4]:
      replaceLoadingImage(4);
      replaceSongsheet(TripInnocent_L, TripInnocent_R, fullSongArray[4], TripInnocent_L.timestamp);
      showGameplayArea();
      if (MVAccepted) {
        prepareMV(backgroundMV.TripInnocent);
      }
      break;
    case songPreviewArray[5]:
      replaceLoadingImage(5);
      replaceSongsheet(Idol_L, Idol_R, fullSongArray[5], Idol_L.timestamp);
      showGameplayArea();
      if (MVAccepted) {
        prepareMV(backgroundMV.Idol);
      }
      break;
      //* example of using the new Jquery note system (Song 7)
      //! remember to replace songnames and attributes with respective song when copying this block of code 
      case songPreviewArray[6]:
        replaceLoadingImage(6);
        // checks if the player wants randomizes notes
        if (randomNotes) {
          // grab CSV File directory inside of the object CSVFileDirectory
          getCSVData(CSVFileDirectory.DRIVE);
          // the interval checks to see if gotCSVTimestamps has data inside (10 miliseconds)
          var tempInterval = setInterval(() => {
            if (gotCSVTimestamps) {
              // grabs left and right lane variable of desired song
              randomizeNotePlacement(DRIVE_L, DRIVE_R);
              // setup gameplay
              replaceSongsheet(DRIVE_L, DRIVE_R, fullSongArray[6], DRIVE_L.timestamp);
              // clears the interval so the loop does not execute anymore
              clearInterval(tempInterval);
            }
          }, 10);
        }
        else {
        replaceSongsheet(DRIVE_L, DRIVE_R, fullSongArray[6], DRIVE_L.timestamp);
        }
        showGameplayArea();
        break;
    
    //* randomizes notes on each lane if Randomizer is true
    function randomizeNotePlacement(leftLane, rightLane) {
      // empty the notes inside the variable that is getting affected
      leftLane.notes.length = 0;
      rightLane.notes.length = 0;
      // add the generated notes on their perspective lanes
      for (let i = 0; i < gotCSVTimestamps.left.length; i++) {
        leftLane.notes.push(gotCSVTimestamps.left[i]);
      }
      for (let i = 0; i < gotCSVTimestamps.right.length; i++) {
        rightLane.notes.push(gotCSVTimestamps.right[i]);
      }
    }

  }
  //* The replaceSongsheet local function executes and re-configures the song track and the songsheet to the selected song. Check "songSettings.js" for song informtaion
  function replaceSongsheet(leftTrack, rightTrack, songItem, time) {
    // removes empty values inside of song.sheet (songSettings.js) and replaces them with filled notes from respective tracks
    song.sheet.splice(0, 2, leftTrack, rightTrack);
    song.duration = time;
    readyGameplaySong = new Audio(songItem);
    
    var testing = document.querySelectorAll(".track");
    while (testing[0].firstElementChild != null && testing[1].firstElementChild != null) {
      testing[0].removeChild(testing[0].firstElementChild);
      testing[1].removeChild(testing[1].firstElementChild);
    }
    initializeNotes();
  }
  //* shows the game screen and then executes the startRhythmGame function
  function showGameplayArea() {
    setTimeout( () => {
      mainScreen.style.display = "none";
      document.getElementById("gameplayAreaContainer").style.display = "flex";
      setTimeout(() => {
        loadingScreenToggle();
        startRhythmGame();
      }, 300);
    }, 3000);
  }
}
//* startRhytmGame function executes the needed code for starting the game and keeping track of time
function startRhythmGame() {
  setTimeout(() => {
    isPlaying = true;
    // startTime records the current time in the user's system
    startTime = Date.now();
    //* executes the startTimer function with the song's duration value
    //! startTimer function is included inside game.js file
    startTimer(song.duration);
    //// the code below makes the menu transparent, plays the audio file, and gives each element with a "note" class the animationPlayState sttyle "running"
    //// document.querySelector('.menu').style.opacity = 0;
    readyGameplaySong.play();
    //* selects each element with a class of "note" and plays the animation
    document.querySelectorAll('.note').forEach( function (note) {
      // each note will be given a new style called animationPlayState. It will include the value  "running" to play each note's animation
      note.style.animationPlayState = 'running';
    });
    document.getElementById("backgroundGameplayVideo").play();
    document.getElementById("backgroundGameplayVideo").style.opacity = "1";
  }, 3000)
}

//* prepareMV function gets a background video ready for gameplay. MVAccepted variable changes depending if the player wants a Motion Video or not 
//? interacts with MVOption function inside game.js.
var MVAccepted = false;
function prepareMV(backgroundVideo) {
  var videoTag = document.getElementById("backgroundGameplayVideo");
  var gameplayArticle = document.getElementById("gameplayAreaContainer");
  // currentComboText selects the only element with a class "hit__combo"
  var currentComboText = document.querySelector('.hit__combo');

  //* inserts a source element tag inside of videoTag variable with the selected MV
  var videoSource = videoTag.appendChild(document.createElement("source"));
  videoSource.setAttribute("src", backgroundVideo);
  videoSource.setAttribute("type", "video/mp4");
  // toggles background image during gameplay + makes the note lanes and combo text somewhat transparent
  gameplayArticle.classList.toggle("backgroundImageToggle");
  gameplayArticle.getElementsByClassName("game")[0].style.background = "rgba(0, 0, 0, .5)";
  currentComboText.style.opacity = ".5"
}

//* replaceLoadingImage function gives the loading screen an image to use as a background
function replaceLoadingImage(thumbnail) {
  var replaceLoadingImage = thumbnailArray[thumbnail].firstElementChild.src.split("/").pop();
  var check = replaceLoadingImage.split(".").pop();
  var edit;
  // checks if a .gif image is present or not
  if (check == "gif") {
    edit = replaceLoadingImage.split(".gif");
    // replaces the gif image with a png that ends with "_Static.png"
    replaceLoadingImage = edit[0] + "_Static.png";
  }
  // gives the loading screen some style with the used image from the song
  document.getElementById("loadingScreen").style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0) 60vh, rgb(0, 0, 0) 90vh), url(img/previewImages/" + String(replaceLoadingImage) + ")";
}

// used for getCSVData() to store in note data
var gotCSVTimestamps;
//* example of using jquery to locate a specified CSV File and create timestamps for it
// documentation: https://api.jquery.com/jQuery.ajax/#jQuery-ajax-url-settings
function getCSVData(csv) {
  // doc: https://api.jquery.com/jQuery.get/
  $.get(csv, function(data) {
    // placeholder for timestamps
    var arrayTimestamps = [];
    var columnRange = function(value, state) {
      var start = 2;
      var end = 2;
      if(state.colNum >= start && state.colNum <= end) {
        return value;
      }
      return false;
    }
    let getData = $.csv.toArrays(data, { onParseValue: columnRange });
    // loop through data to remove the ":" inside each timestamp
    for (let i = 1; i < getData.length; i++) {
      var tempString = getData[i][0];
      var newString = Number(tempString.replace(":", ""));
      arrayTimestamps.push(newString);
    }
    // format each timestamp into acceptable values (negative values should be forbiden)
    for (let i = 0; i < arrayTimestamps.length; i++) {
      if (arrayTimestamps[i] >= 100 && arrayTimestamps[i] < 200) {
        arrayTimestamps[i] = arrayTimestamps[i] - 40;
      }
      else if (arrayTimestamps[i] >= 200 && arrayTimestamps[i] < 300) {
        arrayTimestamps[i] = arrayTimestamps[i] - 80;
      }
      else if (arrayTimestamps[i] >= 300 && arrayTimestamps[i] < 400) {
        arrayTimestamps[i] = arrayTimestamps[i] - 120;
      }
      else if (arrayTimestamps[i] >= 400 && arrayTimestamps[i] < 500) {
        arrayTimestamps[i] = arrayTimestamps[i] - 160;
      }
      else if (arrayTimestamps[i] >= 500 && arrayTimestamps[i] < 600) {
        arrayTimestamps[i] = arrayTimestamps[i] - 200;
      }
      else if (arrayTimestamps[i] >= 600 && arrayTimestamps[i] < 700) {
        arrayTimestamps[i] = arrayTimestamps[i] - 240;
      }
      else if (arrayTimestamps[i] >= 700 && arrayTimestamps[i] < 800) {
        arrayTimestamps[i] = arrayTimestamps[i] - 280;
      }
      else if (arrayTimestamps[i] >= 800 && arrayTimestamps[i] < 900) {
        arrayTimestamps[i] = arrayTimestamps[i] - 320;
      }
      else if (arrayTimestamps[i] >= 900 && arrayTimestamps[i] < 1000) {
        arrayTimestamps[i] = arrayTimestamps[i] - 360;
      }
      else if (arrayTimestamps[i] >= 1000 && arrayTimestamps[i] < 1100) {
        arrayTimestamps[i] = arrayTimestamps[i] - 400;
      }
      else if (arrayTimestamps[i] >= 1100 && arrayTimestamps[i] < 1200) {
        arrayTimestamps[i] = arrayTimestamps[i] - 440;
      }
      else if (arrayTimestamps[i] >= 1200 && arrayTimestamps[i] < 1300) {
        arrayTimestamps[i] = arrayTimestamps[i] - 480;
      }
      else if (arrayTimestamps[i] >= 1300 && arrayTimestamps[i] < 1400) {
        arrayTimestamps[i] = arrayTimestamps[i] - 520;
      }
      else if (arrayTimestamps[i] >= 1400 && arrayTimestamps[i] < 1500) {
        arrayTimestamps[i] = arrayTimestamps[i] - 560;
      }
      else if (arrayTimestamps[i] >= 1500 && arrayTimestamps[i] < 1600) {
        arrayTimestamps[i] = arrayTimestamps[i] - 600;
      }
      else if (arrayTimestamps[i] >= 1600 && arrayTimestamps[i] < 1700) {
        arrayTimestamps[i] = arrayTimestamps[i] - 640;
      }
      else if (arrayTimestamps[i] >= 1700 && arrayTimestamps[i] < 1800) {
        arrayTimestamps[i] = arrayTimestamps[i] - 680;
      }
      else if (arrayTimestamps[i] >= 1800 && arrayTimestamps[i] < 1900) {
        arrayTimestamps[i] = arrayTimestamps[i] - 720;
      }
      else if (arrayTimestamps[i] >= 1900 && arrayTimestamps[i] < 2000) {
        arrayTimestamps[i] = arrayTimestamps[i] - 760;
      }
      else if (arrayTimestamps[i] >= 2000 && arrayTimestamps[i] < 2100) {
        arrayTimestamps[i] = arrayTimestamps[i] - 800;
      }


    }
    // round the timestamp time
    for(let i = 0; i < arrayTimestamps.length; i++) {
      var newValue = Math.round(((arrayTimestamps[i] - 2.8) * 100)) / 100;
      arrayTimestamps[i] = newValue;
    }
    // console.log(arrayTimestamps);
    // gotCSVTimestamps = arrayTimestamps;
    return gotCSVTimestamps = randomNotePlacement(arrayTimestamps);
    //* function randomizes notes on each lane (for two lanes only).
    function randomNotePlacement(arrayTimestamps) {
      // randomizes notes
      function randomizeNotes(time) {
        // random number from 1 - 100
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        if (randomNumber <= 40) {
          leftArray.push({duration: 3, delay: time});
        }
        else if (randomNumber > 40 && randomNumber <= 80) {
          rightArray.push({duration: 3, delay: time});
        }
        else {
          leftArray.push({duration: 3, delay: time});
          rightArray.push({duration: 3, delay: time});
        }
      }
      let leftArray = [];
      let rightArray = [];
      for (let i = 0; i < arrayTimestamps.length; i++) {
        randomizeNotes(arrayTimestamps[i]);
      }
      return {left: leftArray, right: rightArray};
    }
  });
}

//TODO: create gamepad support for game
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API#querying_the_gamepad_object
let startRequest;
let leftTrackButton = false;
let rightTrackButton = false;
// labeled buttons being used in-game
//! game.js grabs these variables for detecting lanes. Must match keyboard controls
let LButton = 's';
let RButton = 'd';


//* executes when a controller connects
window.addEventListener("gamepadconnected", (event) => {
  var gp = navigator.getGamepads()[event.gamepad.index];
  console.log("gamepad Connected:\n", gp.id);
  // fade effect for notification on-screen
  $("#controllerConnectedContainer").fadeIn(500, () => {
    setTimeout(() => {
      $("#controllerConnectedContainer").fadeToggle("slow");
    }, 3000);
  });
  gamepadButtonPress()
})
//* executes when a controller disconnects
window.addEventListener("gamepaddisconnected", (event) => {
  console.log("Gamepad disconnected:\n", event.gamepad.id);
  // fade effect for notification on-screen
  $("#controllerDisconnectedContainer").fadeIn(500, () => {
    setTimeout(() => {
      $("#controllerDisconnectedContainer").fadeToggle("slow");
    }, 3000);
  });
  // removes animation request from startRequest variable
  cancelAnimationFrame(startRequest);
})

//* prepare for controller updates with an interval
let controllerInterval;
// checks for a disconnected controller (Most browsers will likely execute this first)
if (!("ongamepadconnected" in window)) {
  // keeps checking for controller input if called
  controllerInterval = setInterval(checkGamepads, 500);
}

//* This block tries to fetch for a controller
function checkGamepads() {
  // tries to grab a connected controller
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  // checks for connected controllers
  for (i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      gamepadButtonPress();
      clearInterval(controllerInterval);
    }
  }
}

//* listens to the player's controller input (For first controller connected only)
function gamepadButtonPress() {
  // tries to grab a connected controller
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return
  }
  // only get the first connected controller for input
  var gp = gamepads[0];

  // check if controller hasn't been disconnected yet
  if (gp != null) {
    //* Button controls
    var buttonLeft = gp.buttons[2];
    var buttonRight = gp.buttons[1];
    //* D-pad controls
    var DPadLeft = gp.buttons[14];
    var DPadRight = gp.buttons[15];

    // check if right face button is pressed.
    // .pressed statement checks for controller input
    if ((buttonLeft.pressed || DPadLeft.pressed) && leftTrackButton != true) {
      leftTrackButton = true;
      // trigger left lane options
      holdDownNote(LButton);
    }
    if (!((buttonLeft.pressed || DPadLeft.pressed)) && leftTrackButton != false) {
      leftTrackButton = false;
      // trigger left lane options
      resetNotePress(LButton)
    }
    // checks if left face button is pressed
    if ((buttonRight.pressed || DPadRight.pressed) && rightTrackButton != true) {
      rightTrackButton = true;
      // trigger right lane options
      holdDownNote(RButton);
    }
    if (!((buttonRight.pressed || DPadRight.pressed)) && rightTrackButton != false) {
      rightTrackButton = false;
      // trigger right lane options
      resetNotePress(RButton);
    }

    //* detect button input for song lanes
    function holdDownNote(button) {
      // keyIndex will execute getKeyIndex function for its value
      var keyIndex = getKeyIndex(button);
      // only execute if the user is holding down a key from the getKeyIndex and its value is not equal to -1
      // Doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
      if (Object.keys(isHolding).indexOf(button) !== -1 && !isHolding[button]) {
        // sets the specified key from the isHolding variable's array to true
        isHolding[button] = true;
        // Grabs the element with a class of "keypress" and the specified index to style it with a display of block
        // EX: User presses "f" key => grab the 2nd element with a class of "keypress"
        keypress[keyIndex].style.display = 'block';
        // execute if the variable isPlaying is true and if the firstchild of the track element is present
        if (isPlaying && tracks[keyIndex].firstChild) {
          // execute judge function with keyIndex variable
          judge(keyIndex);
          console.log("worked");
        }
      }
    }
    //* detect button release for song lanes
    function resetNotePress(button) {
      // object returns -1 if event.key is not part of isHolding variable 
      if (Object.keys(isHolding).indexOf(button) !== -1) {
        var keyIndex = getKeyIndex(button);
        isHolding[button] = false;
        keypress[keyIndex].style.display = 'none';
        console.log("worked again");
      }
    }
  }
  // this lets the code know to keep running gamepadButtonPress(). this updates the state of the controller
  startRequest = requestAnimationFrame(gamepadButtonPress);
}
var testaudio = new Audio("audio/test.mp3");
function lowtestaudio() {
  audio = testaudio;
  audio.load();
  audio.play();
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      var r = barHeight + (25 * (i/bufferLength));
      var g = 250 * (i/bufferLength);
      var b = 50;

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  audio.play();
  renderFrame();
}