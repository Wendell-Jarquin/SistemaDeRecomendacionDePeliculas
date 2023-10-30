// Referencia a elementos del formulario y el área de recomendaciones
const genreInput = document.getElementById("genre-input");
const ageRatingInput = document.getElementById("age-rating-input");
const durationInput = document.getElementById("duration-input");
const recommendButton = document.getElementById("recommend-button");
const recommendationsDiv = document.getElementById("recommendations");

// Función para cargar datos desde un archivo JSON
async function loadData() {
    try {
        const response = await fetch('base.json'); // Reemplaza 'base.json' con la ubicación de tu archivo JSON
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('No se pudo cargar el archivo JSON.');
            return [];
        }
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        return [];
    }
}

// ...

recommendButton.addEventListener("click", async () => {
    const userGenre = genreInput.value;
    const userAgeRating = ageRatingInput.value;
    const userDuration = parseInt(durationInput.value);

    // Cargar datos de películas desde el archivo JSON
    const movies = await loadData();

    // Filtrar las películas que coinciden con las preferencias del usuario y tienen la duración exacta
    const recommendedMovies = movies.filter(movie => {
        return (
            movie.genre === userGenre &&
            movie.ageRating === userAgeRating &&
            movie.duration === userDuration
        );
    });

    // Mostrar las recomendaciones en la página
    recommendationsDiv.innerHTML = "<h2>Películas Recomendadas:</h2>";
    if (recommendedMovies.length > 0) {
        recommendedMovies.forEach(movie => {
            const movieInfo = movie.information;
            recommendationsDiv.innerHTML += `
                <p><strong>Título:</strong> ${movie.title}</p>
                <p><strong>Género:</strong> ${movie.genre}</p>
                <p><strong>Clasificación de Edad:</strong> ${movie.ageRating}</p>
                <p><strong>Duración:</strong> ${movie.duration} minutos</p>
                <p><strong>Director:</strong> ${movieInfo.director}</p>
                <p><strong>Año de Lanzamiento:</strong> ${movieInfo.releaseYear}</p>
                <p><strong>Descripción:</strong> ${movieInfo.description}</p>
                <p><strong>Actores:</strong> ${movieInfo.actors.join(", ")}</p>
                <hr>
            `;
        });
    } else {
        recommendationsDiv.innerHTML += "<p>Lo sentimos, no se encontraron películas que coincidan con tus preferencias y duración exacta.</p>";
    }
});


