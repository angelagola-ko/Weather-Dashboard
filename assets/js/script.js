// Display time
let nowMoment = moment().format("MMMM Do YYYY");
let displayDate = document.getElementById("currentDay");
displayDate.innerHTML = nowMoment;