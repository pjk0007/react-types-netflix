import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router";
import styled from "styled-components";
import { getSearchData, IGetMoviesResult } from "../api";
import SearchModal from "../Components/SearchModal";
import { makeImagePath } from "../utills";

const Grid = styled.div`
  padding: 20px;
  margin-top: 100px;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  display: flex;
  align-items: flex-end;
  height: 200px;
  font-size: 30px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  :first-child {
    transform-origin: center left;
  }
  :last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.veryDark};
  opacity: 0;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 1vw;
    color: white;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
    zIndex: 5,
  },

  hover: {
    zIndex: 6,
    scale: 1.5,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const boxId = new URLSearchParams(location.search).get("boxId");
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => {
      return getSearchData(keyword ?? "");
    }
  );
  const onBoxClicked = (movieId: number) => {
    navigate(`/search?keyword=${keyword}&boxId=${movieId}`);
  };

  console.log(keyword, "b");

  const clickedMovie =
    boxId && data?.results?.find((movie: any) => movie.id + "" === boxId);

  return (
    <>
      <Grid>
        <AnimatePresence>
          {data?.results.map((movie) => (
            <Box
              layoutId={movie.id + ""}
              key={movie.id}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              onClick={() => onBoxClicked(movie.id)}
              transition={{ type: "tween" }}
              bgphoto={
                movie.backdrop_path
                  ? makeImagePath(movie.backdrop_path, "w500")
                  : movie.poster_path
                  ? makeImagePath(movie.poster_path, "w500")
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEx3wXEnooGyeOfpTTGA0wcaY7Wp3uSx7kNq_W6gCZ5C9oHf9UDamdREOi2fCVUFK1D0&usqp=CAU"
              }
            >
              <Info variants={infoVariants}>
                <h4>{movie.title ? movie.title : movie.name}</h4>
              </Info>
            </Box>
          ))}
        </AnimatePresence>
      </Grid>
      <SearchModal
        clickedMovie={clickedMovie}
        boxId={boxId}
        keyword={keyword}
      />
    </>
  );
}

export default Search;
