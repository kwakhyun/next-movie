import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Seo from "../../components/Seo";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface IGenres {
  id: number;
  name: string;
}

interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

type MovieDetailParams = [string, string] | [];

function Detail({
  params,
  movie,
}: {
  params: MovieDetailParams;
  movie: InferGetServerSidePropsType<GetServerSideProps>;
}) {
  console.log(movie);

  return (
    <div className="container">
      <Seo title={params[0]} />
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
        alt={movie?.original_title}
        width={1280}
        height={720}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          filter: "blur(5px)",
          opacity: 0.5,
        }}
      />
      <div className="flex-left">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.original_title}
          width={300}
          height={450}
        />
      </div>
      <div className="flex-right">
        <div className="title-div">
          <h1>{movie?.title}</h1>
          <span>{movie?.release_date}</span>
        </div>
        <span className="genre-tag">{movie?.genres[0].name}</span>
        {movie?.genres[1] && (
          <span className="genre-tag">{movie?.genres[1].name}</span>
        )}
        <span>{movie?.runtime}분</span>
        <h3>{movie?.tagline}</h3>
        <p>{movie?.overview}</p>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          max-width: 1200px;
          padding: 20px;
        }
        .flex-left {
          padding-right: 20px;
        }
        .flex-right {
        }
        .title-div {
          display: flex;
          align-items: center;
        }
        h1 {
          margin-right: 10px;
        }
        .genre-tag {
          display: inline-block;
          background-color: #f5f5f5;
          padding: 5px 10px;
          border-radius: 5px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = async ({ params: { params } }: any) => {
  const movie: IMovie = await (
    await fetch(`${process.env.SERVER_URL}/movie/${params[1]}`)
  ).json();

  return {
    props: {
      params,
      movie,
    },
  };
};

export default Detail;
