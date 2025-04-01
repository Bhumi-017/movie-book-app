import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../utils/api";
import Navbar from "../../components/Navbar";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMovies().then((movies) => {
        const foundMovie = movies.find((m) => m.id.toString() === id);
        setMovie(foundMovie);
      });
    }
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average}</p>
    </>
  );
}
