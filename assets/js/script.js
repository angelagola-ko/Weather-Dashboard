// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;

  fetch("//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}")
  .then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});


  var response = fetch("");
console.log(response);

//api key: 8382807303ccd8efb6fc8344617069a3
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
