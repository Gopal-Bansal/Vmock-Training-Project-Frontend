import '../App.css';

import { removeUsers } from '../Reducer/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Reducer/userSlice';


import { useSelector } from 'react-redux';

function Logout() {
  const user = useSelector(state => state.users);
  // console.log(user);
  const navigate = useNavigate();
    const dispatch = useDispatch();
  function handleClick(event) {
    let token = user.currentUser.access_token;
    console.log(token);
    event.preventDefault();
    let config = {
        params: {},
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    axios.post('http://localhost:8000/logout', token, config).then(
        (response) => {
            console.log(response);
            dispatch(logout());
            dispatch(removeUsers());
            localStorage.removeItem('user');
        },
        (error) => {
            console.log(error);
        }
    )
    return navigate('/', { replace: true });
}
}
export default Logout;