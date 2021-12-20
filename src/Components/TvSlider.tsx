import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { makeImagePath } from "../utills";

/************************************/
/*****    Components Start    *******/
/************************************/

const Container = styled.div`
  position: relative;
  margin-bottom: 200px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled(motion.div)`
  z-index: 7;
  padding: 5px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Items = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string; index: number }>`
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

/**********************************/
/*****     Variants Start     *****/
/**********************************/

const rowVariants = {
  hidden: (back: boolean) => {
    return {
      x: back ? -window.outerWidth + 10 : window.outerWidth - 10,
    };
  },
  visible: {
    x: 0,
  },
  exit: (back: boolean) => {
    return {
      x: back ? window.outerWidth - 10 : -window.outerWidth + 10,
    };
  },
};

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

/**********************************/
/*****       Main   Start     *****/
/**********************************/

const offset = 6;

function TvSlider({ data, category, gubun }: any) {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      setLeaving(true);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      setLeaving(true);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      const minIndex = 0;
      setIndex((prev) => (prev === minIndex ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/tv/${gubun + movieId}`);
  };

  return (
    <Container>
      <div style={{ position: "absolute", zIndex: 0, top: "-80%", left: 10 }}>
        {category}
      </div>
      <Row>
        <Button
          onClick={decreaseIndex}
          whileHover={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <i className="fas fa-chevron-left fa-2x"></i>
        </Button>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Items
            custom={back}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * (index + 1))
              .map((movie: any, index: number) => (
                <Box
                  index={index}
                  layoutId={gubun + movie.id}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(movie.id)}
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(
                    movie.backdrop_path
                      ? movie.backdrop_path
                      : movie.poster_path,
                    "w500"
                  )}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Items>
        </AnimatePresence>
        <Button
          onClick={increaseIndex}
          whileHover={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <i className="fas fa-chevron-right fa-2x"></i>
        </Button>
      </Row>
    </Container>
  );
}

export default TvSlider;
