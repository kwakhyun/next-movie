import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Movies } from "../components/Movies";
import { IMovies } from "../typings/types";

export default function Top({
  results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <>
      <Movies
        seo="최고 평점 영화"
        title="역대 최고 평점 영화 🎞"
        results={results}
      />
    </>
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
