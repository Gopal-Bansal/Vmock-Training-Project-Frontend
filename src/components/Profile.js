import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'


function Profile(){
    const navigate = useNavigate();
    const user = useSelector(state => state.users);
    return (
        <div>
            

            {user.currentUser && user.currentUser.user.email_verified_at != null &&
                <div>
                    {/* { <nav>
                        <button onClick={handleClick}>Logout</button>
                    </nav> } */}
                    {/* <h1>Welcome to your Page!</h1>
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
                    </div> */}
                    <Tabs defaultActiveKey='Profile'>
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
                        </Tab>

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



                    </Tabs>

                </div>
            }
                    </div>)

}
export default Profile;