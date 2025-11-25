import { combineReducers } from "redux";
import LoginReducer from "./reducers/auth/Login";
import registerReducer from "./reducers/auth/register";
import createTaskReducer from "./reducers/task/createTask";
import updateTaskReducer from "./reducers/task/updateTask";
import deleteTaskReducer from "./reducers/task/deleteTask";
import getTaskByIdReducer from "./reducers/task/getTask";
import getTasksReducer from "./reducers/task/taskList";
import CreateProjectReducer from "./reducers/project/createProject";
import GetProjectsReducer from "./reducers/project/getProjects";
import DeleteProjectReducer from "./reducers/project/deleteProject";
import UpdateProjectReducer from "./reducers/project/updateProject";
import GetProjectReducer from "./reducers/project/getProjectById";
import getDashboardReducer from "./reducers/getDashboard";
import getProfilesReducer from "./reducers/auth/userList";

export default combineReducers({
    registerReducer,
    LoginReducer,
    getProfilesReducer,

    getTasksReducer,
    updateTaskReducer,
    createTaskReducer,
    getTaskByIdReducer,
    deleteTaskReducer,

    CreateProjectReducer,
    GetProjectsReducer,
    UpdateProjectReducer,
    DeleteProjectReducer,
    GetProjectReducer,

    getDashboardReducer
})