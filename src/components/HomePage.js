import React from 'react';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {


    render() {
        return (
        <div>
            <nav>
                <Link to = '/login'> Login</Link> | {' '}
                <Link to = '/register'> Register</Link> | {' '}
                <Link to = '/PasswordResetRequest'> Forget Password?</Link>
            </nav>
            <h1>Welcome!</h1>
            </div>
        )
    }
}

export default HomePage;
