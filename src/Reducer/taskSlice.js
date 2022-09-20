import React from 'react';
import {createSlice} from '@reduxjs/toolkit'
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
       completedby: 0,
       inprogressby: 0,
       assignedby: 0,
       completedto: 0,
       assignedto: 0,
       inprogressto: 0,
    },
    reducers: {
        showTasks: (state, action) => {
            console.log(action);
            state.tasks = action.payload.tasks;
            let id = action.payload.id;
            state.completedby = 0;
            state.inprogressby = 0;
            state.assignedby = 0;
            state.completedto = 0;
            state.assignedto = 0;
            state.inprogressto = 0;
            
            state.tasks.map((task) =>
                 {
                     if (task.assigned_by == id && task.status == 'assigned') {
                         state.assignedby = state.assignedby + 1;
                     }
                     if (task.assigned_by == id && task.status == 'in-progress') {
                         state.inprogressby = state.inprogressby + 1;
                     }
                     if (task.assigned_by == id && task.status == 'completed') {
                         state.completedby = state.completedby + 1;
                     }
                     if (task.assigned_to == id && task.status == 'assigned') {
                        state.assignedto = state.assignedto + 1;
                    }
                    if (task.assigned_to == id && task.status == 'in-progress') {
                        state.inprogressto = state.inprogressto + 1;
                    }
                    if (task.assigned_to == id && task.status == 'completed') {
                        state.completedto = state.completedto + 1;
                    }
                 }
             )
        },
        removeTasks: (state, action) => {
            state.tasks = []
        },
    }
});
const { actions, reducer } = taskSlice
export const {showTasks, removeTasks} = actions;
export default reducer;