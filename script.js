const date = new Date(), month = date.getMonth(), year = date.getFullYear(), monthDay = date.getDate(), weekDay = date.getDay();
const days = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "];
document.getElementById("year").textContent = year;
document.getElementById("month").textContent = month + 1;
document.getElementById("date").textContent = days[weekDay] + monthDay;

//SOLUTION: put all of the things that rely on lat and long or the API response inside of this function. ↓
navigator.geolocation.getCurrentPosition(function(position) {
  const latitude = position.coords.latitude, longitude = position.coords.longitude;
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,precipitation_probability_max&timezone=auto&past_days=1`;
  // Get the API response
  function reqListener() {
    const json = JSON.parse(this.responseText);
    let weatherCodes = json.daily.weathercode, precipProb = json.daily.precipitation_probability_max.slice(1, 2);

    const images = {
      0: "assets/sun.png",
      1: "assets/sun-cloud.png",
      2: "assets/sun-cloud.png",
      3: "assets/cloud.png",
      45: "assets/cloud.png",
      48: "assets/cloud.png",
      51: "assets/rain-cloud.png",
      53: "assets/rain-cloud.png",
      55: "assets/rain.png",
      56: "assets/rain-cloud.png",
      57: "assets/rain.png",
      61: "assets/rain.png",
      63: "assets/rain.png",
      65: "assets/rain.png",
      66: "assets/rain.png",
      67: "assets/rain.png",
      71: "assets/snow-cloud.png",
      73: "assets/snow.png",
      75: "assets/snow.png",
      77: "assets/snow.png",
      80: "assets/rain-cloud.png",
      81: "assets/rain-cloud.png",
      82: "assets/rain.png",
      85: "assets/snow-cloud.png",
      86: "assets/snow.png",
      95: "assets/rain-cloud.png",
      96: "assets/rain-cloud.png",
      99: "assets/rain.png"
    }

    document.getElementById("precip-prob").textContent = `Precipitation Probability: ${precipProb}%`;
    document.getElementById("img-day1").src = images[weatherCodes[1]];


  }

  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", URL);
  req.send();
});





//API documentation for future reference (including all the settings I set): https://open-meteo.com/en/docs#latitude=39.9612&longitude=-82.9988&hourly=&daily=weathercode,precipitation_probability_max&timezone=auto&past_days=1