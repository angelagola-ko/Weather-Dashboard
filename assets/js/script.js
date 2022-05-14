// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;

var cityName="Sarasota";
var cities=[];
var cityFormE1=document.querySelector("#city-search-form");
var cityInputE1=document.querySelector("#city");
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


function currentWeather(city){
    var queryURL= "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(queryURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //     console.log(data);
                currentCityWeather(data[0].lat, data[0].lon)
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
        document.querySelector(".row").innerHTML+=
      ` <div class="col-md-2 bg-primary ml-2 mb-3 text-white rounded">
                                <p>${data.daily[i]}</p>
                                <img src=""/> 
                                <p>Temp</p>
                                <p>Wind</p>
                                <p>Humidity</p>
         
                            </div>  `
    
    }
}
//currentWeather(cityName);

cityFormE1.addEventListener("click", formSubmitHandler);