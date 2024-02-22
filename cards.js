// URL del JSON
const url = 'https://raw.githubusercontent.com/AS-Garcia/mirepositorio/main/imdb_top_1000.json';

// Fetch API para obtener el JSON
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Procesa los datos para las tarjetas
        const cards = data.map(movie => {
            return `
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="${movie.Poster_Link}" alt="${movie.Series_Title}">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">${movie.Series_Title}</h3>
                        <p>Año: ${movie.Released_Year}</p>
                        <p>Calificación: ${movie.IMDB_Rating}</p>
                    </div>
                </div>
            `;
        });
        document.getElementById('cards').innerHTML = cards.join('');
    })
    .catch(error => console.error('Error:', error));
