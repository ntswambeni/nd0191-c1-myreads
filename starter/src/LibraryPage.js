import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

const LibraryPage = ({ library, handleMove }) => {
  const filterBooksByShelf = (shelfTitle) => {
    return library.filter((book) => book.shelf === shelfTitle);
  };

  const bookShelves = [
    {
      title: "Currently Reading",
      listOfBooks: filterBooksByShelf("currentlyReading"),
    },
    { title: "Want to Read", listOfBooks: filterBooksByShelf("wantToRead") },
    { title: "Read", listOfBooks: filterBooksByShelf("read") },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map((shelf) => (
            <Shelf
              key={shelf.title}
              title={shelf.title}
              listOfBooks={shelf.listOfBooks}
              handleMove={handleMove}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default LibraryPage;
