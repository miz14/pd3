import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MyTasks from "./pages/MyTasks/my_tasks";
import MainHeader from "./components/MainHeader/main_header";
import Login from "./pages/Login/login";
import Task from "./pages/MyTasks/Task/task";
import HotWorks from "./pages/HotWorks/hotworks";
import Requests from "./pages/Requests/requests";

const NavigationRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<Navigate to="/tasks" replace />} />
            <Route path='login' element={<Login/>}/>
            <Route path="/" element={<MainHeader/>}>
                <Route path='tasks' element={<MyTasks/>}>
                    <Route path=':id'
                        element={<Task/>}
                    />
                </Route>
                <Route path='hotworks' element={<HotWorks/>}/>
                <Route path='requests' element={<Requests/>}/>
            </Route>
        </>
    )
)

export default NavigationRouter