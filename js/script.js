const apiKey = '9e2cf0adc814e249e7716e4caf6c4dab';

const searchHandler = async (event) => {
    event.preventDefault();
    // get city they want to search for
    const searchCity = document.querySelector('#search-input').value.trim();

    localstorageHandler(searchCity);
    
    // fetch
    fetchWeather(searchCity);
    displayLocalStorage();
};

// data fetcher and display weather
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
            // display weather function
            displayWeather(data);
        });
    })

}

// display weather
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

    const f1Weather = weatherData.list[7];
    console.log(f1Weather);

    f1Date.textContent = f1Weather.dt_txt.split(" ")[0];
    f1Icon.src = `https://openweathermap.org/img/wn/${f1Weather.weather[0].icon}@2x.png`
    f1Temp.textContent = f1Weather.main.temp;
    f1Wind.textContent = f1Weather.wind.speed;
    f1Humidity.textContent = f1Weather.main.humidity;


    // forecast 2
    const f2Date = document.querySelector('#f2').children[0].children[0];
    const f2Icon = document.querySelector('#f2').children[0].children[1];
    const f2Temp = document.querySelector('#f2').children[1].children[0];
    const f2Wind = document.querySelector('#f2').children[2].children[0];
    const f2Humidity = document.querySelector('#f2').children[3].children[0];

    const f2Weather = weatherData.list[15];
    console.log(f2Weather);

    f2Date.textContent = f2Weather.dt_txt.split(" ")[0];
    f2Icon.src = `https://openweathermap.org/img/wn/${f2Weather.weather[0].icon}@2x.png`
    f2Temp.textContent = f2Weather.main.temp;
    f2Wind.textContent = f2Weather.wind.speed;
    f2Humidity.textContent = f2Weather.main.humidity;


    // forecast 3
    const f3Date = document.querySelector('#f3').children[0].children[0];
    const f3Icon = document.querySelector('#f3').children[0].children[1];
    const f3Temp = document.querySelector('#f3').children[1].children[0];
    const f3Wind = document.querySelector('#f3').children[2].children[0];
    const f3Humidity = document.querySelector('#f3').children[3].children[0];

    const f3Weather = weatherData.list[23];
    console.log(f3Weather);

    f3Date.textContent = f3Weather.dt_txt.split(" ")[0];
    f3Icon.src = `https://openweathermap.org/img/wn/${f3Weather.weather[0].icon}@2x.png`
    f3Temp.textContent = f3Weather.main.temp;
    f3Wind.textContent = f3Weather.wind.speed;
    f3Humidity.textContent = f3Weather.main.humidity;


    // forecast 4
    const f4Date = document.querySelector('#f4').children[0].children[0];
    const f4Icon = document.querySelector('#f4').children[0].children[1];
    const f4Temp = document.querySelector('#f4').children[1].children[0];
    const f4Wind = document.querySelector('#f4').children[2].children[0];
    const f4Humidity = document.querySelector('#f4').children[3].children[0];

    const f4Weather = weatherData.list[31];
    console.log(f4Weather);

    f4Date.textContent = f4Weather.dt_txt.split(" ")[0];
    f4Icon.src = `https://openweathermap.org/img/wn/${f4Weather.weather[0].icon}@2x.png`
    f4Temp.textContent = f4Weather.main.temp;
    f4Wind.textContent = f4Weather.wind.speed;
    f4Humidity.textContent = f4Weather.main.humidity;

    
    // forecast 5
    const f5Date = document.querySelector('#f5').children[0].children[0];
    const f5Icon = document.querySelector('#f5').children[0].children[1];
    const f5Temp = document.querySelector('#f5').children[1].children[0];
    const f5Wind = document.querySelector('#f5').children[2].children[0];
    const f5Humidity = document.querySelector('#f5').children[3].children[0];

    const f5Weather = weatherData.list[39];
    console.log(f5Weather);

    f5Date.textContent = f5Weather.dt_txt.split(" ")[0];
    f5Icon.src = `https://openweathermap.org/img/wn/${f5Weather.weather[0].icon}@2x.png`
    f5Temp.textContent = f5Weather.main.temp;
    f5Wind.textContent = f5Weather.wind.speed;
    f5Humidity.textContent = f5Weather.main.humidity;
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

const displayLocalStorage = () => {
    let storageData = localStorage.getItem('weatherDashboard');
    let recentSearch = storageData ? JSON.parse(storageData) : [];
    recentSearch.reverse();

    const searhHistoryElement = document.querySelector('#search-history');

    // clear the element
    searhHistoryElement.innerHTML = "";

    // loop to append child elements
    for(let i = 0; i < (recentSearch.length -1); i++){
        let button = document.createElement('button');
        button.textContent = recentSearch[i];

        //adds btn class for bootstrap
        button.classList.add('btn');
        button.classList.add('btn-info');

        button.addEventListener('click', () => {
            fetchWeather(recentSearch[i])
        });

        searhHistoryElement.appendChild(button);
    }
}

displayLocalStorage();

document.querySelector('#search-form').addEventListener('submit', searchHandler);