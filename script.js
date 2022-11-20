console.clear();
localStorage.removeItem("hours");
localStorage.removeItem("minutes");
localStorage.removeItem("seconds");
var api_url = "http://worldtimeapi.org/api/timezone/";
const api_url2 = "http://worldtimeapi.org/api/timezone";
var audio = document.getElementById("sound");

async function getTimezone(){
    let response = await fetch(api_url);

    let data = await response.json();

    if (api_url != "http://worldtimeapi.org/api/timezone/"){
    let day_of_week = data.day_of_week;
    let seconds = data.datetime.charAt(17);
    let seconds2 = data.datetime.charAt(18);
    let minute = data.datetime.charAt(14);
    let minute2 = data.datetime.charAt(15);
    let hour = data.datetime.charAt(11);
    let hour2 = data.datetime.charAt(12);
    document.getElementById("time").innerHTML = hour.toString() + hour2.toString() + ":" + minute.toString() + minute2.toString() + ":";
    document.getElementById("seconds").innerHTML = seconds.toString() + seconds2.toString();
 
    let day = data.datetime.charAt(8);
    let day2 = data.datetime.charAt(9);
    let month = data.datetime.charAt(5);
    let month2 = data.datetime.charAt(6);
    let year = data.datetime.charAt(0);
    let year1 = data.datetime.charAt(1);
    let year2 = data.datetime.charAt(2);
    let year3 = data.datetime.charAt(3);
    let actualMonth;

    if (month.toString() + month2.toString() == 01){
       actualMonth = "January";
    }else if (month.toString() + month2.toString() == 02){
        actualMonth = "February";
    }else if (month.toString() + month2.toString() == 03){
        actualMonth = "March";
    }else if (month.toString() + month2.toString() == 04){
        actualMonth = "April";
    }else if (month.toString() + month2.toString() == 05){
        actualMonth = "May";
    }else if (month.toString() + month2.toString() == 06){
        actualMonth = "June";
    }else if (month.toString() + month2.toString() == 07){
        actualMonth = "July";
    }else if (month.toString() + month2.toString() == 08){
        actualMonth = "August";
    }else if (month.toString() + month2.toString() == 09){
        actualMonth = "September";
    }else if (month.toString() + month2.toString() == 10){
        actualMonth = "October";
    }else if (month.toString() + month2.toString() == 11){
        actualMonth = "November";
    }else if (month.toString() + month2.toString() == 12){
        actualMonth = "December";
    }
    if(day_of_week == 0){
        document.getElementById("dayofweek").innerHTML = "Sunday, ";
    }else if(day_of_week == 1){
        document.getElementById("dayofweek").innerHTML = "Monday, ";
    }else if(day_of_week == 2){
        document.getElementById("dayofweek").innerHTML = "Tuesday, ";
    }else if(day_of_week == 3){
        document.getElementById("dayofweek").innerHTML = "Wednesday, ";
    }else if(day_of_week == 4){
        document.getElementById("dayofweek").innerHTML = "Thursday, ";
    }else if(day_of_week == 5){
        document.getElementById("dayofweek").innerHTML = "Friday, ";
    }else if(day_of_week == 6){
        document.getElementById("dayofweek").innerHTML = "Saturday, ";
    }

    document.getElementById("date").innerHTML = day.toString() + day2.toString() + "<sup id='th'></sup>"; 
    document.getElementById("dty").innerHTML = " " + actualMonth + ", " + year.toString() + year1.toString() + year2.toString() + year3.toString();
    if (day2.toString() == 1){
       document.getElementById("th").innerHTML = "st";
    }else if (day2.toString() == 2){
        document.getElementById("th").innerHTML = "nd";
    }else if (day2.toString() == 3){
        document.getElementById("th").innerHTML = "rd";
    }else if(day.toString() + day2.toString() == 11 || day.toString() + day2.toString() == 12 || day.toString() + day2.toString() == 13){
        document.getElementById("th").innerHTML = "th";
    }
    else{
        document.getElementById("th").innerHTML = "th";
    }
 }
}

var data1;
let i;

