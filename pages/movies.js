import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import { fetchMovies } from "../utils/api";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "" });

  useEffect(() => {
    fetchMovies(search).then(setMovies);
  }, [search]);

  useEffect(() => {
    let filtered = movies;

    // Apply genre filter
    if (filters.genre) {
      filtered = filtered.filter((movie) => movie.genre_ids.includes(parseInt(filters.genre)));
    }

    // Apply year filter
    if (filters.year) {
      filtered = filtered.filter((movie) => movie.release_date?.startsWith(filters.year));
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter((movie) => movie.vote_average >= filters.rating);
    }

    setFilteredMovies(filtered);
  }, [filters, movies]);

  return (
    <>
      <Navbar />
      <h1>Movies 🎬</h1>
      <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Filters onFilterChange={setFilters} />
      <div className="grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies match the selected filters.</p>
        )}
      </div>
    </>
  );
}
