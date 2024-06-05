import { useDispatch, useSelector } from 'react-redux'
import style from './my_tasks.module.scss'
import { login } from '../../store/auth_slice'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import LabForm from '../../components/FullscreenForm/fullscreen_form'
import { useEffect, useState } from 'preact/hooks'
import USER_TYPE from '../../constant/user_types'
import classNames from 'classnames'
import CustomButton from '../../components/CustomButton/custom_button'
import network from '../../network'
import { info } from 'sass'
import FullscreenForm from '../../components/FullscreenForm/fullscreen_form'
import Select from 'react-select'

const MyTask = () => {
    const auth = useSelector(state => state.auth)

    const [left_data, set_left_data] = useState([])
    const [get_data, set_get_data] = useState(false)

    const [add_discipline_active, set_add_discipline_active] = useState(false)
    const [all_subjects, set_all_subjects] = useState([])
    const [all_groups, set_all_groups] = useState([])
    const [all_teachers, set_all_teachers] = useState([])

    const [selected_subject, set_selected_subject] = useState(null)
    const [selected_teachers, set_selected_teachers] = useState([])
    const [selected_groups, set_selected_groups] = useState([])


    const add_discipline_open = async () => {
        network.get_all_subjects().then(response => {
            if (response.status === 200) {
                set_all_subjects(response.data)
            }
        })
        network.get_all_group().then(response => {
            if (response.status === 200) {
                set_all_groups(response.data)
            }
        })
        network.get_all_teachers().then(response => {
            if (response.status === 200) {
                const tachers_data = response.data.map(element => {
                    return {
                        id: element.user_id,
                        name: element.user_name
                    }
                }
                ).filter(el => el.id != auth.id);
                set_all_teachers(tachers_data)
            }
        })
        set_add_discipline_active(true)
    }
    const add_discipline = async () => {
        var teachers = selected_teachers
        teachers.push({ id: auth.id })
        network.add_discipline_teacher(
            auth.token,
            selected_groups.map(el => el.id),
            selected_subject.id,
            teachers.map(el => Number(el.id))
        ).then(response => {
            console.log(response)
            set_get_data(!get_data)
            set_add_discipline_active(false)
        })
    }

    useEffect(async () => {
        if (auth.type === USER_TYPE.teacher) {
            network.get_disciplines_teacher(auth.token).then(response => {
                const data = response.data.reduce((acc, curr) => {
                    const key = curr.subject;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(curr);
                    console.log(1)
                    return acc;
                }, {})

                set_left_data(data)
            })
        }
        else if (auth.type === USER_TYPE.student) {
            network.get_disciplines_student(auth.token).then(res => {
                if (res.status === 200) {
                    set_left_data(
                        res.data.reduce((acc, curr) => {
                            const key = curr.subject;
                            if (!acc[key]) {
                                acc[key] = [];
                            }
                            acc[key].push(curr);
                            return acc;
                        }, {})
                    )
                }
            })
        }
    }, [get_data])

    useEffect(() => {
        console.log(left_data)
    }, [left_data]
    )

    const navigate = useNavigate()
    return (

        <main className={classNames(style.container, style.mytask)}>
            {auth.type != null ?
                <>
                    <div className={style.left_column}>
                        {auth.type === USER_TYPE.teacher ?
                            <CustomButton
                                className={style.add_button}
                                onClick={add_discipline_open}
                                bg_color_id={1}
                                min_size='100'
                                size='big'
                                content={
                                    <div className={style.add_button_content}>
                                        Добавить
                                    </div>
                                } />
                            :
                            null
                        }

                        {Object.keys(left_data).map(x =>
                            <div key={x}>
                                <h4><p>{x}</p></h4>
                                {left_data[x].map(y =>
                                    <div className={style.groups} key={y.discipline_id} onClick={() => navigate("/tasks/" + y.discipline_id)}>{y.groups.map(z => z.name).join(', ')}</div>
                                )}
                            </div>
                        )
                        }
                    </div>
                    <Outlet />
                    {auth.type === USER_TYPE.teacher ?
                        <FullscreenForm active={add_discipline_active} setActive={set_add_discipline_active} content={
                            <div className={style.discipline_form}>
                                <h3>Добавить дисциплину</h3>
                                <label>Предмет:</label>
                                <Select
                                    options={all_subjects}
                                    placeholder="предмет"
                                    value={selected_subject}
                                    onChange={(data) => set_selected_subject(data)}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    isSearchable={true}
                                    // isMulti
                                    className={style.select}
                                />
                                <label>Группы:</label>
                                <Select
                                    options={all_groups}
                                    placeholder="группы"
                                    value={selected_groups}
                                    onChange={(data) => set_selected_groups(data)}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    isSearchable={true}
                                    isMulti
                                    className={style.select}
                                />
                                <label>Дополнительные преподаватели</label>
                                <Select
                                    options={all_teachers}
                                    placeholder="преподаватели"
                                    value={selected_teachers}
                                    onChange={(data) => set_selected_teachers(data)}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    isSearchable={true}
                                    isMulti
                                    className={style.select}
                                />

                                <div className={style.buttons}>
                                    <CustomButton size='big' onClick={() => set_add_discipline_active(false)} content="Назад"></CustomButton>
                                    <CustomButton size='big' bg_color_id={1} onClick={add_discipline} content="Создать"></CustomButton>
                                </div>
                            </div>
                        } />
                        :
                        null
                    }
                </>
                :
                <div className={style.need_login}>
                    Требуется вход
                </div>
}
                </main>

            )
}

            export default MyTask