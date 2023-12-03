import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes
} from "react-router-dom"
import './index.scss'
import HotWorks from './routes/HotWorks'
import Request from './routes/Requset'
import LayoutHeader from './Components/LayoutHeader/layoutHeader'

const nav_links = {
  "proj" : "",
  "hotworks": "",
  "req" : "",
}
const nav_links_keys = Object.keys(nav_links)

function Routs() {
  return (
    <Routes>
      <Route path="/" element={<LayoutHeader/>}>
        <Route path={nav_links_keys[0]} element={<>req</>}/>
        <Route path={nav_links_keys[1]} element={<HotWorks/>}/>
        <Route path={nav_links_keys[2]} element={<Request/>}/>
      </Route>
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routs/>
    </BrowserRouter>
  </React.StrictMode>
)
