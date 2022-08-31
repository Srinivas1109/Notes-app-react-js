import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Notes from "./Components/Notes";
import SearchContext from "./Context/Search";
import { useState } from "react"


function App() {
  const [searchValue, setSearchValue] = useState('')
  const variables = {
    searchValue,
    setSearchValue
  }
  return (
    <div className="App">
      <Router>
        <SearchContext.Provider value={variables}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all-notes" element={<Notes />} />
          </Routes>
        </SearchContext.Provider>
      </Router>
    </div>
  );
}

export default App;
