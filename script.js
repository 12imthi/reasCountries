

    let pro = new Promise(async (resolve,reject) => {

       try {
        let response = await fetch('https://restcountries.com/v3.1/all');

        let data = await response.json();
        resolve(data)
       } catch (error) {
        reject(error)
       }

    })

pro.then(data => {
    console.log('fetched data', data);

    data.forEach(country => {
        const countryCardsContainer = document.getElementById('country-cards');
        const card = document.createElement('div');
                card.className = 'col-md-4';

                const cardContent = `
                    <div class="card">
                        <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} flag">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">
                                <strong>Capital:</strong> ${country.capital }<br>
                                <strong>Region:</strong> ${country.region}<br>
                                <strong>Latlng:</strong> ${country.latlng.join(', ')}<br>
                                <strong>Country Code:</strong> ${country.cca3}
                            </p>
                             <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getWeather('${country.latlng[0]}', '${country.latlng[1]}' , '${country.name.common}')">Click for Weather</button>
                        </div>
                    </div>
                `;

                card.innerHTML = cardContent;
                countryCardsContainer.appendChild(card);
        

    });


}).catch(error => {
    console.log('error',error);
})

  // Fetch and display weather data
  function getWeather(lat, lng, location) {
    // alert(`Fetching weather for coordinates: ${lat}, ${lng}`);
    const apiKey = 'af9f8f42e292503ee3fb7319276af05f'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            displayWeather(data, location);
        })
        .catch(error => {
            console.error('There was a problem fetching weather data:', error);
        });
}

// Display weather data
function displayWeather(data, location) {
    const weatherInfo = `
        <h4>Weather in ${location}</h4>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
    
}
