import styled from "styled-components";
import { makeImagePath } from "../utills";

const Container = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

function Banner({ results: data }: any) {
  return (
    <Container bgphoto={makeImagePath(data.backdrop_path || "")}>
      <Title>{data.title}</Title>
      <Overview>{data.overview}</Overview>
    </Container>
  );
}

export default Banner;
