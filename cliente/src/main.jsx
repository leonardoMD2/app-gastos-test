import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainContainer, Post} from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />
  },{
    path: "/POST",
    element: <Post />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
