import axios from 'axios';
import React from 'react';
function VerifyEmail(){
    const urlToken = new URL (window.location.href);
    const Token = urlToken.searchParams.get('token');
    //console.log(Token);
    let config = {
        param:{
            /*token: Token,*/
        },
        headers: {
            Authorization: 'Bearer ' +  Token,
        }
    }
    /*let data={
        token: Token,
    }*/
    axios.post('http://localhost:8000/email/verify', null,config).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    )
    return (
        <div>
            <h1>Yay! Email Verified</h1>
        </div>
    )
}
export default VerifyEmail;