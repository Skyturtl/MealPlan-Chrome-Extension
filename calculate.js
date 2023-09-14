function countWeekendDays( d0, d1 )
{
    var ndays = 1 + Math.round((d1.getTime()-d0.getTime())/(24*3600*1000));
    var nsundays = Math.floor((ndays + (d0.getDay() + 6) % 7) / 7);
    return 2*nsundays + (d1.getDay()==6) - (d0.getDay()==0);
}

var today = new Date();
document.getElementById('first').valueAsDate = new Date("Sun Aug 20 2023 00:00:00 GMT-0500 (Central Daylight Time)");
document.getElementById('last').valueAsDate = new Date("Fri Dec 15 2023 00:00:00 GMT-0500 (Central Daylight Time)");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", unhide);
  });

function unhide() {
    var hid = document.getElementsByClassName("exp");
    if(hid[0].offsetWidth > 0 && hid[0].offsetHeight > 0) {
        hid[0].style.visibility = "visible";
    }
    var total = 0;
    var x = document.getElementById("wknd").checked;
    var y = document.getElementById("break").checked;
    var z = document.getElementById("thanks").checked;
    var last_day = document.getElementById('last').valueAsDate;
    var first_day = document.getElementById('first').valueAsDate;
    var diff = Math.floor((Date.parse(last_day) - Date.parse(today)) / 86400000)+2;
    var diff2 = Math.floor((Date.parse(last_day) - Date.parse(first_day)) / 86400000);
    var weekendLong = countWeekendDays(first_day, last_day);
    var weekendShort = countWeekendDays(today, last_day);
    if(document.getElementById("plan").value == "Plat"){
        total = 2960;
    }
    if(document.getElementById("plan").value == "Gold"){
        total = 2650;
    }
    if(document.getElementById("plan").value == "Silver"){
        total = 2167;
    }
    if(document.getElementById("plan").value == "Bronze"){
        total = 1674;
    }
    if(document.getElementById("plan").value == "Apartment"){
        total = 767;
    }
    if(document.getElementById("plan").value == "Off-Campus"){
        total = 453;
    }
    if(y){
        if(x){
            diff+=2;
        }
        diff-=4;
    }
    if(z){
        if(x){
            diff+=2;
        }
        diff-=5;
    }
    if(x){
        total = total*(diff-weekendShort)/(diff2);
    }
    else{
        total = total*(diff/diff2);
    }
    document.getElementById('points').innerHTML = "Points: " + Math.round(100*total)/100;
}

