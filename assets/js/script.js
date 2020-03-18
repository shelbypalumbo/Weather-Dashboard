$(document).ready(function () {
//--------Current Date-----------------------------------------------------------------------
  var currentDate = moment().format("dddd, MMMM Do YYYY");

//------Getting localStorage-----------------------------------------------------------------
  var pastPlacesString = localStorage.getItem("past-places");
  var pastPlacesArray = [];
 
  if (pastPlacesString != null) {
    pastPlacesArray = pastPlacesString.split(",");
  }
  for (i = 0; i < pastPlacesArray.length; i++) {
    var pastPlace = $("<li class='.nav-item'>").text(pastPlacesArray[i]);
    $(".nav-link").prepend(pastPlace);
  }


//-------On click event for Search button------------------------------------------------------
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $(".mainDash").show();
    var place = $("#searchInput").val().trim();
    searchFunction(place);
  

//--------Setting place input to localStorage--------------------------------------------------  
    pastPlacesArray.push(place);
    localStorage.setItem("past-places", pastPlacesArray);
    
  })

  //------On click event for list items---------------------------------------------------------
  $("li.nav-item").on("click", function (event) {
    event.preventDefault();
    $(".mainDash").show();
    var place = $(event.target).text();
    searchFunction(place);
  })


  //-------Current Weather Conditions for place-------------------------------------------------
  function searchFunction(placeVar) {
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" +
      placeVar + "&APPID=6a120126c9f8309dcaf580415f4194b1";

    $.ajax({
      url: queryURLCurrent,
      method: "GET"
    }).then(function (response) {
      $(".city").html("<h2>" + response.name + " " + response.sys.country + "</h2>");
      var icon = response.weather[0].icon;
      var imgSrc = "https://openweathermap.org/img/wn/" + icon + ".png";
      var iconImg = $("<img>").attr("src", imgSrc);
      iconImg.attr("alt", response.weather[0].main);
      $(".icon").html(iconImg);
      $(".date").html("<h3>" + currentDate + "</h3>");
      $(".wind").text("Wind Speed: " + response.wind.speed + "mph");
      $(".humidity").text("Humidity Level: " + response.main.humidity + "%");
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".tempF").text("Temperature : " + tempF.toFixed(0) + " F");

    

//-------UV Index Data----------------------------------------------------------------------------
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + "6a120126c9f8309dcaf580415f4194b1" + "&lat=" + lat + "&lon=" + lon;
      $.ajax({
        url: queryURLUV,
        method: "GET"
      }).then(function (response) {
        $(".UV").text("  UV Index: " + response.value);
      })
    });

//-------Five Day Forecast-------------------------------------------------------------------
    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      placeVar + "&APPID=6a120126c9f8309dcaf580415f4194b1";

    $.ajax({
      url: queryURLFiveDay,
      method: "GET"
    }).then(function fiveDayForecast(response) {
    
      var days = [3, 11, 19, 27, 35];
      var fiveDay = $(".fiveDay");
      fiveDay.empty();

      for (i = 0; i < days.length; i++) {
        var dayContainer = $("<div class='dayContainer'>");
        var dateF = response.list[days[i]].dt_txt;
        var iconFD = response.list[days[i]].weather[0].icon;
        var imgSrcFD = "https://openweathermap.org/img/wn/" + iconFD + ".png";
        var iconImgFD = $("<img>").attr("src", imgSrcFD);
        iconImgFD.attr("alt", response.list[days[i]].weather[0].main);
        var tempF = (response.list[days[i]].main.temp - 273.15) * 1.80 + 32;
        var temp = $("<p>").text("Temperature: " + tempF.toFixed(0) + " F");
        var humidity = $("<p>").text("Humidity: " + response.list[days[i]].main.humidity + "%");
        dayContainer.append(moment(dateF).format("ddd MMM D"), iconImgFD, temp, humidity);
        fiveDay.append(dayContainer);

      }
    })
  }


//------------Clear Past Searches------------------------------------------------------------------------
$("#clearSearch").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  pastPlacesArray = 0;
  location.reload()
})
})