import "./App.css";
import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import LibraryPage from "./LibraryPage";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [library, setLibrary] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(res);
      setLibrary(res);
    };
    getBooks();
  }, []);

  const handleMove = (bookToMove) => {
    setLibrary((prevState) => [
      ...prevState.filter((book) => book.id !== bookToMove.id),
      bookToMove,
    ]);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
        />
      ) : (
        <LibraryPage
          library={library}
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
          handleMove={handleMove}
        />
      )}
    </div>
  );
}

export default App;
