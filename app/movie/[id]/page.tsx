import Trailer from '@/components/Trailer';
import { fetchMovieDetails, fetchMovieVideos } from '@/lib/tmdb';
import Link from 'next/link';

export default async function MovieDetails({ params }: { params: { id: number } }) {
  const movie = await fetchMovieDetails(params.id);
  const videos = await fetchMovieVideos(params.id);

  return (
    <div className="p-4 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <Link href="/" className="text-blue-500 underline mb-4 inline-block">← Back to Home</Link>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded"
        />
        <div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4">{movie.release_date} • ⭐ {movie.vote_average}</p>
          <p className="mb-4">{movie.overview}</p>
          <Trailer videos={videos} />
        </div>
      </div>
    </div>
  );
}