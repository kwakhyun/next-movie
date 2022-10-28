const { redirect } = require("next/dist/server/api-utils");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirect() {},
  async rewrites() {
    return [
      {
        source: "/movies/now",
        destination: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=ko-KR&page=1`,
      },
      {
        source: "/movies/upcoming",
        destination: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=ko-KR&page=1`,
      },
      {
        source: "/movies/top",
        destination: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=ko-KR&page=1`,
      },
      {
        source: "/movie/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${process.env.API_KEY}&language=ko-KR`,
      },
    ];
  },
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["image.tmdb.org"],
  },
};
