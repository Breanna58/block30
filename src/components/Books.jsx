import React, { useEffect, useState } from "react";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

function LibraryBooks() {
  const [books, setBooks] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();
        console.log("Books Data:", result); 

        setBooks(result || []);  
        setLoading(false);

        (result);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCheckout = async (bookId) => {
    const token = localStorage.getItem("token"); 
        if (!token) {
            alert ("please log in to check out a book."); 
            return; 
        }
        try {

            const response = await fetch(`${API_URL}/books/${bookId}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`, 

                }, 

            }); 

            const data = await response.json(); 
            if (!response.ok) {

                throw new Error(data.message || "Checkout failed."); 


            }
            alert(`Succesfully checked out book ID: ${bookId}`); 
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, available: false } : book
        )
          
        ); 

     } catch (err) {
        console.error("Checkout error:", err); 
        alert(err.message); 


        }
    }; 

  

  // Filter books based on search term
  const filteredBooks = searchTerm
  ? books.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  : books; 

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books: {error}</p>;

  return (
    <div>
      <h2>Library Books</h2>
      <input
        type="text"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredBooks.length === 0 ? (
          <p>No books found matching your search.</p>
        ) : (
          filteredBooks.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.description}</p>
              {book.available ? (
<button onClick={()=> handleCheckout(book.id)}>Checkout</button>

              ):(
                <p>Not Available</p>
              )}    
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default LibraryBooks;
