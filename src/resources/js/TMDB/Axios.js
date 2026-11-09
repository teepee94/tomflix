import axios from "axios";

// The TMDB v3 key is read from the environment (see .env.example) so it is
// never committed. Note: in a client-only app the key is still visible in the
// browser's network requests; a server-side proxy is the only way to hide it.
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: "en-GB",
    },
});

export default instance;
