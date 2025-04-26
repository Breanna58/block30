import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setBooks(data.books || []);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleReturn = async (bookId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}/return`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Return failed.");
      }

      alert("Book returned successfully!");
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) {
    return (
      <div>
        <p>Please log in or create an account to view your account details.</p>
        <button onClick={() => navigate("/login")}>Log In</button>
        <button onClick={() => navigate("/register")}>Create Account</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.firstName} {user.lastName}!</h2>
      <p>Email: {user.email}</p>
      <h3>Books you have checked out:</h3>

      {books.length === 0 ? (
        <p>You haven't checked out any books yet.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
              <button onClick={() => handleReturn(book.id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
