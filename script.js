const selectEl = document.getElementById("genres");

const searchBtnEl = document.getElementById("playBtn");

const movieInfoEl = document.getElementById("movieInfo");

const moviePosterEl = document.getElementById("moviePoster");

const movieTextEl = document.getElementById("movieText");

const nextBtn = document.getElementById("likeBtn");

const nextBtnVisible = document.getElementById("likeOrDislikeBtns");

let genreId;

let moviesInGenre = [];

let movieIdIndex = 0;

if (genreId > 0) {
  nextBtnVisible.style.display = "block";
} else {
  nextBtnVisible.style.display = "none";
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MThlMjUyZmJjMDdiMDYxZjk1NzdkOTFhYmIzOTBmNSIsIm5iZiI6MTczMTE2MTIwMy4wODQyNTE0LCJzdWIiOiI2NWQ5OGRlNDcyZDg1NTAxODViYmZmMmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U0v6TotpvBW_Ta8ATP-7DvteYNy6u9OWj7DBIxsboSA",
  },
};

const fetchMovieGenres = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  );

  const results = await response.json();

  results.genres.forEach((genre) => {
    const optionsEl = document.createElement("option");
    optionsEl.value = genre.id;
    optionsEl.text = genre.name;
    selectEl.appendChild(optionsEl);
  });
};

const fetchGenreMovieDetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${id}`,
    options
  );
  const result = await response.json();

  moviesInGenre = result.results;

  movieIdIndex = 0;

  if (moviesInGenre.length > 0) {
    nextBtnVisible.style.display = "block";
    fetchMovieDetails(moviesInGenre[movieIdIndex].id);
  } else {
    alert("No movies found for this genre.");
    nextBtnVisible.style.display = "none";
  }
};

const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  const result = await response.json();
  console.log(result);
  movieInfoEl.innerHTML = `
          <div id="moviePoster">
        <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        alt="poster" id="moviePoster" />
      </div>
      <div id="movieText">
        <h1 id="movieTitle">${result.title}</h1>
        <p id="movieOverview">${result.overview}
        </p>
        <p id="movieOverview">Release Date: ${result.release_date}</p>
        <p id="movieOverview">Run time: ${result.runtime} Minutes</p>
        <p id="movieOverview">Status: ${result.status}</p>
      </div>
  `;
};

selectEl.addEventListener("change", () => {
  genreId = selectEl.value;
});

searchBtnEl.addEventListener("click", () => {
  if (genreId) {
    fetchGenreMovieDetails(genreId);
  } else {
    alert("Please select a genre before searching.");
  }
});

nextBtn.addEventListener("click", () => {
  if (moviesInGenre.length > 0 && movieIdIndex < moviesInGenre.length - 1) {
    movieIdIndex += 1;
    fetchMovieDetails(moviesInGenre[movieIdIndex].id);
  } else {
    alert("No more movies in this genre.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchMovieGenres();
});
