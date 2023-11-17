const weatherKey = '9e2cf0adc814e249e7716e4caf6c4dab';


const searchHandler = async (event) => {
    event.preventDefault();
    console.log('hit searchHandlers');
    //get city they want to search for
    const searchCity = document.querySelector('#search-input').value.trim();

    localstorageHandler(searchCity);
    //fetch
    // fetchWeather(searchCity);
};

// data fetcher
const fetchWeather = async (city) => {
    // get latitude and longitude
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherKey}`)
    .then((response) => {
        return response.json();
    })
    .then(async (data) => {
        console.log(data);
        // lat and lon
        let lat = data[0].lat;
        let lon = data[0].lon;

        // fetch 5 day weather
        await fetch(`https:api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
        .then((response) => {
            return response.json();
        })
        .then(async (data) =>{
            console.log(data);
        });
    })
}

// local storage
const localstorageHandler = (data) => {
    // get localStorage
    let currentData = localStorage.getItem('weatherDashboard');
    let recentSearch = currentData ? JSON.parse(currentData) : [];

    console.log(currentData);

    console.log(recentSearch)

    // if their localStorage array has more than 6 items
    if(recentSearch.length > 6) {
        recentSearch.shift();
        recentSearch.push(JSON.stringify(data));
    } else {
        recentSearch.push(JSON.stringify(data));
    }

    console.log(recentSearch);
    
    // set localStorage
    localStorage.setItem('weatherDashboard', JSON.stringify(recentSearch));
}


document.querySelector('#search-form').addEventListener('submit', searchHandler);