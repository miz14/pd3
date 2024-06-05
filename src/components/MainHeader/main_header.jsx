import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import style from './main_header.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/auth_slice"
import USER_TYPE from "../../constant/user_types"
import { useCallback } from "preact/hooks"
import classNames from "classnames"
const MainHeader = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const location = useLocation()
    // console.log('/tasks' location.pathname)

    const navigate = useNavigate()
    return (
        <>
            <header className={style.container}>
                <NavLink to='/tasks' className={useCallback(({isActive}) => classNames(style.navitem, isActive? style.navitem_active : null))}>Мои задания</NavLink>
                <NavLink to='/hotworks' className={useCallback(({isActive}) => classNames(style.navitem, isActive? style.navitem_active : null))}>
                    Горящие работы
                </NavLink>
                <NavLink to='/requests' className={useCallback(({isActive}) => classNames(style.navitem, isActive? style.navitem_active : null))}>
                    Запросы
                </NavLink>
                {auth.token === null ?
                    <div className={style.navitem} onClick={() => navigate("/login")}>Вход</div>
                    :
                    <div className={style.navitem} onClick={() => dispatch(logout())}>Выход</div>
                }
            </header>
            <Outlet />
        </>
    )
}

export default MainHeader
