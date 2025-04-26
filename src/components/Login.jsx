import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginForm = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate input
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError(""); 
    setLoading(true); 

    try {
      // Send login request to the API
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),  // Sending
