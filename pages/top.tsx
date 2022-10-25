import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";
import { IMovieClickProps, IMovies, IMoviesItem } from "../typings/types";

export default function Top({
  results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  const router = useRouter();

  const onClickMovieCard = ({ id, title }: IMovieClickProps) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="box">
      <Seo title="최고 평점" />

      <div className="title">
        <h2>Top Rated 🎞</h2>
      </div>

      <div className="movies">
        {results?.map((movie: IMoviesItem) => (
          <>
            {!movie.genre_ids.includes(27) && (
              <div
                className="movie"
                onClick={() => {
                  onClickMovieCard({
                    id: movie.id,
                    title: movie.original_title,
                  });
                }}
              >
                <h4>
                  <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                    {movie.original_title}
                  </Link>
                </h4>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  width={500}
                  height={750}
                />
              </div>
            )}
          </>
        ))}
      </div>

      <style jsx>{`
        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
        }

        .container {
          width: 100%;
        }
        .movies {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          padding: 20px;
          gap: 20px;
          text-align: center;
          width: 100%;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie h4 {
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { results }: IMovies = await (
    await fetch(`${process.env.SERVER_URL}/movies/top`)
  ).json();

  return {
    props: {
      results,
    },
  };
};
