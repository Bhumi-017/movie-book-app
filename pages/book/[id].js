import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../utils/api";
import Navbar from "../../components/Navbar";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBooks().then((books) => {
        const foundBook = books.find((b) => b.key === id);
        setBook(foundBook);
      });
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <h1>{book.title}</h1>
      <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={book.title} />
      <p>📖 {book.author_name?.[0]}</p>
    </>
  );
}
