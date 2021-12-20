import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path={process.env.PUBLIC_URL + "/tv/:movieID"}
          element={<Tv />}
        />
        <Route path={process.env.PUBLIC_URL + "/tv"} element={<Tv />} />
        <Route
          path={process.env.PUBLIC_URL + "/search/:movieID"}
          element={<Search />}
        />
        <Route path={process.env.PUBLIC_URL + "/search"} element={<Search />} />
        <Route
          path={process.env.PUBLIC_URL + "/movies/:movieID"}
          element={<Home />}
        />
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
