import { useEffect, useState } from "react";
import { fetchMovieGenres } from "../utils/api";

const Filters = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    fetchMovieGenres().then(setGenres);
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      genre: selectedGenre,
      year: selectedYear,
      rating: selectedRating,
    });
  };

  return (
    <div className="filters">
      {/* Genre Filter */}
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} onBlur={handleFilterChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Year Filter */}
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} onBlur={handleFilterChange}>
        <option value="">All Years</option>
        {Array.from({ length: 30 }, (_, i) => (
          <option key={i} value={2024 - i}>
            {2024 - i}
          </option>
        ))}
      </select>

      {/* Rating Filter */}
      <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} onBlur={handleFilterChange}>
        <option value="">All Ratings</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}+
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
