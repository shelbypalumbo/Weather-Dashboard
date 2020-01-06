$(document).ready(function () {

  var currentDate = moment().format("dddd, MMMM Do YYYY");
  //----Current Weather Conditions-----------------------------------------------------------
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var place = $("#searchInput").val().trim();
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" +
      place + "&APPID=6a120126c9f8309dcaf580415f4194b1";

    var pastPlace = $("<li class='.nav-item'>").append(place);
    $(".nav").append(pastPlace);

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
      console.log(response);
    });


//-------Five Day Forecast-------------------------------------------------------------------
    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      place + "&APPID=6a120126c9f8309dcaf580415f4194b1";

    $.ajax({
      url: queryURLFiveDay,
      method: "GET"
    }).then(function (response) {
      console.log
      var days =[[3],[11],[19],[27],[35]];
      
      for (i=0; i < days.length; i++){
        $(".fiveDay").append("<div class='dayContainer col-2'>");
        var city = $("<li>").text("City: " + response.city.name);
        var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
        var temp = $("<li>").text("Temperature: " + tempF.toFixed(0) + " F");
        var humidity = $("<li>").text("Humidity: " + response.list[i].main.humidity + "%");
        $(".dayContainer").append(city, temp, humidity);
      }
    
    })


  })

})