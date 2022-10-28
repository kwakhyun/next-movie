import Head from "next/head";

interface IProps {
  title: string | undefined;
}

export default function Seo({ title }: IProps) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
