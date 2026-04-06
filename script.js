let btn = document.getElementById("search");
let result = document.getElementById("result");

btn.onclick = async function () {
  let city = document.getElementById("city").value;

  if (city === "") {
    result.innerHTML = "⚠️ Enter city name";
    return;
  }

  let apiKey = "70df1bb17cb723058138960635dabef2"; // 👈 apni key daal

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  result.innerHTML = "⏳ Loading...";

  try {
    let res = await fetch(url);
    let data = await res.json();

    if (data.cod != 200) {
      result.innerHTML = "❌ City not found";
      return;
    }

    // 🌤️ icon
    let icon = data.weather[0].icon;

    result.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <p>🌡️ ${data.main.temp} °C</p>
      <p>${data.weather[0].main}</p>
    `;

    // 🌈 FLOATING COLOR CHANGE (MAIN PART 🔥)
    let weather = data.weather[0].main.toLowerCase();

    if (weather === "clear") {
      setColor("#fceabb", "#f8b500");
    } 
    else if (weather === "clouds") {
      setColor("#bdc3c7", "#2c3e50");
    } 
    else if (weather === "rain") {
      setColor("#4b79a1", "#283e51");
    } 
    else if (weather === "snow") {
      setColor("#e6dada", "#274046");
    } 
    else if (weather === "thunderstorm") {
      setColor("#232526", "#414345");
    } 
    else {
      setColor("#8e2de2", "#4a00e0");
    }

  } catch (error) {
    result.innerHTML = "❌ Error aaya";
    console.log(error);
  }
};

// 🎨 function to change colors (IMPORTANT)
function setColor(c1, c2) {
  document.body.style.setProperty("--c1", c1);
  document.body.style.setProperty("--c2", c2);
}

// Enter press
document.getElementById("city").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    btn.click();
  }
});