import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const Shelf = ({ listOfBooks, handleMove, title }) => {
  return (
    <div className="bookshelf">
      {title && <h2 className="bookshelf-title">{title}</h2>}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {listOfBooks.map((book) => (
            <li key={book.id}>
              <Book book={book} handleMove={handleMove} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  listOfBooks: PropTypes.array.isRequired,
  handleMove: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Shelf;
