import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getNowMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
  IGetMoviesResult,
} from "../api";
import Banner from "../Components/Banner";
import Modal from "../Components/Modal";
import Slider from "../Components/Slider";

/************************************/
/*****     Components Start     *****/
/************************************/

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/************************************/
/*****     Components End     *******/
/************************************/

function Home() {
  const bigMovieMatch = useMatch("/movies/:boxId");

  const [totalMovie, setTotalMovie] = useState<any>([]);

  const { data: nowPlaying, isLoading: NowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowMovies);

  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movies", "popular"], getPopularMovies);

  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);

  const { data: upComing, isLoading: upComingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upComing"], getUpComingMovies);

  useEffect(() => {
    if (nowPlaying && popular && topRated && upComing) {
      setTotalMovie([
        ...nowPlaying.results,
        ...popular.results,
        ...topRated.results,
        ...upComing.results,
      ]);
    }
  }, [nowPlaying, popular, topRated, upComing]);

  const clickedMovie =
    bigMovieMatch?.params.boxId &&
    totalMovie?.find(
      (movie: any) => movie.id + "" === bigMovieMatch.params.boxId?.slice(3)
    );

  return (
    <Wrapper>
      {NowPlayingLoading ||
      popularLoading ||
      topRatedLoading ||
      upComingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner results={nowPlaying?.results[0]} />
          <Slider
            data={nowPlaying}
            category={"현재 상영중인 영화"}
            gubun={"now"}
          />
          <Slider data={popular} category={"인기 영화"} gubun={"pop"} />
          <Slider data={topRated} category={"평점 높음 영화"} gubun={"top"} />
          <Slider data={upComing} category={"개봉 예정 영화"} gubun={"com"} />
          <Modal
            clickedMovie={clickedMovie}
            boxId={bigMovieMatch?.params.boxId}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
