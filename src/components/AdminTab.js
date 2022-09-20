import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers} from '../Reducer/userSlice';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';

export default function AdminTab(){
   // let user = useSelector(state => state.users);
    const [modalShow, setModalShow] = React.useState(false);
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

    const [showcreate, setShowcreate] = useState({});

    const setShowcreateID = (userID) => {
        setShowcreate({...showcreate, [userID]: true});
    }
    const closeShowcreateID = (userID) => {
        setShowAlert(false);
        setShowcreate({...showcreate, [userID]: false});
    }

    const [showupdate, setShowupdate] = useState({});

    const setShowupdateID = (userID) => {
        setShowupdate({...showupdate, [userID]: true});
    }
    const closeShowupdateID = (userID) => {
        setShowAlert(false);
        setShowupdate({...showupdate, [userID]: false});
    }
    
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
        axios.get('http://localhost:8000/users', null, config).then (
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
    function handleCreate(event){
        event.preventDefault();
        let name = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;
        let role = event.target[3].value;
        let data = {
            name, email, password, role
        }
        let config = {
            param: {
            },
            headers: {
                Authorization: 'Bearer ' + user.currentUser.access_token,
            }
        }
        axios.post('http://localhost:8000/user', data). then (
            (response) => {
                axios.get('http://localhost:8000/users', null, config).then (
            (response) => {
                dispatch(showUsers(response.data));
                console.log(user.users);
            }
        )
    },
            (error) => {
                console.log(error);
            }
        )
        
    };
    function deleteUser(Id){
        //event.preventDefault();
        let config = {
            param: {
            },
            headers: {
                Authorization: 'Bearer ' + user.currentUser.access_token,
            }
        }
        axios.post("http://localhost:8000/deleteuser/" + Id,  null, config)
        .then(
            (response) => {
                axios.get('http://localhost:8000/users', null, config).then (
            (response) => {
                dispatch(showUsers(response.data));
                console.log(user.users);
            }
        )
    },
            (error) => {
                console.log(error);
            }
        )
        
    };
    function updateUser(event,userID){
        event.preventDefault();
        
        let id = userID;
        let name = event.target[0].value;
        
        let data = {
            name
        }
        console.log(name);
        axios.post("http://localhost:8000/updateuser/" + id, data). then(
            (response) => {
                console.log(response);

            },
            (error) => {
                console.log(error);
            }
        )
    }
    function handleCreatetask(event, userID) {
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
    const [open, setOpen] = useState(false);

    return (
        <div>
        <Button style = {{backgroundColor: '#0000FF', color: 'FFFFFF'}} onClick = {() => {setShowcreateID(user.currentUser.user.id)}}>Create User</Button>
        <Modal show={showcreate[user.currentUser.user.id]} onHide= {() => {closeShowcreateID(user.currentUser.user.id)}}>
        <Modal.Header closeButton>
          <Modal.Title>New User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(event) => {handleCreate(event)}}>
                        <label for="Name">Name</label><br/>
                            <input type="text" id="Name" name="Name" /><br/>
                            <label for="Email">Email</label><br/>
                            <input type="text"  id= "Email" name = "Email"/><br/>
                            <label for="Password">Password</label><br/>
                            <input type="Password" id="Password" name="Password" /><br/>
                            <label for="Role">Role</label><br/>
                            <input type="Role" id="Password" name="Role" /><br/>
                            {showAlert && <p>Oops, Please fill all the details pal</p>}
                            <button type='submit'>Create</button>
                        </form>
        </Modal.Body>
      </Modal>
            <table className = 'table'>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Role</th>
        <th>Assign Task</th>
        {/* <th>Create User</th> */}
        <th>Delete User</th>
        <th>Edit User</th>
    </tr>
    {user.users.map((user) => (
        <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.role}</td>
        <td><Button style = {{backgroundColor: '#0000FF', color: 'FFFFFF'}} onClick = {() => {setShowID(user.id)}}>Assign Task</Button></td>
        {/* <td><Button style = {{backgroundColor: '#0000FF', color: 'FFFFFF'}} onClick = {() => {setShowcreateID(user.id)}}>Create User</Button></td> */}
        <td><Button style = {{backgroundColor: '#0000FF', color: 'FFFFFF'}} onClick = {() => {deleteUser(user.id)}}>Delete User</Button></td>
        <td><Button style = {{backgroundColor: '#0000FF', color: 'FFFFFF'}} onClick = {() => {setShowupdateID(user.id)}}>Edit User</Button></td>

        <Modal show={show[user.id]} onHide= {() => {closeShowID(user.id)}}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(event) => {handleCreatetask(event, user.id)}}>
                        <label for="Title">Title</label><br/>
                            <input type="text" id="Title" name="Title" /><br/>
                            <label for="Description">Description</label><br/>
                            <textarea type="text" rows = "5" columns = "10" id="Description" name="Description" size = "40" height = "100"/><br/>
                            <label for="due_date">Due Date</label><br/>
                            <input type="date" id="due_date" name="due_date" /><br/>
                            {showAlert && <p>Oops, Please fill all the details pal</p>}
                            <button type='submit'>Create</button>
                        </form>
        </Modal.Body>
      </Modal>
      
      <Modal show={showupdate[user.id]} onHide= {() => {closeShowupdateID(user.id)}}>
        <Modal.Header closeButton>
          <Modal.Title>New Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(event) => {updateUser(event,user.id)}}>
                            <label for="name">Name</label><br/>
                            <input type="text" id="name" name="name" /><br/>
                            {showAlert && <p>Oops, Please fill all the details pal</p>}
                            <button type='submit'>Edit</button>
                        </form>
        </Modal.Body>
      </Modal>
        </tr>
            
        ))}

</table>
        {/* <Accordion>
        <Accordion.Item eventKey= "Create User">
            <Accordion.Header>Create User</Accordion.Header>
            <Accordion.Body>
            <form onSubmit = {handleCreate}>
                <input type = 'name' placeholder = 'Name' /><br/>
                <input type = 'email' placeholder = 'Email'  /><br/>
                <input type = 'password' placeholder = 'Password'  /><br/>
                <input type = 'role' placeholder = 'Role' /><br/>
                <button type ='submit'>Create</button>
            </form>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        <Accordion>
        <Accordion.Item eventKey = "Users">
        <Accordion.Header onClick={handleSubmit}>Show Users</Accordion.Header>
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
        <Accordion.Item>
            <Accordion.Header>Delete User</Accordion.Header>
            <Accordion.Body>
                <form onSubmit = {deleteUser}>
                    <input type = 'number' placeholder = 'Id'/>
                    <button type = 'submit'>Delete</button>
                </form>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
            <Accordion.Header onClick = {() => setModalShow(true)}>Update User</Accordion.Header>
            <Accordion.Body>
            <Modal show={modalShow}
        onHide = {() => setModalShow(false)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit = {updateUser}>
            <h6>Please input the Id of the user you wish to update</h6>
            <input type = 'number' placeholder = 'Id'/><br/>
            <input type = 'name' placeholder = 'Name'/><br/>
            <button type = 'submit'>Update</button>
        </form>
      </Modal.Body>
        </Modal>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion> */}
        </div>
    )
}