import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
function Register () {
    const navigate = useNavigate();
    function handleClick(event){
        event.preventDefault();
        let name = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;
        let data = {
            name, email, password
        };
        
        axios.post('http://localhost:8000/user',data)
         .then(
            // console.log('cas'),
             (response) => {
                navigate('/Login', {replace:true});
             },
             (error) => {
                 console.log(error);
             });
        
    }
        return (
            <div>
            <form className="register" onSubmit = {handleClick}>
                <div>Register</div><br/>
                <input type = 'name' placeholder = 'Name' /><br/>
                <input type = 'email' placeholder = 'Email'  /><br/>
                <input type = 'password' placeholder = 'Password'  /><br/><br/>
                <button type ='submit'>Register</button>
                <br/>
                <h4>Already have an account?</h4>
                <Link to = "/login">Login</Link>
            </form>
            </div>
        )
}
export default Register;