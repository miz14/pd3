import { useDispatch, useSelector } from 'react-redux'
import style from './my_tasks.module.scss'
import { login } from '../../store/auth_slice'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import LabForm from '../../components/LabForm/lab_form'
import { useEffect, useState } from 'preact/hooks'
import USER_TYPE from '../../constant/user_types'
import classNames from 'classnames'
import CustomButton from '../../components/CustomButton/custom_button'
import network from '../../network'
import { info } from 'sass'

const MyTask = () => {
    const auth = useSelector(state => state.auth)
    console.log([auth.token, auth.name, auth.type])

    const [left_data, set_left_data] = useState([])

    // const left_data = auth.type === USER_TYPE.teacher? [
    //     { id: 1, subject: 'ООАИП', groups: [{ id: 1, name: 'ФИТ-211' }, { id: 2, name: 'ФИТ-212' }] },
    //     { id: 2, subject: 'ЧТО', groups: [{ id: 1, name: 'ФИТ-211' }, { id: 2, name: 'ФИТ-212' }] },
    //     { id: 3, subject: 'ООАИП', groups: [{ id: 1, name: 'ФИТ-221' }, { id: 2, name: 'ФИТ-222' }] }
    // ].reduce((acc, curr) => {
    //     const key = curr.subject;
    //     if (!acc[key]) {
    //         acc[key] = [];
    //     }
    //     acc[key].push(curr);
    //     console.log(1)
    //     return acc;
    // }, {})
    // :
    // [
    //     { id: 1, subject: 'ООАИП' },
    //     { id: 2, subject: 'ЧТО', },
    // ]

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
                console.log(data)
            })
        }
        else if (auth.type === USER_TYPE.student) {

        }
    }, [])

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    return (

        <main className={classNames(style.container, style.mytask)}>
            <div className={style.left_column}>
                <CustomButton 
                className={style.add_button}
                onClick={() => {console.log(1)}}
                bg_color_id={1}
                min_size='100'
                size='big'
                content={
                    <div className={style.add_button_content}>
                        Добавить
                    </div>
                }/>
                {auth.type === USER_TYPE.teacher ?
                    Object.keys(left_data).map(x =>
                        <div key={x}>
                            <h4><p>{x}</p></h4>
                            {left_data[x].map(y =>
                                <div className={style.groups} key={y.discipline_id} onClick={() => navigate("/tasks/" + y.discipline_id)}>{y.groups.map(z => z.name).join(', ')}</div>
                            )}
                        </div>
                )
                :
                left_data.map(x => 
                    <h4 key={x.key}>{x.subject}</h4>
                )
            }
            </div>
            <Outlet />
        </main>

    )
}

export default MyTask