

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
                             <button class="btn btn-primary" onclick="getWeather('${country.latlng[0]}', '${country.latlng[1]}')">Click for Weather</button>
                        </div>
                    </div>
                `;

                card.innerHTML = cardContent;
                countryCardsContainer.appendChild(card);
        

    });


}).catch(error => {
    console.log('error',error);
})

function getWeather(lat, lng) {
    alert(`Fetching weather for coordinates: ${lat}, ${lng}`);
    
    
}

