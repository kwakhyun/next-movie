import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Movies } from "../components/Movies";
import { IMovies } from "../typings/types";

export default function Home({
  results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <>
      <Movies
        seo="현재 상영 영화"
        title="현재 상영중인 영화 📽"
        results={results}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { results }: IMovies = await (
    await fetch(`${process.env.SERVER_URL}/movies/now`)
  ).json();

  return {
    props: {
      results,
    },
  };
};
