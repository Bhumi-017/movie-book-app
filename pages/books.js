import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import { fetchBooks } from "../utils/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data || []);
        setFilteredBooks(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      setFilteredBooks(books.filter((book) => book.first_publish_year == selectedYear));
    } else {
      setFilteredBooks(books);
    }
  }, [selectedYear, books]);

  if (loading) return <p className="text-center text-lg">Loading books...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error loading books: {error}</p>;

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-6">Books 📚</h1>
      
      <div className="flex justify-center mb-6">
        <select 
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Years</option>
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i} value={2024 - i}>
              {2024 - i}
            </option>
          ))}
        </select>
      </div>

      {/* THIS IS THE KEY FIX: EXPLICITLY SETTING GRID */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.key} book={book} />)
          ) : (
            <p className="text-center col-span-full">No books match the selected filters.</p>
          )}
        </div>
      </div>
    </>
  );
}
