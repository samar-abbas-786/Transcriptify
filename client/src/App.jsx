import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/search";
import ShowTranscript from "./components/showTranscript";
import ShowSummary from "./components/showSummary";
import PricingSection from "./components/Pricing";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/search" Component={Search} />
          <Route path="/transcript" Component={ShowTranscript} />
          <Route path="/summary" Component={ShowSummary} />
          <Route path="/price" Component={PricingSection} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
