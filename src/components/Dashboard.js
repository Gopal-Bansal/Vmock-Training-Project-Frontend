import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Reducer/userSlice';
import { useSelector } from 'react-redux';
import UserTab from './UserTab';
import UserTask from './UserTask';
import AdminTask from './AdminTask';
import AdminTab from './AdminTab';
import { Tabs, Tab } from 'react-bootstrap';
import { removeUsers } from '../Reducer/userSlice';
import Card from 'react-bootstrap/Card';
import { Chart } from "react-google-charts";
import { showTasks } from '../Reducer/taskSlice'
import Pusher from "pusher-js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {addNotifs} from '../Reducer/NotificationSlice'


//import UserTask from './UserTask';
function DashBoard() {

    const navigate = useNavigate();
    const user = useSelector(state => state.users);
    const task = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    var flag = false;
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
        navigate('/', { replace: true });
    }
    useEffect(() => {
        axios.get('http://localhost:8000/listNotifs', {params: {id: user.currentUser.user.id}}).then(
            (response) => {
                addNotifs(response.data);
            }
        )
    }, [])
    useEffect(() => {

        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('6d8be11722c10dd61b44', {
            cluster: 'ap2'
        });
        console.log("in index.html")

        var channel = pusher.subscribe('my-channel' + user.currentUser.user.id);
        channel.bind('my-event', function (data) {
            alert(JSON.stringify(data));
        });
    }, [])
    useEffect(() => {
        axios.get('http://localhost:8000/tasks').then(
            (response) => {
                console.log(response);
                dispatch(showTasks({
                    tasks: response.data,
                    id: user.currentUser.user.id
                }));
            },
            (error) => {
                console.log(error);
            }
        )
    }, []);




    function handleEmailVerification(event) {
        event.preventDefault();
        let Token = user.currentUser.access_token;
        let config = {
            headers: {
                Authorization: 'Bearer ' + Token,
            }
        }
        axios.post('http://localhost:8000/email/request-verification', null, config).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        )
    }
    const data = [
        ["Status", "Number of tasks"],
        ["Completed", task.completedto],
        ["Assigned", task.assignedto],
        ["In progress", task.inprogressto],
    ];
    const options = {
        title: "Status of tasks assigned to you",
        is3D: true,
        legend: { position: 'right' },
    };
    const data2 = [
        ["Status", "Number of tasks"],
        ["Completed", task.completedby],
        ["Assigned", task.assignedby],
        ["In progress", task.inprogressby],
    ];
    const options2 = {
        title: "Status of tasks assigned by you",
        is3D: true,
        legend: { position: 'left' },
    };

    return (
        <div>
            

            {user.currentUser && user.currentUser.user.email_verified_at != null &&
                <div>
                    {/* { <nav>
                        <button onClick={handleClick}>Logout</button>
                    </nav> } */}
                    <h1>Welcome to your Page!</h1>
                    <div className='chart1'>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            loader={<div>Loading Chart</div>}
                            height={"400px"}
                        />
                    </div>
                    <div className='chart2'>
                        <Chart
                            chartType="PieChart"
                            data={data2}
                            options={options2}
                            width={"100%"}
                            loader={<div>Loading Chart</div>}
                            height={"400px"}
                        />
                    </div>
                    {/* <Tabs defaultActiveKey='Profile'>
                        <Tab eventKey='Profile' title='Profile'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Hello {user.currentUser.user.name}!</Card.Title>
                                    <Card.Text>
                                        Id: {user.currentUser.user.id} <br />
                                        Name: {user.currentUser.user.name} <br />
                                        Email: {user.currentUser.user.email} <br />
                                        Role: {user.currentUser.user.role} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Tab> */}

                        {/* {user.currentUser.user.role === 'normal' && <Tab eventKey='Users' title='Users'>
                            <UserTab />
                        </Tab>
                        }

                        {user.currentUser.user.role === 'admin' && <Tab eventKey='Admin' title='Admin'>
                            <AdminTab />
                        </Tab>
                        }




                        {user.currentUser.user.role === 'normal' && <Tab eventKey='UserTask' title='UserTask'>
                            <UserTask />
                        </Tab>
                        }
                        {user.currentUser.user.role === 'admin' && <Tab eventKey='AdminTask' title='AdminTask'>
                            <AdminTask />
                        </Tab>
                        } */}



                    
                    
                </div>
            }
            {user.currentUser.user.email_verified_at === null &&
                <div>
                    <h1>Please Verify Email and Login again!</h1>
                    {user.currentUser.user.email_verified_at == null && <button onClick={handleEmailVerification}>Verify Email</button>}
                    <h3>If email is alredy verified, please login again.</h3>
                    { <button onClick={handleClick}>Logout</button> }
                </div>
            }
        </div>)
}


export default DashBoard;