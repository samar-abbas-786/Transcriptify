import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
