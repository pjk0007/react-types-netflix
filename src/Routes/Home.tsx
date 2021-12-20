import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, IMovie } from "../api";
import Banner from "../Components/Banner";
import Modal from "../Components/Modal";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utills";

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
  const bigMovieMatch = useMatch("/movies/:movieId");
  console.log(bigMovieMatch);

  const [totalMovie, setTotalMovie] = useState<any>([]);

  const { data: nowPlaying, isLoading: NowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  useEffect(() => {
    if (nowPlaying) {
      setTotalMovie([...nowPlaying.results]);
    }
  }, [nowPlaying]);

  console.log("total: ", totalMovie);

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    totalMovie?.find(
      (movie: any) => movie.id + "" === bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {NowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner results={nowPlaying?.results[0]} />
          <Slider data={nowPlaying} category={"현재 상영중인 영화"} />
          <Modal clickedMovie={clickedMovie} bigMovieMatch={bigMovieMatch} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
