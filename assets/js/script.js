// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;

var cities=[];
var cityFormE1=document.querySelector("#city-search-form");
var cityInputE1=document.querySelector("#city");
var clearE1=document.querySelector("#clear-history");
var cityName=document.querySelector("#city-name");

//console.log(cityFormE1)
var formSubmitHandler = function(event){
  //  console.log("Heeeello")
    var city = cityInputE1.value.trim();
    if (city) {
     //   console.log(city);
        currentWeather(city);
    } else {
    //    alert("Please enter a city");
    }
   // saveSearch();
}

var clearHistory = function()  {
    localStorage.clear();
}


function currentWeather(city){
    var queryURL= "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(queryURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //     console.log(data);
                currentCityWeather(data[0].lat, data[0].lon)
                document.querySelector("#city-name").innerHTML=city;
            });
        } else {
            alert("Error: " + response.statusText);
        }
    }
    )};
function currentCityWeather(lat,lon){
    var query2URL="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat +"&lon="+ lon + "&units=imperial&appid=" +apiKey;
    fetch(query2URL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                d = data;
                forecast(data);
                //    console.log(data);
            });
        } else {
            alert("Error:" +response.statusText);
        }
    })
}

function forecast(data) {
    document.querySelector("#currentTemp").innerHTML=data.current.temp;
    document.querySelector("#currentHumid").innerHTML=data.current.humidity;
    document.querySelector("#currentWind").innerHTML=data.current.wind_speed;
    document.querySelector("#currentUV").innerHTML=data.current.uvi;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);


    for (i=0; i<5; i++) {
        document.querySelector(".row").innerHTML+=//${data.daily[i]}
      ` <div class="col-md-2 bg-primary ml-2 mb-3 text-white rounded">
            <p>${nowMoment}</p>
            <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"/> 
            <p>Temp: ${data.daily[i].temp.day} °F</p>
            <p>Wind: ${data.daily[i].wind_speed}</p>
            <p>Humidity: ${data.daily[i].humidity}</p>
        </div>  `
    //
    }
}
//currentWeather(cityName);

cityFormE1.addEventListener("click", formSubmitHandler);
clearE1.addEventListener("click", clearHistory);