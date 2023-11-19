const apiKey = '9e2cf0adc814e249e7716e4caf6c4dab';

const searchHandler = async (event) => {
    event.preventDefault();
    // get city they want to search for
    const searchCity = document.querySelector('#search-input').value.trim();

    localstorageHandler(searchCity);
    
    // fetch
    fetchWeather(searchCity);
};

// data fetcher
const fetchWeather = async (city) => {
    // get latitude and longitude
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then((response) => {
        return response.json();
    })
    .then(async (data) => {
        console.log(data);
        // lat and lon
        let lat = data[0].lat;
        let lon = data[0].lon;

        // fetch 5 day weather
        await fetch(`https:api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then(async (data) =>{
            displayWeather(data);
        });
    })

}

const displayWeather = (weatherData) => {
    console.log(weatherData);

    // current weather
    const twCity = document.querySelector('#tw').children[0].children[0];
    const twIcon = document.querySelector('#tw').children[0].children[1];
    const twTemp = document.querySelector('#tw').children[1].children[0];
    const twWind = document.querySelector('#tw').children[2].children[0];
    const twHumidity = document.querySelector('#tw').children[3].children[0];

    const currentWeather = weatherData.list[0];
    console.log(currentWeather);
    
    twCity.textContent = weatherData.city.name;
    twIcon.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
    twTemp.textContent = currentWeather.main.temp;
    twWind.textContent = currentWeather.wind.speed;
    twHumidity.textContent = currentWeather.main.humidity;

    // forecast 1
    const f1Date = document.querySelector('#f1').children[0].children[0];
    const f1Icon = document.querySelector('#f1').children[0].children[1];
    const f1Temp = document.querySelector('#f1').children[1].children[0];
    const f1Wind = document.querySelector('#f1').children[2].children[0];
    const f1Humidity = document.querySelector('#f1').children[3].children[0];

    const f1Weather = weatherData.list[8];
    console.log(f1Weather);

    f1Date.textContent = f1Weather.dt_txt.split(" ")[0];

}


// local storage
const localstorageHandler = (data) => {
    // get localStorage
    let currentData = localStorage.getItem('weatherDashboard');
    let recentSearch = currentData ? JSON.parse(currentData) : [];

    // if their localStorage array has more than 6 items
    if(recentSearch.length > 6) {
        recentSearch.shift();
        recentSearch.push(data);
    } else {
        recentSearch.push(data);
    }

    console.log(recentSearch);
    
    // set localStorage
    localStorage.setItem('weatherDashboard', JSON.stringify(recentSearch));
}


document.querySelector('#search-form').addEventListener('submit', searchHandler);