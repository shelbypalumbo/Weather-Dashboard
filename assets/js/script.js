$(document).ready(function () {

//--------Current Date-----------------------------------------------------------------------
  var currentDate = moment().format("dddd, MMMM Do YYYY");

//-------On click event listener-------------------------------------------------------------
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $(".mainDash").show();
    var place = $("#searchInput").val().trim();
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" +
      place + "&APPID=6a120126c9f8309dcaf580415f4194b1";

    var pastPlace = $("<li class='.nav-item'>").text(place);
    $(".nav-link").append(pastPlace);
   
//-------Current Weather Conditions for place-------------------------------------------------
    $.ajax({
      url: queryURLCurrent,
      method: "GET"
    }).then(function (response) {
      $(".city").html("<h2>" + response.name + " " + response.sys.country + "</h2>");
      var icon = $("<img>").attr("src", response.weather[0].icon);
      $(".city").append(icon);
      $(".date").html("<h3>" + currentDate + "</h3>");
      $(".wind").text("Wind Speed: " + response.wind.speed + "mph");
      $(".humidity").text("Humidity Level: " + response.main.humidity + "%");
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".tempF").text("Temperature : " + tempF.toFixed(0) + " F");
      
     
//-------UV Index Data----------------------------------------------------------------------------
var lat = response.coord.lat;
var lon = response.coord.lon;

var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + "6a120126c9f8309dcaf580415f4194b1" + "&lat=" + lat + "&lon=" + lon;
$.ajax({
  url: queryURLUV,
  method: "GET"
}).then(function (response) {
  $(".UV").text("  UV Index: " + response.value);})
});

//-------Five Day Forecast-------------------------------------------------------------------
    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      place + "&APPID=6a120126c9f8309dcaf580415f4194b1";

    $.ajax({
      url: queryURLFiveDay,
      method: "GET"
    }).then(function fiveDayForecast(response) {
      var days =[[3],[11],[19],[27],[35]];
      var fiveDay =$(".fiveDay");
      fiveDay.html("<h2>" + "Five Day Forecast: " + "</h2>");
      console.log(response);

      for (i=0; i < days.length; i++){
        var dayContainer = $("<div class='dayContainer col-2'>");
        var city = $("<li>").text("City: " + response.city.name);
        var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
        var temp = $("<li>").text("Temperature: " + tempF.toFixed(0) + " F");
        var humidity = $("<li>").text("Humidity: " + response.list[i].main.humidity + "%");
        dayContainer.append(city, temp, humidity);
        fiveDay.append(dayContainer);
      }
    })
   

  })

})