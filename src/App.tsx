import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
