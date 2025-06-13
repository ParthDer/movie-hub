"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">⭐ {movie.vote_average}</p>
        </div>
      </motion.div>
    </Link>
  );
}