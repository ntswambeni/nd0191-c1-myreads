import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Shelf from "./Shelf";

const SearchPage = ({ handleMove, library }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listOfBooks, setListOfBooks] = useState([]);
  useEffect(() => {
    if (searchQuery) {
      const searchBook = async () => {
        const res = await search(searchQuery);
        if (res.error) {
          setListOfBooks([]);
        } else {
          res.forEach((book) => {
            for (let i = 0; i < library.length; i++) {
              if (book.id === library[i].id) {
                book.shelf = library[i].shelf;
                return;
              }
            }
          });
          setListOfBooks(res);
        }
      };
      searchBook();
    }
  }, [searchQuery]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <Shelf listOfBooks={listOfBooks} handleMove={handleMove} />
      </div>
    </div>
  );
};

export default SearchPage;
