import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Movies } from "../components/Movies";
import { IMovies } from "../typings/types";

export default function Upcoming({
  results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <>
      <Movies
        seo="개봉 예정 영화"
        title="개봉 예정 영화 🎥"
        results={results}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { results }: IMovies = await (
    await fetch(`${process.env.SERVER_URL}/movies/upcoming`)
  ).json();

  return {
    props: {
      results,
    },
  };
};
