import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Reducer/userSlice';
import taskReducer from './Reducer/taskSlice';
import notificationReducer from './Reducer/NotificationSlice';
const store = configureStore({
    reducer: {
        users: userReducer,
        tasks: taskReducer,
        notifications: notificationReducer,
    }
})
export default store;