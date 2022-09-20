import axios from 'axios';
import React, {useState} from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers} from '../Reducer/userSlice';
import {Accordion, Button, Modal} from 'react-bootstrap';

export default function UserTab(){
    let user = useSelector(state => state.users);
    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState({});

    const setShowID = (userID) => {
        setShow({...show, [userID]: true});
    }

    const closeShowID = (userID) => {
        setShowAlert(false);
        setShow({...show, [userID]: false});
    }

    console.log(user);
    let list;
    const dispatch = useDispatch();

    useEffect (() => {
        function handleSubmit(){
            let config = {
                param: {
                },
                headers: {
                    Authorization: 'Bearer ' + user.currentUser.access_token,
                }
            }
            axios.get('http://localhost:8000/users', config).then (
                (response) => {
                    dispatch(showUsers(response.data));
                    console.log(user.users);
                },
                (error) => {
                    console.log(error);
                }
            )
        };

        handleSubmit();
    }, [])
    // function handleSubmit(event){
    //     event.preventDefault();
    //     let config = {
    //         param: {
    //         },
    //         headers: {
    //             Authorization: 'Bearer ' + user.currentUser.access_token,
    //         }
    //     }
    //     axios.get('http://localhost:8000/users', config).then (
    //         (response) => {
    //             dispatch(showUsers(response.data));
    //             console.log(user.users);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     )
    // }
    const [open, setOpen] = useState(false);




    function handleCreate(event, userID) {
        event.preventDefault();
        let title = event.target[0].value;
        let description = event.target[1].value;
        let assigned_to = userID;
        let assigned_by = user.currentUser.user.id;
        let due_date = event.target[2].value;
        let data = {
            title, description, assigned_to, due_date, assigned_by
        }
        if (title == '' || description == '' || due_date == ''){
            setShowAlert(true);
        }
        axios.post('http://localhost:8000/createtask', data).then(
            (response) => {
                console.log(response)
            },
            (error) => {
                console.log(error)
            }
        )
    }
    return (
        <div>
        {/* <Accordion>
        <Accordion.Item eventKey = "Show all users">
        <Accordion.Header onClick = {handleSubmit}>Show all users</Accordion.Header>
        <Accordion.Body>
        {user.users.map((user) => (
        <Accordion key = {user.id}>
        <Accordion.Item eventKey= {JSON.stringify(user.id)}>
            <Accordion.Header>{user.id}</Accordion.Header>
            <Accordion.Body>
            <p>ID = {user.id}</p>
            <p>Name = {user.name}</p>
            <p>Email = {user.email}</p>
            <p>Role = {user.role}</p>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        ))}
</Accordion.Body>
</Accordion.Item>
</Accordion> */}
<table className = 'table'>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Role</th>
        
        <th>Actions</th>
    </tr>
    {user.users.map((user) => (
        <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.role}</td>
        <td><Button style = {{backgroundColor: '#0000FF', color: 'FFFFFF'}} onClick = {() => {setShowID(user.id)}}>Assign Task</Button></td>
        <Modal show={show[user.id]} onHide= {() => {closeShowID(user.id)}}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(event) => {handleCreate(event, user.id)}}>
                        <label for="Title">Title</label><br/>
                            <input type="text" id="Title" name="Title" /><br/>
                            <label for="Description">Description</label><br/>
                            <textarea type="text" rows = "5" columns = "1" id="Description" name="Description" size = "40" height = "100"/><br/>
                            {/* <input type='text' placeholder='title' /><br />
                            <input type='text' placeholder='description' /><br />
                            <input type='integer' placeholder='assigned_to' /><br /> */}
                            <label for="due_date">Due Date</label><br/>
                            <input type="date" id="due_date" name="due_date" /><br/>
                            {/* <input type='due_date' placeholder='due_date' /><br /> */}
                            {showAlert && <p>Oops, Please fill all the details pal</p>}
                            <button type='submit'>Create</button>
                        </form>
        </Modal.Body>
      </Modal>
        </tr>
            
        ))}

</table>
        </div>
    )
}
