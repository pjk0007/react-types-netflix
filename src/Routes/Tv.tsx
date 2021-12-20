import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  IGetTvResult,
} from "../api";
import Banner from "../Components/Banner";
import Modal from "../Components/Modal";
import Slider from "../Components/Slider";
import TvModal from "../Components/TvModal";
import TvSlider from "../Components/TvSlider";

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

function Tv() {
  const bigMovieMatch = useMatch(process.env.PUBLIC_URL + "/tv/:boxId");

  const [totalMovie, setTotalMovie] = useState<any>([]);

  const { data: nowPlaying, isLoading: NowPlayingLoading } =
    useQuery<IGetTvResult>(["tv", "airToday"], getOnTheAirTv);

  const { data: popular, isLoading: popularLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getAiringTodayTv
  );

  const { data: topRated, isLoading: topRatedLoading } = useQuery<IGetTvResult>(
    ["tv", "popular"],
    getPopularTv
  );

  const { data: upComing, isLoading: upComingLoading } = useQuery<IGetTvResult>(
    ["tv", "topRated"],
    getTopRatedTv
  );

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
          <TvSlider data={popular} category={"생방송"} gubun={"pop"} />
          <TvSlider
            data={nowPlaying}
            category={"오늘 방영 프로그램"}
            gubun={"now"}
          />
          <TvSlider data={topRated} category={"인기 프로그램"} gubun={"top"} />
          <TvSlider
            data={upComing}
            category={"평점 높은 프로그램"}
            gubun={"com"}
          />
          <TvModal
            clickedMovie={clickedMovie}
            boxId={bigMovieMatch?.params.boxId}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
