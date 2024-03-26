var data;
var arrayTimestamps = [];
var oldArrayTimestamps;
const output = document.getElementById('output');
const output2 = document.getElementById("output2");
document.getElementById('file').onchange = function() {
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent) {
    // Entire file
    const text = this.result;
    // converts CSV File timestamps to array
    var columnRange = function(value, state) {
      var start = 2;
      var end = 2;
      if(state.colNum >= start && state.colNum <= end) {
        return value;
      }
      return false;
    }
    data = $.csv.toArrays(text, { onParseValue: columnRange });
    // converts time to acceptable timestamps
    for (let i = 1; i < data.length; i++) {
      var tempString = data[i][0];
      var newString = Number(tempString.replace(":", ""));
      arrayTimestamps.push(newString);
    }
    oldArrayTimestamps = arrayTimestamps;
    // format timestamps into accepable values (timestamps will be invalid if they are negative.)
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
    // output the values on the page inside their specified section
    for(let i = 0; i < arrayTimestamps.length; i++) {
      var newValue = Math.round(((arrayTimestamps[i] - 2.8) * 100)) / 100;
      console.log(newValue);
      output.innerText = output.innerText + ("{duration: 3, delay: " + oldArrayTimestamps[i] + "}") + ",\n";
      output2.innerText = output2.innerText + ("{duration: 3, delay: " + newValue + "}") + ",\n";
    }
    console.log(arrayTimestamps);
  };
  reader.readAsText(file);
};

function changeTextHeight() {
  output.style.lineHeight = "normal";
  output2.style.lineHeight = "normal";
}
function changeTextHeight2x() {
  output.style.lineHeight = "2";
  output2.style.lineHeight = "2";
}

//* example of using jquery to locate a specified CSV File and create timestamps for it
// documentation: https://api.jquery.com/jQuery.ajax/#jQuery-ajax-url-settings
const DRIVETimestamp = "songsheets/DRIVE.csv"
$("#testButton").click(function(e) {
  e.preventDefault();
  $.ajax({
    url: DRIVETimestamp,
    async: true,
    success: function (csvd) {
      // get CSV file data from timestamp column
      var columnRange = function(value, state) {
        var start = 2;
        var end = 2;
        if(state.colNum >= start && state.colNum <= end) {
          return value;
        }
        return false;
      }
      data = $.csv.toArrays(csvd, { onParseValue: columnRange });
    },
    dataType: "text",
    complete: function () {
        // call this function on complete
        console.log(data);

        // converts time to acceptable timestamps
        for (let i = 1; i < data.length; i++) {
          var tempString = data[i][0];
          var newString = Number(tempString.replace(":", ""));
          arrayTimestamps.push(newString);
        }
        oldArrayTimestamps = arrayTimestamps;
        // format timestamps into accepable values (timestamps will be invalid if they are negative.)
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

        for(let i = 0; i < arrayTimestamps.length; i++) {
          var newValue = Math.round(((arrayTimestamps[i] - 2.8) * 100)) / 100;
          console.log(newValue);
          output.innerText = output.innerText + ("{duration: 3, delay: " + oldArrayTimestamps[i] + "}") + ",\n";
          output2.innerText = output2.innerText + ("{duration: 3, delay: " + newValue + "}") + ",\n";
        }
        }
  });
})