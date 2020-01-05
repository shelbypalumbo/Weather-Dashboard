$(document).ready(function() {

    var currentDate = moment().format("dddd, MMMM Do YYYY");

  $("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var place = $("#searchInput").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      place + "&APPID=6a120126c9f8309dcaf580415f4194b1";
    
      var pastPlace = $("<li class='.nav-item'>").append(place);
      $(".nav").append(pastPlace);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $(".city").html("<h2>" + response.name + " " + response.sys.country + "</h2>");
        $(".date").html("<h3>" + currentDate + "</h3>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity Level: " + response.main.humidity);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature : " + tempF.toFixed(0) + " F"); 

        

console.log(place);

    })})})








