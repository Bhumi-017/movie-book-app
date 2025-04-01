import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addToFavorites, getFavorites, removeFromFavorites } from "../utils/favorites";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <Image
        className="w-full h-60 object-cover rounded-md"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={200}
        height={300}
        alt={movie.title}
      />
      <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
      <p className="text-sm text-gray-400">⭐ {movie.vote_average} | 📅 {movie.release_date?.split("-")[0]}</p>
      <button
        onClick={toggleFavorite}
        className={`mt-3 px-4 py-2 rounded-lg font-semibold ${isFavorite ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-700`}
      >
        {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
      </button>
      <Link href={`/movie/${movie.id}`} className="block mt-2 text-blue-400 hover:underline">
        {movie.title}
      </Link>
    </div>
  );
};

export default MovieCard;
