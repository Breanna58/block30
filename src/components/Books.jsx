import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'; 

const LibraryBooks = () => {
    const [books, setBooks] = useState([]); 
    const history = useHistory();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books'); 
                const data = await response.json(); 
                setBooks(data); 
            } catch (error) {
                console.error('Error getting books:', error); 
            }
        }; 

        fetchBooks(); 
    }, []); 

    const handleBookClick = (bookId) => {
        history.push(`/book/${bookId}`); 
    }; 

    return (
        <div>
            <h2>Library Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id} onClick={() => handleBookClick(book.id)}>
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    ); 
}; 

export default LibraryBooks;
