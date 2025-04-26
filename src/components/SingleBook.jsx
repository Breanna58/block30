import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleBook({ token }) {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message); // Handle the error and set the error message
        setLoading(false); // Set loading to false after an error occurs
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p>Error loading book details: {error}</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>id: {book.id}</p>

      {token && (
        <button onClick={() => alert('Proceed to Checkout')}>Checkout</button>
      )}
    </div>
  );
}

export default SingleBook;
