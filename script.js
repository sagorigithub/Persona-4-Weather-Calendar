const date = new Date(), month = date.getMonth(), year = date.getFullYear(), monthDay = date.getDate(), weekDay = date.getDay();
const days = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "];
document.getElementById("year").textContent = year;
document.getElementById("month").textContent = month + 1;
document.getElementById("date").textContent = days[weekDay] + monthDay;

//SOLUTION: put all of the things that rely on lat and long or the API response inside of this function. ↓
navigator.geolocation.getCurrentPosition(function(position) 
{
  const latitude = position.coords.latitude, longitude = position.coords.longitude;
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,precipitation_probability_max&timezone=auto&past_days=1`;
  // Get the API response
  function reqListener() 
  {
    const json = JSON.parse(this.responseText);
    let weatherCodes = json.daily.weathercode, precipProb = json.daily.precipitation_probability_max[1];

    const images = 
    {
      0: "sun",
      1: "sun-cloud",
      2: "sun-cloud",
      3: "cloud",
      45: "cloud",
      48: "cloud",
      51: "rain-cloud",
      53: "rain-cloud",
      55: "rain",
      56: "rain-cloud",
      57: "rain",
      61: "rain",
      63: "rain",
      65: "rain",
      66: "rain",
      67: "rain",
      71: "snow-cloud",
      73: "snow",
      75: "snow",
      77: "snow",
      80: "rain-cloud",
      81: "rain-cloud",
      82: "rain",
      85: "snow-cloud",
      86: "snow",
      95: "rain-cloud",
      96: "rain-cloud",
      99: "rain"
    };

    document.getElementById("precip-prob").textContent = `Precipitation Probability: ${precipProb}%`;
    for (let i = 0; i < 7; i++) 
    {
      document.getElementById("img-day" + i).src = `assets/${images[weatherCodes[i]]}.png`;
    }
  }

  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", URL);
  req.send();
});