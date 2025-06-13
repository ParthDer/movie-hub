'use client';
import { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchGenres, fetchMoviesByGenre, searchMovies } from '../lib/tmdb';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import DarkModeToggle from '../components/DarkModeToggle';
import { useRouter } from 'next/navigation';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  // Add other fields as needed
};

type Genre = {
  id: number;
  name: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState<number | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const loadMore = async () => {
    let data = genre
      ? await fetchMoviesByGenre(genre, page)
      : query
      ? await searchMovies(query, page)
      : await fetchPopularMovies(page);
    setMovies((prev) => [...prev, ...data.results]);
    setPage((p) => p + 1);
  };

  const lastRef = useInfiniteScroll(loadMore);

  useEffect(() => {
    fetchGenres().then(setGenres);
    loadMore();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    const data = await searchMovies(query, 1);
    setMovies(data.results);
  };

  return (
    <main className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">🎬 TMDB Explorer</h1>
        <DarkModeToggle />
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded border dark:bg-gray-800 w-full"
          placeholder="Search movies..."
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>

      <div className="flex gap-2 overflow-x-auto mb-4">
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={async () => {
              setGenre(g.id);
              setPage(1);
              const data = await fetchMoviesByGenre(g.id, 1);
              setMovies(data.results);
            }}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie, i) => (
          <div
            key={movie.id}
            ref={i === movies.length - 1 ? lastRef : null}
            onClick={() => router.push(`/movie/${movie.id}`)}
            className="bg-white dark:bg-gray-800 rounded shadow p-2 hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <h2 className="text-sm mt-2 font-semibold line-clamp-2">{movie.title}</h2>
          </div>
        ))}
      </div>
      {movies.length === 0 && <p className="mt-8 text-center text-gray-500">😔 No results found. Try another search.</p>}
    </main>
  );
}