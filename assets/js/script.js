// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;

var cityFormE1=document.querySelector("#search-button");
var cityInputE1=document.querySelector("#city");
var clearE1=document.querySelector("#clear-history");
var cityName=document.querySelector("#city-name");
var cities=[];
var apiKey="8382807303ccd8efb6fc8344617069a3";
var error= false;

 

//console.log(cityFormE1)
var formSubmitHandler = function(event){
    event.preventDefault();
  //  console.log("Heeeello")
    var city = cityInputE1.value.trim();
    if (city) {
     //   console.log(city);
        currentWeather(city);
        cities.push(city);    
        localStorage.setItem("cities", JSON.stringify(cities));
        var storedCities = JSON.parse(localStorage.getItem("cities"));
       // console.log(storedCities);
      //  console.log(cities);
      if (document.querySelector("#historyItem")) {
          var node=document.querySelector("#historyItem");
          document.querySelector("#history").removeChild(node);
      }
      var ul= document.createElement("ul");
      ul.setAttribute("id" , "historyItem");
        for (let i=0; i < cities.length; i++){
            var li = document.createElement("li");
            li.innerHTML=storedCities[i];
            ul.append(li);
        }
       // console.log(storedCities);
        document.querySelector("#history").append(ul);
        
        
    } else {
        //    alert("Please enter a city");
    }
   // saveSearch();
}

var clearHistory = function()  {
    localStorage.clear();
    cities=[];
    if (document.querySelector("#historyItem")) {
        var node=document.querySelector("#historyItem");
        document.querySelector("#history").removeChild(node);
    }

}


function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(queryURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                    if (data.length===0){
                        alert('That is not a real place');
                    }
                     console.log(data);
                currentCityWeather(data[0].lat, data[0].lon)
                document.querySelector("#city-name").innerHTML=city;
            });
        } else {
            alert("Error: " + response.statusText);
        }
    }
    )};//
function currentCityWeather(lat,lon){
    var query2URL="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat +"&lon="+ lon + "&units=imperial&appid=" +apiKey;
    fetch(query2URL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //d = data;
                forecast(data);
                    console.log(data);
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
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
    document.querySelector("#displayWeather").innerHTML='';

    for (i=0; i<5; i++) {
        document.querySelector("#displayWeather").innerHTML+=//${data.daily[i]}
      ` <div class="col-md-2 bg-primary ml-2 mb-3 text-white rounded">
            <p>${Intl.DateTimeFormat('en-us', {day:'2-digit', month:'long', year: 'numeric'}).format(data.daily[i].dt*1000)}</p>
            <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"/> 
            <p>Temp: ${data.daily[i].temp.day} ??F</p>
            <p>Wind: ${data.daily[i].wind_speed}</p>
            <p>Humidity: ${data.daily[i].humidity}</p>
        </div>  `
    }
}


cityFormE1.addEventListener("click", formSubmitHandler);
clearE1.addEventListener("click", clearHistory);