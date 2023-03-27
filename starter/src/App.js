import "./App.css";
import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import LibraryPage from "./LibraryPage";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route } from "react-router-dom";

function App() {
  const [library, setLibrary] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setLibrary(res);
    };
    getBooks();
  }, []);

  const updatedBook = (bookToMove) => {
    BooksAPI.update(bookToMove, bookToMove.shelf);
  };

  const handleMove = (bookToMove) => {
    updatedBook(bookToMove);
    setLibrary((prevState) => [
      ...prevState.filter((book) => book.id !== bookToMove.id),
      bookToMove,
    ]);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={<SearchPage library={library} handleMove={handleMove} />}
        />
        <Route
          exact
          path="/"
          element={<LibraryPage library={library} handleMove={handleMove} />}
        />
      </Routes>
    </div>
  );
}

export default App;
