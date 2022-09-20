import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {showTasks}  from '../Reducer/taskSlice';
import {Accordion, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { computeHeadingLevel } from '@testing-library/react';



export default function UserTask() {
    let task = useSelector(state => state.tasks);
    const [loading, setLoading] = React.useState(false);
    let list;
    const [modalShow, setModalShow] = React.useState(false);
    let user = useSelector(state => state.users);
    const [showAlert, setShowAlert] = useState(false);
    const [show, setShow] = useState({});



    const [showedit, setShowedit] = useState({});

    const setShoweditID = (userID) => {
        setShowedit({ ...showedit, [userID]: true });
    }
    const closeShoweditID = (userID) => {
        setShowAlert(false);
        setShowedit({ ...showedit, [userID]: false });
    }

    const [showupdate, setShowupdate] = useState({});

    const setShowupdateID = (taskID) => {
        setShowupdate({ ...showupdate, [taskID]: true });
    }
    const closeShowupdateID = (taskID) => {
        setShowAlert(false);
        setShowupdate({ ...showupdate, [taskID]: false });
    }
    const dispatch = useDispatch();

    useEffect(() => {

    function handleSubmit() {
        setOpen(false);
        // let config = {
        //     param: {
        //     },
        //     headers: {
        //         Authorization: 'Bearer ' + task.currentTask.access_token,
        //     }
        // }
        
        
        axios.get('http://localhost:8000/tasks/' + user.currentUser.user.id).then(
            (response) => {
                dispatch(showTasks({
                    tasks: response.data, 
                    id: user.currentUser.user.id
                }));
                console.log(task.tasks);
                setOpen(true);
            },
            (error) => {
                console.log(error);
            }
        )
    };
    handleSubmit();
}, [])
    function handleCreate(event) {
        event.preventDefault();
        let title = event.target[0].value;
        let description = event.target[1].value;
        let assigned_to = event.target[2].value;
        let assigned_by = user.currentUser.user.id;
        let due_date = event.target[3].value;
        let data = {
            title, description, assigned_to, due_date, assigned_by
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
    function deletetask(taskid) {
        //event.preventDefault();
         //click karne par execute ho
        let id = taskid;
        let userID= user.currentUser.user.id;
      //  console.log(userID,id)
        let data = {
            userID
        }
        axios.post('http://localhost:8000/delete/' + id,data).then(
            (response) => {
                axios.get('http://localhost:8000/tasks/' + user.currentUser.user.id).then(
            (response) => {
                dispatch(showTasks({
                    tasks: response.data, 
                    id: user.currentUser.user.id
                }));
                console.log(task.tasks);
                setOpen(true);
            },
            (error) => {
                console.log(error);
            }
        )
            },
            (error) => {
                console.log(error)
            }
        )
    }
    function edittask(event,taskid) {
        event.preventDefault();  //click karne par execute ho
        let id = taskid;
        let title = event.target[0].value;
        let description = event.target[1].value;
        let due_date = event.target[2].value;
        let userID= user.currentUser.user.id;
        let data = {
            userID,title, description, due_date
        }
        axios.post('http://localhost:8000/edittask/' + id, data).then(
            (response) => {
                axios.get('http://localhost:8000/tasks/' + user.currentUser.user.id).then(
            (response) => {
                dispatch(showTasks({
                    tasks: response.data, 
                    id: user.currentUser.user.id
                }));
                console.log(task.tasks);
                setOpen(true);
            },
            (error) => {
                console.log(error);
            }
        )
            },
            (error) => {
                console.log(error)
            }
        )
    }
    const filtertask = (event) => {
        event.preventDefault();
        setLoading(true);
        let field = event.target[0].value;
        let value = event.target[1].value;
        
        axios.get('http://localhost:8000/filtertask/' + field + '/' + value + '/' +user.currentUser.user.id).then(
            (response) => {
                dispatch(showTasks({
                    tasks: response.data, 
                    id: user.currentUser.user.id
                }));
            }
        )
     
}
const searchtask = (event) => {
    event.preventDefault();
    setLoading(true);
    let field = event.target[0].value;
 
    axios.get('http://localhost:8000/searchtask/' + field +'/'+user.currentUser.user.id).then(
        (response) => {
            dispatch(showTasks({
                tasks: response.data, 
                id: user.currentUser.user.id
            }));
        setLoading(false);    
        }
    )
 
}

const [order, setOrder] = React.useState('None');
    const [sort, setSort] = React.useState("");
    function sortTask(event){
        event.preventDefault();
        setLoading(true);
       
        if (order != 'None' && sort != ""){
            console.log(sort);
            console.log(order);
            axios.get('http://localhost:8000/sorttask/' + sort + '/' + order +'/'+user.currentUser.user.id).then(
                    (response) => {
                        // console.log(response.data);
                    setSort("");
                    setOrder('None');
                    setLoading(false);

                dispatch(showTasks({
                    tasks: response.data, 
                    id: user.currentUser.user.id
                }));
            }
        )
     
}

    }
    function updatetask(event,taskid) {
        event.preventDefault();  //click karne par execute ho
        let id = taskid;
        let status = event.target[0].value;
        let userID= user.currentUser.user.id;
        console.log(userID,id)
        let data = {
            userID,status
        }
        axios.post('http://localhost:8000/updatetask/' + id, data).then(
            (response) => {
                axios.get('http://localhost:8000/tasks/' + user.currentUser.user.id).then(
            (response) => {
                dispatch(showTasks({
                    tasks: response.data, 
                    id: user.currentUser.user.id
                }));
                console.log(task.tasks);
                setOpen(true);
            },
            (error) => {
                console.log(error);
            }
        )
            },
            (error) => {
                console.log(error)
            }
        )
    }


    const [open, setOpen] = useState(false);
     return (
        <div>

<div className = "Search Task">
        <form onSubmit = {searchtask}>
                <input type = 'search' placeholder = 'Search'/>
                <button type = 'submit'>Search</button>
            </form>
        </div>

            <form onSubmit = {filtertask}>
                <input type = 'field' placeholder = 'Filter by'/>
                <input type = 'value' placeholder = 'Value'/>
                <button type = 'submit'>Filter</button>
            </form>
        
        
        
                 <div className = "sorting2">
         <DropdownButton
      align="end"
      title="Sort by"
      id="dropdown-menu-align-end"
      size = "sm"
    >
      {/* <Dropdown.Menu> */}
        <Dropdown.Item onClick = {() => setSort('id')}>Id</Dropdown.Item>
        <Dropdown.Item onClick = {() => setSort('title')}>Title</Dropdown.Item>
        <Dropdown.Item onClick = {() => setSort('assigned_by')}>Assigned_by</Dropdown.Item>
        <Dropdown.Item onClick = {() => setSort('asigned_to')}>Assigned_to</Dropdown.Item>
      {/* </Dropdown.Menu> */}
    {/* </Dropdown> */}
    </DropdownButton>
    <DropdownButton
      align="end"
      title="Order"
      id="dropdown-menu-align-end"
      size = "sm"
    >
      {/* <Dropdown.Menu> */}
        <Dropdown.Item onClick = {() => setOrder('asc')}>Ascending</Dropdown.Item>
        <Dropdown.Item onClick = {() => setOrder('desc')}>Descending</Dropdown.Item>
      {/* </Dropdown.Menu> */}
    {/* </Dropdown> */}
    </DropdownButton>
    <Button size = "sm" onClick = {(event) => sortTask(event)}>Sort</Button>
    
            <table className='table'>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Assigned by</th>
                    <th>Assigned to</th>
                    <th>Status</th>
                    <th>Delete Task</th>
                    <th>Edit Task</th>
                    <th>Update Task Status</th>
                </tr>
                {task.tasks.map((task) => (
                    <tr>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.due_date}</td>
                        <td>{task.assigned_by}</td>
                        <td>{task.assigned_to}</td>
                        <td>{task.status}</td>
                        <td><Button style={{ backgroundColor: '#0000FF', color: 'FFFFFF' }} onClick={() => { deletetask(task.id) }}>Delete Task</Button></td>
                        <td><Button style={{ backgroundColor: '#0000FF', color: 'FFFFFF' }} onClick={() => { setShoweditID(task.id) }}>Edit Task</Button></td>
                        <td><Button style={{ backgroundColor: '#0000FF', color: 'FFFFFF' }} onClick={() => { setShowupdateID(task.id) }}>Update Status</Button></td>

                        <Modal show={showedit[task.id]} onHide={() => { closeShoweditID(task.id) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={(event) => { edittask(event,task.id) }}>
                                <label for="Title">Title</label><br />
                                    <input type="text" id="Title" name="Title" /><br />
                                    <label for="Description">Description</label><br />
                                    <textarea type="text" rows="5" columns="1" id="Description" name="Description" size="40" height="100" /><br />
                                    <label for="due_date">Due Date</label><br />
                                    <input type="date" id="due_date" name="due_date" /><br />
                                  
                                    {showAlert && <p>Oops, Please fill all the details pal</p>}
                                    <button type='submit'>Edit</button>
                                </form>
                            </Modal.Body>
                        </Modal>
                        <Modal show={showupdate[task.id]} onHide={() => { closeShowupdateID(task.id) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={(event) => { updatetask(event,task.id) }}>
                                    <label for="Status">Status</label><br />
                                    <input type="text" id="Status" name="Status" /><br />
                                    {showAlert && <p>Oops, Please fill all the details pal</p>}
                                    <button type='submit'>Update</button>
                                </form>
                            </Modal.Body>
                        </Modal>
                    </tr>

                ))}

            </table>

        </div>
        </div>

    )
}
