import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibraryBooks from "./components/Books";
import SingleBook from "./components/SingleBook";  // Import the SingleBook component
import Home from "./components/Home.jsx";  
import Users from "./components/Users.jsx";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  <Routes>
  <Route path="/Books" element={<LibraryBooks />} />
  <Route path="/Home" element={<Home />} />
  <Route path="Users" element={<Users />} />
</Routes>

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message); // Make sure to catch and set the error here
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading books: {error}</p>;
  }

  return (
    <div>
      <h2>Library Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
