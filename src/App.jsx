import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LibraryBooks from "./components/Books";
import SingleBook from "./components/SingleBook";
import Home from "./components/Home.jsx";
import Users from "./components/Users.jsx";
import LoginForm from "./components/Login.jsx"; 
import RegistrationForm from "./components/Register.jsx";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

function App() {
  const token = localStorage.getItem("token");

  return (
  
      <div>
        <h2>📚 BookBuddy</h2>

        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/books">Books</Link> |{" "}
          <Link to="/users">Users</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<LibraryBooks />} />
          <Route path="/books/:id" element={<SingleBook token={token} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
 
  );
}

export default App;
