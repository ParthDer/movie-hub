"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchGenres } from "@/lib/tmdb";

export default function GenreFilter() {
  const [genres, setGenres] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => router.push(`/genre/${genre.id}`)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}