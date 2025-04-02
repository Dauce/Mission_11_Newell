import { useEffect, useState } from 'react';
import { Book } from '../types/Books';
import { useNavigate } from 'react-router-dom';

function BookList({
  selectedCategories,
  sortByTitle,
}: {
  selectedCategories: string[];
  sortByTitle?: boolean;
}) {
  const [Books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories.map(
        (cat) => `bookTypes=${encodeURIComponent(cat)}`
      );

      const response = await fetch(
        `http://localhost:4000/Book?pageSize=${pageSize}&pageNum=${pageNum}&${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();

      let sortedBooks = data.books;

      if (sortByTitle) {
        sortedBooks = [...sortedBooks].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }

      setBooks(sortedBooks);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, selectedCategories, sortByTitle]);

  return (
    <>
      {Books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn} Individuals Served
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {b.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
