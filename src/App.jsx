import { useEffect, useState } from "react";
import bookLogo from "./assets/books.png";
import LibraryBooks from "./components/Books.jsx"; 

import Navigations from "./components/Navigations.jsx"; 
import { Routes, Route } from "react-router-dom";



const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
<Routes>
<Route path= "/books" element= {<LibraryBooks />} />
  <Route path='/Home' element={<Home />}/>
  <Route path='/users'  element={<users />}/>


</Routes>




       <Navigations></Navigations> //render NAVATIONS 
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
   
    <LibraryBooks></LibraryBooks> //  render lIB BOOKS
   
     
    </>
  );
}

export default App;
