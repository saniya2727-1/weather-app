const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResults");

// weather api key
const API_KEY = "067fcf9d41ada44697ff47a6a20c0fa2";

// listen to "submit" button, async is a callback function
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // trim off white space at beginning or end of value
    const city = cityInput.value.trim();

    // if there is no city is typed
    if(!city){
        weatherResult.innerHTML = '<p>Please enter a city name.</p>'
        return;
    }

    try {
        // await is used with async, waits for a response from API before running rest of Javascript
        const response = await fetch(

            //units in farenheith = imperial, for celicus = metric 
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
        ); 
//checks if response is successful. if not, is will throw an error
        if(!response.ok){
            throw Error("City Not Found")
        }
// converts response to useable object and stores it within data
        const data = await response.json();

        weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class = "results">
                <div class = "weatherResult">
                    <i class="fa-solid fa-temperature-three-quarters"></i>
                    <p>Temperature: ${data.main.temp}F</p>
            </div>
            <div class = "weatherResult">
                <i class="fa-solid fa-temperature-half"></i> 
                <p>Weather: ${data.weather[0].description}</p>
            </div>
            <!--Display humidity -->
            <div class = "weatherResult">
                <i class="fa-solid fa-droplet"></i>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
            <!--Display wind speed -->
            <div class = "weatherResult">
                <i class="fa-solid fa-wind"></i>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>    
        </div>
        `
    } catch(error){
        weatherResult.innerHTML= `<p>Error: ${error.message}</p>`

    }



})