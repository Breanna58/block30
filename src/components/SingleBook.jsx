/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 






function SingleBook  ({token})  {
  const { id: bookId } = useParams(); // Extract `id` from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {

       const fetchBook = async ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}')
       .then((response) => response.json())
       .then((data) => {
        setBook(data); 
        setLoading(false); 
       })

       .catch((err) => {
        setError(err); 
        setLoading(false); 


       }); 

    }, [bookId]); 

    if (loading) {
        return <p>Loading.....</p>
    }


    if (error) {
        return <p>Error loading book details: {error.message}</p>;
      }
    
      return (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          <p>id: ${book.id}</p>
    
         
          {token && (
            <button onClick={() => alert('Proceed to Checkout')}>Checkout</button>
          )}
        </div>
      );
    }





export default SingleBook; 




