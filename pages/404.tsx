import Link from "next/link";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div>
      <Seo title="NOT FOUND" />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link href="/">
        <h2>홈으로 돌아가기 &rarr;</h2>
      </Link>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        h2 {
          font-size: 1.5rem;
          color: #999;
        }
      `}</style>
    </div>
  );
}
