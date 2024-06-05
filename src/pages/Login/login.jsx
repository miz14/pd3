import { useEffect, useState } from "preact/hooks"
import { useDispatch, useSelector } from "react-redux"
import { logout, login } from "../../store/auth_slice"
import { useNavigate } from "react-router-dom"
import style from './login.module.scss'
import network from "../../network"
import CustomButton from "../../components/CustomButton/custom_button"
import Select from 'react-select'

const Login = () => {

    const [register, set_register] = useState()

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, set_email] = useState('')
    const [password, set_password] = useState('')
    const [button_disabled, set_button_disabled] = useState(true)

    const [user_created, set_user_created] = useState(false)

    const [email2, set_email2] = useState('')
    const [name, set_name] = useState('')
    const [password2, set_password2] = useState('')
    const [selected_group, set_selected_group] = useState(null)
    const [groups, set_groups] = useState()
    const [button_disabled2, set_button_disabled2] = useState(true)



    useEffect(() => {
        if (email != '' && password != '') {
            set_button_disabled(false)
        } else {
            set_button_disabled(true)
        }
    }, [email, password])

    useEffect(() => {
        if (email != '' && password != '' && name != '', selected_group != null) {
            set_button_disabled2(false)
        } else {
            set_button_disabled2(true)
        }
    }, [email2, password2, name, selected_group])

    const accept_register = async () => {
        const data = {
            'email': email2,
            'password': password2,
            'is_active': true,
            'is_superuser': false,
            'is_verified': false,
            'username': name,
            'role_id': 1,
            'group_id': selected_group.id
        }

        network.register(data).then(response => {
            if (response.status === 201) {
                set_register(false)
                set_user_created(true)
            }
        })
    }
    useEffect(async () => {
        if (register) {
            set_email('')
            set_password('')
            network.get_all_group().then(response => {
                set_groups(response.data)
            })
            set_user_created(false)
        } else {
            set_email2('')
            set_password2('')
            set_groups(null)
            set_name('')
            set_selected_group(null)
        }
    }, [register])

    const accept_logout = () => {
        dispatch(logout())
        navigate('/tasks')
    }
    function handleSelect(data) {
        set_selected_group(data)
    }

    const accept_login = async () => {
        const data1 = {
            "username": email,
            "password": password
        }
        network.login(data1).then(response => {
            if (response.status === 200) {
                console.log(response)
                dispatch(login({token: response.data.access_token}))
                network.get_my_data(response.data.access_token).then(response =>
                    {
                        const user_types = {
                            0: 'admin',
                            1: 'teacher',
                            2: 'student'
                        }
                        dispatch(login({
                            id: response.data.id,
                            type: user_types[response.data.role_id],
                            name: response.data.username
                        }))
                        navigate("/tasks")
                    }
                )
            }
        })
    }

    return (
        <div className={style.login}>
            <div className={style.form}>
                {auth.name != null ?
                    <>
                        <h2>Вы уже авторизованы. Хотите выйти?</h2>
                        <div className={style.buttons}>
                            <CustomButton
                                size='small'
                                content="На главную"
                                onClick={() => navigate('/tasks')}
                            />
                            <CustomButton
                                bg_color_id={1}
                                size='small'
                                onClick={accept_logout}
                                content="Подтвердить"
                            />
                        </div>
                    </>
                    :
                    <>

                        {!register ?
                            <>
                                <h2>Вход</h2>
                                <input value={email} onChange={e => set_email(e.target.value)} type="email" placeholder="почта" autoComplete='on'/>
                                <input value={password} onChange={e => set_password(e.target.value)} type="text" placeholder="пароль" autoComplete='on'/>
                                <div className={style.reg} onClick={() => set_register(true)}>Регистрация</div>
                                <div className={style.buttons}>
                                    <CustomButton size='big' onClick={() => navigate('/tasks')} content="На главную" />
                                    <CustomButton bg_color_id={1} size='big' disabled={button_disabled} onClick={accept_login} content="Войти" />
                                </div>
                                {user_created? <div className={style.user_created}>! Пользователь был создан</div> : null}
                            </>
                            :
                            <>
                                <h2>Регистрация</h2>
                                <input value={email2} onChange={e => set_email2(e.target.value)} type="email" placeholder="почта"></input>
                                <input vlaue={name} onChange={e => set_name(e.target.value)} type="text" placeholder="имя"></input>
                                <input value={password2} onChange={e => set_password2(e.target.value)} type="text" placeholder="пароль"></input>
                                <Select
                                    options={groups}
                                    placeholder="Группа"
                                    value={selected_group}
                                    onChange={handleSelect}
                                    getOptionLabel={option => option.name}
                                    isSearchable={true}
                                    className={style.select}
                                />
    


                                <div className={style.buttons}>
                                    <CustomButton size='big' onClick={() => set_register(false)} content="Назад" />
                                    <CustomButton bg_color_id={1} size='big' disabled={button_disabled2} onClick={accept_register} content="Создать" />
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Login