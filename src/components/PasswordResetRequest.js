import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom';
function PasswordResetRequest(){
    const navigate = useNavigate();
    function handleClick(event){
        event.preventDefault();
        let email = event.target[0].value;
        let data = {
            email,
        }
        axios.post('http://localhost:8000/password/reset-request', data);
        navigate('/', {replace: true});
    }
    return (
        <form onSubmit = {handleClick}>
            <h3>Please enter your email-id</h3>
            <input type = 'email' placeholder = 'Email'/>
            <button type = 'submit'>Submit</button>
        </form>
    )
}
export default PasswordResetRequest;