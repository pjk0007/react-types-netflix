import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router";
import styled from "styled-components";
import { makeImagePath } from "../utills";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  padding-bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.veryDark};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.img`
  width: 100%;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 2vw;
  position: relative;
  top: -4vw;
  padding: 10px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -4vw;
  color: ${(props) => props.theme.white.lighter};
`;

function Modal({ clickedMovie, bigMovieMatch }: any) {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();

  const onOverlayClick = () => navigate("/");

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            layoutId={bigMovieMatch?.params.movieId}
            style={{
              top: scrollY.get() + 100,
            }}
          >
            {clickedMovie && (
              <>
                <BigCover
                  src={makeImagePath(clickedMovie.backdrop_path, "w500")}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
