var api_url = "http://worldtimeapi.org/api/timezone/";
const api_url2 = "http://worldtimeapi.org/api/timezone";

async function getTimezone(){
    let response = await fetch(api_url);

    let data = await response.json();

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
    document.getElementById("date").innerHTML = day.toString() + day2.toString() + "<sup id='th'></sup>"; 
    document.getElementById("dty").innerHTML = " " + actualMonth + ", " + year.toString() + year1.toString() + year2.toString() + year3.toString();
    if (day.toString() + day2.toString() == 01){
       document.getElementById("th").innerHTML = "st";
    }else if (day.toString() + day2.toString() == 02){
        document.getElementById("th").innerHTML = "nd";
    }else if (day.toString() + day2.toString() == 03){
        document.getElementById("th").innerHTML = "rd";
    }else{
        document.getElementById("th").innerHTML = "th";
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
    api_url += text;
    getTimezone();
    setInterval(myFunction, 1000);
});

function myFunction(){
    getTimezone();
}