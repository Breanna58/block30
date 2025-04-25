/* TODO - add your code to create a functional React component that renders a registration form */



import React, { useState, useEffect } from "react";
//import { useHistory } from 'react-router-dom'; 

const RegistrationForm = () => {
    const [formData, setformData] = useState({
        firstname: "", 
        lastname: "", 
        email: "", 
        password: ""


    }); 

    const [message, setMessage] = useState(""); 
    const [error, setError] = useState(""); 
    
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      setError("");
  
      try {
        const response = await fetch("/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }
  
        const data = await response.json();
        setMessage(data.message || "Registered successfully!");
        // Optional: Save token for later use
        localStorage.setItem("token", data.token);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Register</button>
        </form>
  
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  };
  
  export default RegistrationForm;
    