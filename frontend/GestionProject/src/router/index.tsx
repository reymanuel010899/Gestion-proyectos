import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/signup";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/project/ProjectsPage";
import TasksPage from "@/pages/task/TasksPage";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/sign-in"
        element={
          <SignIn />
        }
      />
      <Route
        path="/sign-up"
        element={
          <SignUp />
        }
      />
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/projects" element={<ProjectsPage />} />

    </>
  )
);