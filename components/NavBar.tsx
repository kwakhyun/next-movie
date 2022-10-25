import { useRouter } from "next/router";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      {/* <Image src="/vercel.svg" alt="logo" width={100} height={40} /> */}
      <h1>Next Movies</h1>
      <div>
        <Link href={"/"}>
          <span className={router.pathname === "/" ? "active" : ""}>
            현재 상영
          </span>
        </Link>
        <Link href={"/upcoming"}>
          <span className={router.pathname === "/upcoming" ? "active" : ""}>
            개봉 예정
          </span>
        </Link>
        <Link href={"/top"}>
          <span className={router.pathname === "/top" ? "active" : ""}>
            최고 평점
          </span>
        </Link>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            display: flex;
            gap: 10px;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            color: #fff;
            background-color: #000;
            font-family: "Gill Sans", sans-serif;
          }
          img {
            max-width: 100px;
            margin-bottom: 5px;
          }
          span {
            font-weight: 600;
            font-size: 18px;
            cursor: pointer;
          }
          a:hover {
            color: #0070f3;
          }
          .active {
            color: #0070f3;
          }
          div {
            display: flex;
            width: 100vw;
            justify-content: space-around;
          }
        }
        @media (min-width: 768px) {
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            background-color: #000;
            color: #fff;
            height: 5rem;
          }
          span {
            color: #fff;
            text-decoration: none;
            margin: 0 1rem;
          }
          .active {
            color: #0070f3;
          }
        }
      `}</style>
    </nav>
  );
}
