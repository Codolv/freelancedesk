import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import LandingPage from "./components/LandingPage"
import ProjectDetail from "./components/ProjectDetail"
import SignIn from "./components/SignIn"
import Dashboard from "./components/Dashboard"
import "./index.css"

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/prijects", element: <Dashboard /> },
  { path: "/projects/:id", element: <ProjectDetail /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

