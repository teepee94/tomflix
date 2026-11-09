// Endpoint paths only. The API key and language are added by the axios
// instance in ./Axios.js.
const requests = {
    trending: "/trending/all/week",
    netflixOriginals: "/discover/tv?with_networks=213",
    topRated: "/movie/top_rated",
    actionMovies: "/discover/movie?with_genres=28",
    comedyMovies: "/discover/movie?with_genres=35",
    romanceMovies: "/discover/movie?with_genres=10749",
    documentaries: "/discover/movie?with_genres=99",
};

export default requests;
