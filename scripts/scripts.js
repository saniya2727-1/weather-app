// gets form element from HTML using ID
const form = document.getElementById("weatherForm");
// gets input box element where user types city name
const cityInput = document.getElementById("cityInput");
// gets the element where the weather results will be displayed
const weatherResult = document.getElementById("weatherResults");

// my personal weather api key
const API_KEY = "067fcf9d41ada44697ff47a6a20c0fa2";

// add an event listener to the form which allows to run the functions when the form is submitted
// listen to "submit" event
// async is a callback function which allows to use 'await' to wait for API response
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
        // fetch used for calling OpenWeatherMap API with the user's city
        // await is used with async, waits for a response from API before running rest of Javascript
        const response = await fetch(

            //units in Fahrenheit = imperial, for celicus = metric 
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
        ); 
//checks if response is successful. if not, it will throw an error
        if(!response.ok){
            throw Error("City Not Found")
        }
// converts response to useable object (JSON format) and stores it within data variable
        const data = await response.json();

// show the information in the weatherResult div
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
        // if there is an error
        weatherResult.innerHTML= `<p>Error: ${error.message}</p>`

    }



})