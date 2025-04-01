import Link from "next/link";
import styles from "../styles/Navbar.module.css"; // ✅ Now it will not be removed

const Navbar = () => {
  return (
    <nav className={`${styles.navbar} flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md`}>
      <h1 className="text-2xl font-bold dark:text-white">📚 Movie/Book App</h1>
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-900 dark:text-white hover:underline">Home</Link>
        <Link href="/movies" className="text-gray-900 dark:text-white hover:underline">Movies</Link>
        <Link href="/books" className="text-gray-900 dark:text-white hover:underline">Books</Link>
        <Link href="/favorites" className="text-gray-900 dark:text-white hover:underline">Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
