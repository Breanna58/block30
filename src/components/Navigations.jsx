/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */ 
import { Link } from "react-router-dom"; 



//CREATE COMPONENT 

//RENDER 3 LINKS (HOME/BOOKS/USERS)


function Navigations () {

return(
<>
<a href='/Home'>Home</a>
<a href='/Books'>Book</a>
<a href='/Users'>User</a>
<a href='/LoginForm'>loginForm</a>
<a href='RegistrationForm'>RegistrationForm</a>
</>



)




}

export default Navigations