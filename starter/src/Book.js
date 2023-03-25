import React from "react";

const Book = ({ book, handleMove }) => {
  const onMove = (e) => {
    const value = e.target.value;
    if (value === book.shelf || value === "none") {
      return;
    }
    const updatedBook = { ...book, shelf: value };
    handleMove(updatedBook);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${
              book.imageLinks.smallThumbnail && book.imageLinks.smallThumbnail
            })`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={onMove}>
            <option value="none">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors.map((author) => (
        <div key={author} className="book-authors">
          {author}
        </div>
      ))}
    </div>
  );
};

export default Book;
