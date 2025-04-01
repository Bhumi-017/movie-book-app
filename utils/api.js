import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_URL = "https://api.themoviedb.org/3";
const OPEN_LIBRARY_URL = "https://openlibrary.org";

/**
 * Fetch movies from TMDB API
 * @param {string} query - Search term for movies (optional)
 * @returns {Promise<Array>} - List of movies
 */
export const fetchMovies = async (query) => {
  try {
    const url = query
      ? `${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      : `${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}`;

    const res = await axios.get(url);
    return res.data?.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Fetch movie genres from TMDB API
 * @returns {Promise<Array>} - List of movie genres with id & name
 */
export const fetchMovieGenres = async () => {
  try {
    const url = `${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`;
    const res = await axios.get(url);
    return res.data?.genres || [];
  } catch (error) {
    console.error("Error fetching movie genres:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Fetch books from Open Library API
 * @param {string} query - Search term for books (optional)
 * @returns {Promise<Array>} - List of books
 */
export const fetchBooks = async (query) => {
  try {
    const url = query
      ? `${OPEN_LIBRARY_URL}/search.json?title=${encodeURIComponent(query)}`
      : `${OPEN_LIBRARY_URL}/subjects/popular.json`;

    const res = await axios.get(url);
    
    // OpenLibrary returns data in different formats for search vs. subjects
    return query ? res.data?.docs || [] : res.data?.works || [];
  } catch (error) {
    console.error("Error fetching books:", error.response?.data || error.message);
    return [];
  }
};
