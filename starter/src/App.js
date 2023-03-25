import "./App.css";
import { useState } from "react";
import SearchPage from "./SearchPage";
import LibraryPage from "./LibraryPage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
        />
      ) : (
        <LibraryPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
        />
      )}
    </div>
  );
}

export default App;
