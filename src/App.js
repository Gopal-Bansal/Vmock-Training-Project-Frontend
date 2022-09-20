import './App.css';
import Register from './components/Register'
import Login from './components/Login';
import { removeUsers } from './Reducer/userSlice';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import HomePage from './components/HomePage';
import DashBoard from './components/Dashboard';
import VerifyEmail from './components/VerifyEmail';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserTab from './components/UserTab';
import UserTask from './components/UserTask';
import AdminTab from './components/AdminTab';
import AdminTask from './components/AdminTask';
import { logout } from './Reducer/userSlice';
import Profile from  './components/Profile';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {addNotifs} from './Reducer/NotificationSlice';

import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.users);
  const notifications = useSelector(state => state.notifications);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(user);
  const handleClick = (event) => {
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
    navigate('/', { replace: true });
}



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  function handleDelete(event,id){
    event.preventDefault();
    axios.delete('http://localhost:8000/notif/'+ id).then(
      (response) => {
        axios.get('http://localhost:8000/listNotifs', {params: {id: user.currentUser.user.id}}).then(
            (response) => {
                console.log('sacsa');
                console.log(response);
                dispatch(addNotifs(response.data));
                console.log('sacsa');
            }
        )
        console.log(response)
    },
    (error) => {
        console.log(error)
    }
    )

  }
  function deleteAll(){
    axios.delete('http://localhost:8000/clear-notif/', {params: {id: user.currentUser.user.id}}).then(
      (response) => {
        axios.get('http://localhost:8000/listNotifs', {params: {id: user.currentUser.user.id}}).then(
            (response) => {
                console.log('sacsa');
                console.log(response);
                dispatch(addNotifs(response.data));
                console.log('sacsa');
            }
        )
        console.log(response)
    },
    (error) => {
        console.log(error)
    }
    )

  }


  function showNotification() {
    handleShow();
    axios.get('http://localhost:8000/listNotifs', {params: {id: user.currentUser.user.id}}).then(
            (response) => {
                console.log('sacsa');
                console.log(response);
                dispatch(addNotifs(response.data));
                console.log('sacsa');
            }
        )
  }



  


 
  return (
    <div className="App">
      <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {notifications.Notifications.map((Notification) => (
            <div className="notif-content">
                <button onClick={(event) => handleDelete(event, Notification.id)} className='notif-delete-button' style = {{marginLeft: 'auto'}}>X</button>
                <p>{Notification.notification}</p>
            </div>
           )) }
           <Button onClick = {(event) => deleteAll(event)}>Clear All</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    {user.currentUser && user.currentUser.user.email_verified_at != null&& <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="DashBoard">DashBoard</Navbar.Brand> 
                    <Nav className="me-auto">
                        <Nav.Link href="Profile">Profile</Nav.Link>
                        {user.currentUser && user.currentUser.user.role === 'normal' && <Nav.Link href="UserTab">UserTab</Nav.Link>}
                        {user.currentUser && user.currentUser.user.role === 'admin' && <Nav.Link href="AdminTab">AdminTab</Nav.Link>}
                        {user.currentUser && user.currentUser.user.role === 'normal' && <Nav.Link href="UserTask">UserTask</Nav.Link>}
                        {user.currentUser && user.currentUser.user.role === 'admin' && <Nav.Link href="AdminTask">AdminTask</Nav.Link>}
                        
                        </Nav>
                        <Nav><Nav.Link onClick={()=>{showNotification()}}>Notifications</Nav.Link>
                        <Nav.Link href="login" onClick={(e)=>{handleClick(e)}}>Logout</Nav.Link>
                        </Nav>
                </Container>
            </Navbar> }
      

        {<div className='col mt-3'>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Register />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/Dashboard" element={<DashBoard />}/>
            <Route exact path='/UserTab' element={<UserTab />} />
            <Route exact path='/AdminTab' element={<AdminTab />} />
            <Route exact path='/UserTask' element={<UserTask />} />
            <Route exact path='/AdminTask' element={<AdminTask />} />
            <Route exact path='/Profile' element={<Profile />} />


            <Route exact path="/PasswordResetRequest" element={<PasswordResetRequest />} />
            <Route path='*' element={
              <h1>This route doesn't exist, please check!</h1>
            } />
            <Route exact path='/email/verify' element={<VerifyEmail />} />
            <Route exact path='/password/reset' element={<PasswordReset />} />
          </Routes>
        </div>}
    </div>
  );
}
export default App;