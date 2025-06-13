import MovieCard from "@/components/MovieCard";
import { searchMovies } from "@/lib/tmdb";

export default async function SearchPage({ searchParams }: any) {
  const query = searchParams.q || "";
  const page = parseInt(searchParams.page || "1");
  const { results, total_pages, page: currentPage } = query ? await searchMovies(query, page) : { results: [], page: 1, total_pages: 1 };

  return (
    <main className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {results.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        {currentPage > 1 && (
          <a href={`/search?q=${query}&page=${currentPage - 1}`} className="px-4 py-2 bg-gray-300 rounded">Prev</a>
        )}
        {currentPage < total_pages && (
          <a href={`/search?q=${query}&page=${currentPage + 1}`} className="px-4 py-2 bg-blue-600 text-white rounded">Next</a>
        )}
      </div>
    </main>
  );
}