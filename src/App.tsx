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
        <Route path="/tv/:movieID" element={<Tv />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search/:movieID" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path={"/movies/:movieID"} element={<Home />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
