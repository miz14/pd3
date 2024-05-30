import { useEffect, useState } from "preact/hooks"
import { useParams } from "react-router-dom"
import LabForm from "../../../components/LabForm/lab_form"
import DeleteAcceptForm from "../../../components/DeleteAcceptForm/delete_accept_form"
import { useSelector } from "react-redux"
import USER_TYPE from "../../../constant/user_types"
import style from './task.module.scss'

const Task = () => {
    const auth = useSelector(state => state.auth)
    const params = useParams()
    console.log(params)

    const data = auth.type === USER_TYPE.teacher ? {
        id: 1,
        subject: "ООАИП",
        groups: [
            { id: 1, name: 'ФИТ-211' }, { id: 2, name: 'ФИТ-212' }
        ],
        teachers: [
            { id: 1, name: "Шарун И.В." }
        ],
        labs: [
            {
                id: 1,
                start: "04.11.23",
                deadline: "05.11.23",
                proc_stat: 12,
                name: "lab1",
                creator_id: 1
            },
            {
                id: 2,
                start: "04.11.23",
                deadline: "05.11.23",
                proc_stat: 12,
                name: "lab1",
                creator_id: 1
            }
        ]
    } :
        {
            id: 1,
            subject: "ООАИП",
            members: [
                { id: 1, name: 'Иванов ии' },
                { id: 1, name: 'Иванов ии' }
            ],
            reviews: [
                {
                    lab_id: 1,
                    try_count: 1,
                    lab_name: 'lab1',
                }
            ]

        }

    const [edit_lab_form_active, set_edit_lab_form_active] = useState(false)
    const [delete_lab_form_active, set_delete_lab_form_active] = useState(false)

    const edit_lab = () => {
        set_edit_lab_form_active(true)
    }
    const delete_lab = () => {

    }

    return (
        auth.type === USER_TYPE.teacher ?
            <>
                <div className={style.task}>
                    <div className={style.task_info}>
                        <h2>{data.subject}</h2>
                        <div className={style.row}>
                            <div>Группы: {data.groups.map(x => <span className={style.group} key={x.id}>{x.name}</span>)}</div>
                            <div>Преподаватели: {data.teachers.map(x => <span className={style.teacher} key={x.id}>{x.name}</span>)}</div>

                        </div>

                    </div>

                    {data.labs.map(x =>
                        <div key={x.id}>
                            <br />
                            <div>{x.deadline}</div>
                            <div>{x.proc_stat}</div>
                            <div>{x.name}</div>
                            <div>{data.teachers.find(y => y.id === x.creator_id).name}</div>
                            <button onClick={edit_lab}>редактировать</button>
                            <button onClick={() => set_delete_lab_form_active(true)}>удалить</button>
                            <br />
                        </div>
                    )}
                </div>
                <LabForm active={edit_lab_form_active} setActive={set_edit_lab_form_active} />
                <DeleteAcceptForm active={delete_lab_form_active} setActive={set_delete_lab_form_active} delete_action={delete_lab} />
            </>
            :
            <div>

            </div>
    )
}

export default Task