import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.scss'
import DefaultPage from './routes/DefaultPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