async function getAllPossible(){
    const response1 = await fetch(api_url2);

    data1 = await response1.json();

    for (i = 0; i < data1.length; i++){
        document.getElementById("timezone").innerHTML += "<option></option>"
        document.getElementById("timezone").lastChild.innerHTML = data1[i];
    }
}
getAllPossible();

document.getElementById("timezone").addEventListener("change", () => {
    var e = document.getElementById("timezone");
    var text = e.options[e.selectedIndex].text;
    if (text == "Select Option"){
        document.getElementById("time").innerHTML = "";
        document.getElementById("seconds").innerHTML = "";
        document.getElementById("date").innerHTML = ""; 
        document.getElementById("dty").innerHTML = "";
        document.getElementById("dayofweek").innerHTML = "";
        api_url = "http://worldtimeapi.org/api/timezone/";
    }else{
        api_url = "http://worldtimeapi.org/api/timezone/" + text;
        getTimezone();
        setInterval(() => {
            getTimezone();
        }, 1000);
    }
});



//Stopwatch code
var stopWatchMiliSeconds = 00;
var stopwatchSeconds = 00;
var stopWatchMin = 00;
var stopWatchHour = 00;
var appendMiliSeconds = document.getElementById("stopWatchMiliSeconds");
var appendSeconds = document.getElementById("stopWatchSeconds");
var appendMinutes = document.getElementById("stopWatchMin");
var appendHours = document.getElementById("stopWatchHours");
let interval;

function startTimer(){
   stopWatchMiliSeconds++;

   if (stopWatchMiliSeconds<9){
      appendMiliSeconds.innerHTML = "0" + stopWatchMiliSeconds;
   }
   if (stopWatchMiliSeconds>9){
    appendMiliSeconds.innerHTML = stopWatchMiliSeconds;
   }
   if (stopWatchMiliSeconds>99){
    stopwatchSeconds++;
    appendSeconds.innerHTML = "0" + stopwatchSeconds + ".";
    stopWatchMiliSeconds = 0;
    appendMiliSeconds.innerHTML = "0" + stopWatchMiliSeconds;
   }
   if (stopwatchSeconds<9){
      appendSeconds.innerHTML = "0" + stopwatchSeconds + ".";
   }
   if (stopwatchSeconds>9){
    appendSeconds.innerHTML = stopwatchSeconds + ".";
  }
  if (stopwatchSeconds>59){
    stopWatchMin++;
    appendMinutes.innerHTML = "0" + stopWatchMin + ":";
    stopwatchSeconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }if(stopWatchMin > 9){
    appendMinutes.innerHTML = stopWatchMin + ":";
  }if(stopWatchMin > 59){
    stopWatchHour++;
    appendHours.innerHTML = "0" + stopWatchHour + ":";
    stopWatchMin = 0;
    appendMinutes.innerHTML = "0" + 0 + ":";
  }
}

var playPause = "pause";

document.getElementById("start").onclick = function (){
    if (playPause == "pause"){
    interval = setInterval(startTimer, 10);
    playPause = "play";
    document.getElementById("start").style.backgroundColor = "#FF1E1E";
    document.getElementById("i").className = "fa-solid fa-pause";
    }else if(playPause == "play"){
        clearInterval(interval);
        document.getElementById("start").style.backgroundColor = "#367E18";
        document.getElementById("i").className = "fa-solid fa-play";
        playPause = "pause";
    }
}

document.getElementById("reset").onclick = function (){
    clearInterval(interval);
       if(playPause == "play"){
            document.getElementById("start").style.backgroundColor = "#367E18";
            document.getElementById("i").className = "fa-solid fa-play";
            playPause = "pause";
        }
    stopWatchMiliSeconds = 00;
    stopwatchSeconds = 00;
    stopWatchMin = 00;
    stopWatchHour = 00;
    appendMiliSeconds.innerHTML = "00";
    appendSeconds.innerHTML = "00.";
    appendMinutes.innerHTML = "00:";
    appendHours.innerHTML = "00:";
}

