import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import { getFavorites } from "../utils/favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <>
      <Navbar />
      <h1>Favorites ⭐</h1>
      <div className="grid">
        {favorites.length > 0 ? (
          favorites.map((item) =>
            item.poster_path ? <MovieCard key={item.id} movie={item} /> : <BookCard key={item.key} book={item} />
          )
        ) : (
          <p>No favorites added yet. Start adding your favorite movies and books! 🎬📚</p>
        )}
      </div>
    </>
  );
}
