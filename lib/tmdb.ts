import axios from "axios";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-US",
  },
});

export const fetchPopularMovies = async (page = 1) => {
  const res = await api.get("/movie/popular", { params: { page } });
  return res.data;
};


export const searchMovies = async (query: string, page = 1) => {
  const res = await api.get("/search/movie", { params: { query, page } });
  return res.data;
};

export const fetchGenres = async () => {
  const res = await api.get("/genre/movie/list");
  return res.data.genres;
};

export const fetchMoviesByGenre = async (genreId: number, page = 1) => {
  const res = await api.get("/discover/movie", { params: { with_genres: genreId, page } });
  return res.data;
};

export const fetchMovieDetails = async (id: number) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};

export const fetchMovieVideos = async (id:number) => {
  const res = await api.get(`/movie/${id}/videos`);
  return res.data.results;
};