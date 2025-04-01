import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addToFavorites, getFavorites, removeFromFavorites } from "../utils/favorites";

const BookCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some((fav) => fav.key === book.key));
  }, [book.key]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
    setIsFavorite(!isFavorite);
  };

  const imageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/default-book-cover.jpg";

  return (
    <div className="{styles.card} bg-gray-900 text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center w-full">
      <Image
        className="w-full h-60 object-cover rounded-md"
        src={imageUrl}
        alt={book.title}
        width={200}
        height={300}
        unoptimized
      />
      <Link href={`/book/${book.key.replace(/^\/+/, "")}`} className="block mt-2 text-yellow-400 hover:underline text-center">
        <h3 className="text-lg font-semibold">{book.title}</h3>
      </Link>
      <p className="text-sm text-gray-400 text-center">📖 {book.author_name?.join(", ") || "Unknown Author"}</p>
      <button
        onClick={toggleFavorite}
        className={`mt-3 px-4 py-2 rounded-lg font-semibold ${isFavorite ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-700`}
      >
        {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
      </button>
    </div>
  );
};

export default BookCard;
