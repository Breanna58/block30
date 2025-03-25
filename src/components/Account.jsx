import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const UserLogin = () => {
    const [user, setUser] = useState(null); 
    const history = useHistory(); 

    useEffect(() => {
        const fetchUser = async () => {
            try {   
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me');
                if (response.ok) {
                    const data = await response.json(); 
                    setUser(data); 
                } else {
                    setUser(null); 
                }
            } catch (error) {
                console.error("error in user", error);
                setUser(null);
            }
        }; 
        fetchUser();
    }, []);

    if (!user) {
        return (
            <div>
                <p>Please log in or create an account to view your account details.</p>
                <button onClick={() => history.push('/login')}>Log In</button>
                <button onClick={() => history.push('/signup')}>Create Account</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Welcome, {user.firstName} {user.lastName}!</h2>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default UserLogin;
