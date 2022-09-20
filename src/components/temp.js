<Accordion className="temp1">
                <Accordion.Item eventKey="Show all tasks">
                    <Accordion.Header onClick={handleSubmit()}>Show all tasks</Accordion.Header>
                    <Accordion.Body>
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
        </div>
        
        
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
    </div>
                        {open && task.tasks.map((task) => (
                            <Accordion className="temp1" key={task.id}>
                                <Accordion.Item eventKey={JSON.stringify(task.id)}>
                                    <Accordion.Header>{task.id}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Id = {task.id}</p>
                                        <p>Title = {task.title}</p>
                                        <p>Description = {task.description}</p>
                                        <p>Assigned_to = {task.assigned_to}</p>
                                <p>Assigned_by = {task.assigned_by}</p>
                                <p>Status = {task.status}</p>
                                        {/* <p>Assigned_by = {task.assigned_by}</p> */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="Create Task">
                    <Accordion.Header>Create Task</Accordion.Header>
                    <Accordion.Body>
                        <form onSubmit={handleCreate}>
                            <input type='text' placeholder='title' /><br />
                            <input type='text' placeholder='description' /><br />
                            <input type='integer' placeholder='assigned_to' /><br />
                            <label for="due_date">Due Date</label>
                            <input type="date" id="due_date" name="due_date" /><br/>
                            <input type='due_date' placeholder='due_date' /><br />
                            <button type='submit'>Create</button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Delete Task">
                    <Accordion.Header>Delete Task</Accordion.Header>
                    <Accordion.Body>
                        <form onSubmit={deletetask}>
                            <input type='integer' placeholder='id' /><br />
                            <button type='submit'>Delete</button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Edit Task">
                    <Accordion.Header>Edit Task</Accordion.Header>
                    <Accordion.Body>
                        <form onSubmit={edittask}>
                            <input type='integer' placeholder='id' /><br />
                            <input type='text' placeholder='title' /><br />
                            <input type='text' placeholder='description' /><br />
                            <label for="due_date">Due Date</label>
                            <input type="date" id="due_date" name="due_date" /><br/>
                            {/* <input type="date" /><br /> */}
                            <button type='submit'>Edit</button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="Update Task Status">
                    <Accordion.Header>Update Task Status</Accordion.Header>
                    <Accordion.Body>
                        <form onSubmit={updatetask}>
                            <input type='integer' placeholder='id' /><br />
                            <input type='text' placeholder='status' /><br />
                            <button type='submit'>Update Status</button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>