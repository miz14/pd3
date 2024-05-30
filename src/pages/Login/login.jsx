import { useEffect, useState } from "preact/hooks"
import { useDispatch, useSelector } from "react-redux"
import { logout, login } from "../../store/auth_slice"
import { useNavigate } from "react-router-dom"
import style from './login.module.scss'

const Login = () => {

    const [register, set_register] = useState()

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // console.log([auth.token, auth.name])



    useEffect(() => {
        console.log([auth.name, auth.token])
    }, [])


    const formSubmit = () => {
        dispatch(login({ token: "token", name: "name" }))
        navigate("/tasks")
    }

    return (
        <div className={style.login}>
            <div className={style.form}>
                {auth.name != null ?
                    <>
                        <h2>Вы уже авторизованы. Хотите выйти?</h2>
                        <div className={style.buttons}>
                            <button onClick={() => dispatch(logout())}>Да</button>
                            <button>Нет. На главную</button>
                        </div>
                    </>
                    :
                    <>

                        {register ?
                            <>
                                <h2>Вход</h2>
                                <input type="text" placeholder="логин"></input>
                                <input type="text" placeholder="пароль"></input>
                                <div onClick={() => set_register(true)}>Регистрация</div>
                            </>
                            :
                            <>
                                <button onClick={() => set_register(false)}>Назад</button>
                                <input value='mail' type="text" placeholder="почта"></input>
                                <input type="text" placeholder="логин"></input>
                                <input type="text" placeholder="пароль"></input>
                                <label>Преподаватель?</label>
                                <input type="text" placeholder="Группа"></input>
                                <input type='checkbox'></input>
                            </>
                        }

                        <button onClick={formSubmit}>Подтвердить</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Login