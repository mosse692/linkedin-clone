import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/home"
            element={[<Header key="1" />, <Home key="2" />]}
          />
        </Routes>
      </Router>
    </div>
  );
}

// maybe try useEffect and redirect to login page using also localStorage from this page

export default App;
