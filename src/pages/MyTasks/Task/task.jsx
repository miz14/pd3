import { useEffect, useState } from "preact/hooks"
import { useParams } from "react-router-dom"
import LabForm from "../../../components/LabForm/lab_form"
import AcceptForm from "../../../components/AcceptForm/accept_form"
import { useSelector } from "react-redux"
import USER_TYPE from "../../../constant/user_types"
import style from './task.module.scss'
import CustomButton from "../../../components/CustomButton/custom_button"
import edit_img from '../../../assets/edit.svg'
import trash_img from '../../../assets/trash.svg'
import doc_img from '../../../assets/doc.svg'
import network from "../../../network"

const Task = () => {
    const auth = useSelector(state => state.auth)
    const params = useParams()

    const [data, set_data] = useState(null)

    useEffect(() => {
        if (auth.type == USER_TYPE.teacher) {
            network.get_disciplines_teacher_info(auth.token, Number(params.id)).then(response => {
                console.log(response.data)
                set_data(response.data)
            })
        }
    }, [])

    // const data = auth.type === USER_TYPE.teacher ? {
    //     id: 1,
    //     subject: "ООАИП",
    //     groups: [
    //         { id: 1, name: 'ФИТ-211' }, { id: 2, name: 'ФИТ-212' }
    //     ],
    //     teachers: [
    //         { id: 1, name: "Шарун И.В." }
    //     ],
    //     labs: [
    //         {
    //             id: 1,
    //             start: "04.11.23",
    //             deadline: "05.11.23",
    //             proc_stat: 12,
    //             name: "lab1",
    //             // creator_id: 1
    //         },
    //         {
    //             id: 2,
    //             start: "04.11.23",
    //             deadline: "05.11.23",
    //             proc_stat: 12,
    //             name: "lab1",
    //             // creator_id: 1
    //         }
    //     ]
    // } :
    //     {
    //         id: 1,
    //         subject: "ООАИП",
    //         members: [
    //             { id: 1, name: 'Иванов ии' },
    //             { id: 1, name: 'Иванов ии' }
    //         ],
    //         reviews: [
    //             {
    //                 lab_id: 1,
    //                 try_count: 1,
    //                 lab_name: 'lab1',
    //             }
    //         ]

    //     }

    const [edit_lab_form_active, set_edit_lab_form_active] = useState(false)
    const [delete_lab_form_active, set_delete_lab_form_active] = useState(false)


    const edit_lab = () => {
        set_edit_lab_form_active(true)
    }
    const delete_lab = () => {

    }

    const tranform_time = (time) => {
        console.log(time.split('T'))
        return time
    }

    return (
        auth.type === USER_TYPE.teacher ?
            data != null ?
                <>
                    <div className={style.task}>
                        <div className={style.task_info}>
                            <h2>{data.name}</h2>
                            <div className={style.row}>
                                <div>Группы: {data.group_list.map(x => <span className={style.group} key={x.id}>{x.name}</span>)}</div>
                                <div>Преподаватели: {data.teacher_list.map(x => <span className={style.teacher} key={x.id}>{x.name}</span>)}</div>

                            </div>

                        </div>
                        <div className={style.labs}>
                            <div className={style.labs_column}><h3>Дедлайн</h3></div>
                            <div className={style.labs_column}><h3>Выполнили</h3></div>
                            <div className={style.labs_column}><h3>Название работы</h3></div>
                            <div />
                            {data.laboratory_list.map(x =>
                                <>
                                    <div><div className={style.deadline}>{tranform_time(x.deadline)}</div></div>
                                    <div>{x.complete_percent}</div>
                                    <div>{x.name}</div>
                                    <div className={style.lab_buttons}>
                                        <CustomButton content={<img src={doc_img} />}></CustomButton>
                                        <CustomButton bg_color_id={2} onClick={() => set_delete_lab_form_active(true)} content={<img src={trash_img} />}></CustomButton>
                                        <CustomButton onClick={edit_lab} content={<img src={edit_img} />}></CustomButton>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <LabForm active={edit_lab_form_active} setActive={set_edit_lab_form_active} />
                    <AcceptForm active={delete_lab_form_active} setActive={set_delete_lab_form_active} accept_action={delete_lab} accept_text="Удалить" />
                </>
                :
                null
            :
            <div>

            </div>
    )
}

export default Task