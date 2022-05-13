// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;

var cityName="";
var cities=[];
var cityFormE1=document.querySelector("#city-search-form");
var cityInputE1=document.querySelector("#city");

var formSubmitHandler = function(event){
    var city = cityInputE1.value.trim();
    if (city) {
        console.log(city);
    } else {
        alert("Please enter a city");
    }
    saveSearch();
}


var apiKey="8382807303ccd8efb6fc8344617069a3";

function currentWeather(city){
    var queryURL= "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
    then(function(response){
        console.log(response)
    }
)};

currentWeather();

//Then in the link to fetch the api
//var apiLink = "linktofetch" + apiKey
//fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=8382807303ccd8efb6fc8344617069a3")
//.then(function(response) {
//response.json().then(function(data) {
//  console.log(data);
//});
//});

//var response = fetch("");
//console.log(response);

cityFormE1.addEventListener("submit", formSubmitHandler);