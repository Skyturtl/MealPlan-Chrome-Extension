function countWeekendDays( d0, d1 )
{
    var ndays = 1 + Math.round((d1.getTime()-d0.getTime())/(24*3600*1000));
    var nsundays = Math.floor((ndays + (d0.getDay() + 6) % 7) / 7);
    return 2*nsundays + (d1.getDay()==6) - (d0.getDay()==0);
}

var today = new Date();
document.getElementById('first').valueAsDate = new Date("Sun Aug 26 2024 00:00:00 GMT-0500 (Central Daylight Time)");
document.getElementById('last').valueAsDate = new Date("Fri Dec 6 2024 00:00:00 GMT-0500 (Central Daylight Time)");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", unhide);
  });
  chrome.storage.sync.set({ "yourBody": "myBody" }, function(){
});
function unhide() {
    var hid = document.getElementsByClassName("exp");
    hid[0].style.height = "115px";
    hid[0].style.visibility = "visible";
    hid[0].style.opacity = "1";
    var total = 0;
    var x = document.getElementById("wknd").checked;
    var y = document.getElementById("break").checked;
    var z = document.getElementById("thanks").checked;
    var last_day = document.getElementById('last').valueAsDate;
    var first_day = document.getElementById('first').valueAsDate;
    var diff = Math.floor((Date.parse(last_day) - Date.parse(today)) / 86400000)+2;
    var diff2 = Math.floor((Date.parse(last_day) - Date.parse(first_day)) / 86400000);
    var weekendShort = countWeekendDays(today, last_day);
    
    if(document.getElementById("plan").value == "Plat"){
        total = 3138;
    }
    if(document.getElementById("plan").value == "Gold"){
        total = 2809;
    }
    if(document.getElementById("plan").value == "Silver"){
        total = 2297;
    }
    if(document.getElementById("plan").value == "Bronze"){
        total = 1775;
    }
    if(document.getElementById("plan").value == "Apartment"){
        total = 813;
    }
    if(document.getElementById("plan").value == "Off-Campus"){
        total = 480;
    }
    var total2 = document.getElementById("cur").value;
    var clude = "included.";
    if(x){
        diff+=2;
        diff-=weekendShort;
        clude="excluded.";
    }
    if(y){
        diff-=4;
        if(x){
            diff+=2;
        }
    }
    if(z){
        diff-=3;
        if(x){
            diff+=2;
        }
    }
    total = total*(diff/diff2);
    document.getElementById('points').innerHTML = "Points: " + Math.round(100*total)/100 + "   <span class = \"tooltip\">ⓘ <span class = \"tooltiptext w0\"> This is what you should be at. Compare with your current points! </span> </span>";
    document.getElementById('daily').innerHTML = "Meal Points Per Day: " + Math.round(100*total/(diff))/100 + "   <span class = \"tooltip\">ⓘ <span class = \"tooltiptext w1\"> Days left at school: " + diff + ". Break days are excluded. <br> Weekends are " + clude + " </span> </span>";
    document.getElementById('cDaily').innerHTML = "Custom Meal Points Per Day: " + Math.round(100*total2/(diff))/100 + "   <span class = \"tooltip\">ⓘ <span class = \"tooltiptext w2\"> Amount that you can spend per day given your current meal points. <br> If this is lower than the above daily points per day, spend less. If higher, spend more. </span> </span>";
}

