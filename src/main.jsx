// import { render } from 'preact'
import React from 'preact/compat'
import './index.css'
import NavigationRouter from './navigation'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/index'

// render(
//     <React.StrictMode>
//         <RouterProvider router={Navigation}/>
//   </React.StrictMode>, 

//   document.getElementById('app')
// )

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={NavigationRouter}/>
      </Provider>
    </React.StrictMode>,
  )
  