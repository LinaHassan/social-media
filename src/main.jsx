import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import Posts from "./components/Posts";
import NewPost from "./components/NewPost";
import Comments from "./components/Comments" 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      {
        path: "/Profile",
        element: <Posts/>,
        children: [
          {
            path: "/Profile/create-post",
            element: <NewPost />,
        
          },
       
        ],
      },
      {
        path: "/Comments/:id",
        element: <Comments />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
