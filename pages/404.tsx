import Link from "next/link";
import Seo from "../components/Seo";
import styled from "styled-components";

export default function NotFound() {
  return (
    <StyledNotFound>
      <Seo title="NOT FOUND" />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link href="/">
        <a>
          <h2>홈으로 돌아가기 &rarr;</h2>
        </a>
      </Link>
    </StyledNotFound>
  );
}

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: 1.5rem;
    color: #999;
  }
`;
