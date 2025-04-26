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
        
    }); 
        
        const data = await  response.json();  

        if (!response.ok) {
            throw new Error(data.message || "Login failed."); 

        }


        //token to local storage 
        localStorage.setItem("token", data.token); 
     


        navigate("/books"); 
     } catch (err) {
        setError(err.message); 


     } finally {

        setLoading(false)

     }
     }; 

     return  (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
 {error && <p style ={{ color: "red"}}>{error}</p>}
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
   
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}

/>

<button type="submit" disabled={loading}>
    {loading ? "Logging in..." : "Login"}

     </button>


        </form>
     ); 

     }; 

     export default LoginForm; 