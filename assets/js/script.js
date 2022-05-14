// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;

var cityName="";
var cities=[];
var cityFormE1=document.querySelector("#city-search-form");
var cityInputE1=document.querySelector("#city");
console.log(cityFormE1)
var formSubmitHandler = function(event){
    console.log("Heeeello")
    var city = cityInputE1.value.trim();
    if (city) {
        console.log(city);
        currentWeather(city);
    } else {
        alert("Please enter a city");
    }
   // saveSearch();
}


var apiKey="8382807303ccd8efb6fc8344617069a3";

function currentWeather(city){
    var queryURL= "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(queryURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                currentCityWeather(data[0].lat, data[0].lon)
        });
        } else {
            alert("Error: " + response.statusText);
        }
    }
    )};
function currentCityWeather(lat,lon){
    var query2URL="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat +"&lon="+ lon + "&appid=" +apiKey;
    fetch(query2URL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error:" +response.statusText);
        }
    })
}


//currentWeather(cityName);


cityFormE1.addEventListener("click", formSubmitHandler);