var myTimer;
var input1 = document.getElementById("secInp");
var input2 = document.getElementById("minInp");
var input3 = document.getElementById("hoursInp");
var playPause2 = "pause";
var c;
var INTERVAL;
function clock() {
       if (playPause2 == "pause"){
       if (input1.value != "" || input2.value != "" || input3.value != ""){
       if (localStorage.getItem("hours") == null && localStorage.getItem("minutes") == null && localStorage.getItem("seconds") == null){
        if (Number(input3.value) > 9){
            document.getElementById("timerHours").innerHTML = input3.value + ":";
          }else if(Number(input3.value) == 0){
            document.getElementById("timerHours").innerHTML = "00:";
          }
          else{
              document.getElementById("timerHours").innerHTML = "0" + input3.value + ":";
          }
          if (Number(input2.value) > 9){
            document.getElementById("timerMin").innerHTML = input2.value + ":";
          }else if(Number(input2.value) == 0){
            document.getElementById("timerMin").innerHTML = "00:";       
          }
          else{
              document.getElementById("timerMin").innerHTML = "0" + input2.value + ":";
          }
          if (Number(input1.value) > 9){
              document.getElementById("timerSeconds").innerHTML = input1.value;
          }else if(Number(input1.value) == 0){
              document.getElementById("timerSeconds").innerHTML = "00";
          }
          else{
              document.getElementById("timerSeconds").innerHTML = "0" + input1.value;
          }
        myTimer = setInterval(myClock, 1000);
        c = Number(input1.value) + Number(input2.value * 60) + Number(input3.value * 3600);
    }else{
                myTimer = setInterval(myClock, 1000);
                c = Number(localStorage.getItem("seconds")) + Number(localStorage.getItem("minutes")) + Number(localStorage.getItem("hours") * 3600);
        }
    
        playPause2 = "play";
        document.getElementById("start2").style.backgroundColor = "#FF1E1E";
        document.getElementById("i2").className = "fa-solid fa-pause";
    }else{
        alert("Please enter values!");
    }
}else if(playPause2 == "play"){
    clearInterval(myTimer);
    document.getElementById("start2").style.backgroundColor = "#367E18";
    document.getElementById("i2").className = "fa-solid fa-play";
    playPause2 = "pause";
  }
    
        function myClock() {
            --c
            var seconds = Math.floor(c % 60); // Seconds that cannot be written in minutes
            var secondsInMinutes = Math.floor((c - seconds) / 60); // Gives the seconds that COULD be given in minutes
            var minutes = Math.floor(secondsInMinutes % 60); // Minutes that cannot be written in hours
            var hours = Math.floor((secondsInMinutes - minutes) / 60);
            localStorage.setItem("hours", hours);
            localStorage.setItem("minutes", minutes);
            localStorage.setItem("seconds", seconds);
            // Now in hours, minutes and seconds, you have the time you need.
            if (hours > 9){
              document.getElementById("timerHours").innerHTML = hours + ":";
            }else{
                document.getElementById("timerHours").innerHTML = "0" + hours + ":";
            }
            if (minutes > 9){
            document.getElementById("timerMin").innerHTML = minutes + ":";
            }else{
                document.getElementById("timerMin").innerHTML = "0" + minutes + ":";
            }
            if (seconds > 9){
            document.getElementById("timerSeconds").innerHTML = seconds;
            }else{
                document.getElementById("timerSeconds").innerHTML = "0" + seconds;
            }
            if (c == 0 || c < 0) {
                reset2();
                INTERVAL = setInterval(audioPlay, 1000);
            }
        }
        input1.value = "";
        input2.value = "";
        input3.value = "";
      }

function reset2(){
    clearInterval(myTimer);
       if(playPause2 == "play"){
            document.getElementById("start2").style.backgroundColor = "#367E18";
            document.getElementById("i2").className = "fa-solid fa-play";
            playPause2 = "pause";
        }
    c = 0;
    localStorage.removeItem("seconds");
    localStorage.removeItem("minutes");
    localStorage.removeItem("hours");
    document.getElementById("timerSeconds").innerHTML = "00";
    document.getElementById("timerMin").innerHTML = "00:";
    document.getElementById("timerHours").innerHTML = "00:";
}

let inc = 0;

function audioPlay(){
    document.getElementById("timeover").style.visibility = "visible";
    audio.play();
    inc++;
    if (inc == 5){
        clearInterval(INTERVAL);
        inc = 0;
        document.getElementById("timeover").style.visibility = "hidden";
    }
}
