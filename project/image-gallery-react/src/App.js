import { useState } from "react";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className="App">
      <Navigation onSearch={handleSearch} />
      <Home searchQuery={searchQuery} onSearch={handleSearch} />
    </div>
  );
}

export default App;
