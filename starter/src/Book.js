import React from "react";
import PropTypes from "prop-types";

const Book = ({ book, handleMove }) => {
  const onMove = (e) => {
    const value = e.target.value;
    if (value === book.shelf || value === "none") {
      return;
    }
    const updatedBook = { ...book, shelf: value };
    handleMove(updatedBook);
  };

  const shelves = [
    {
      id: 1,
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading",
    },
    { id: 2, shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
    { id: 3, shelfName: "read", shelfDisplayName: "Read" },
    { id: 4, shelfName: "none", shelfDisplayName: "None" },
  ];

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${
              book.imageLinks && book.imageLinks.smallThumbnail
            })`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={onMove}
            defaultValue={book.shelf ? book.shelf : "none"}
          >
            <option disabled>Move to...</option>
            {shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.shelfName}>
                {shelf.shelfDisplayName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors &&
        book.authors.map((author) => (
          <div key={author} className="book-authors">
            {author}
          </div>
        ))}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleMove: PropTypes.func.isRequired,
};

export default Book;
