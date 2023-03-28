import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Shelf from "./Shelf";
import PropTypes from "prop-types";
import useDebounce from "./useDebounce";

const SearchPage = ({ handleMove, library }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listOfBooks, setListOfBooks] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const debouncedValue = useDebounce(searchQuery, 500);

  const validateBooks = (searchedBooks, mainBooks) => {
    const validatedBooks = searchedBooks.map((searchedBook) => {
      const myBook = mainBooks.filter(
        (myBook) => myBook.id === searchedBook.id
      )[0];
      searchedBook.shelf = myBook && myBook.shelf;
      return searchedBook;
    });
    return validatedBooks;
  };

  useEffect(() => {
    if (debouncedValue === "") {
      setSearchError(false);
      setListOfBooks([]);
    } else {
      const searchBook = async () => {
        const res = await search(debouncedValue);
        if (res.error) {
          setSearchError(true);
          setListOfBooks([]);
        } else {
          setSearchError(false);
          const validatedBooks = validateBooks(res, library);
          setListOfBooks(validatedBooks);
        }
      };
      searchBook();
    }
  }, [debouncedValue, library]);

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
        {searchError ? (
          <h2 style={{ color: "red" }}>The book was not found</h2>
        ) : (
          <Shelf listOfBooks={listOfBooks} handleMove={handleMove} />
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  library: PropTypes.array.isRequired,
  handleMove: PropTypes.func.isRequired,
};

export default SearchPage;
