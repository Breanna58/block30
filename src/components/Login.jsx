/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from "react"


const LoginForm = () => {
    const [email, setEmail] = useState(""); 
    const [password, SetPassword] = useState(""); 
    const [error, setError] = useState(""); 



}

const handleSubmit = (e) => {

    e.preventDefault(); 
    if (!email || !password) {
        setError("both fields are required"); 
        return; 

    }

    setError(""); 
    console.log("logging in with", {email, password}); 



}; 
export default LoginForm; 