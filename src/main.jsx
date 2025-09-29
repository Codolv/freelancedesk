import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import ProjectDetail from "./components/ProjectDetail"
import "./index.css"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/projects/:id", element: <ProjectDetail /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

