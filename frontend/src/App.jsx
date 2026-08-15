import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="app-shell">
      <Header query={query} onSearch={setQuery} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage query={query} />} />
          <Route path="/game/:slug" element={<GamePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
