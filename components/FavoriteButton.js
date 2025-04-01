import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const FavoriteButton = ({ item }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setIsFavorite(storedFavorites.some((fav) => fav.id === item.id));
  }, [item]);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
    } else {
      updatedFavorites = [...favorites, item];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={toggleFavorite} style={{ background: "none", border: "none", cursor: "pointer" }}>
      {isFavorite ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
    </button>
  );
};

export default FavoriteButton;
