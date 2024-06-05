import { useEffect, useState } from "preact/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import USER_TYPE from "../../../constant/user_types"
import style from './task.module.scss'
import CustomButton from "../../../components/CustomButton/custom_button"
import edit_img from '../../../assets/edit.svg'
import trash_img from '../../../assets/trash.svg'
import doc_img from '../../../assets/doc.svg'
import network from "../../../network"
import FullscreenForm from "../../../components/FullscreenForm/fullscreen_form"

import Select from 'react-select'
import { options } from "preact"

const Task = () => {
    const auth = useSelector(state => state.auth)
    const params = useParams()
    const navigate = useNavigate()

    const [data, set_data] = useState(null)

    const get_all_data = async () => {
        if (auth.type == USER_TYPE.teacher) {
            await network.get_disciplines_teacher_info(auth.token, Number(params.id)).then(response => {
                set_data(response.data)
                set_selected_group(response.data.group_list)
                set_selected_teachers(response.data.teacher_list.filter(el => el.id != auth.id))
            })
        } else if (auth.type === USER_TYPE.student) {
            network.get_discipline_student_info(auth.token, Number(params.id)).then(response => {
                console.log(response)
                var data = response.data
                data['name'] = data['subject']
                delete data['subject']
                set_data(response.data)
            })
        }
    }

    useEffect(async () => {
        await get_all_data()
    }, [params.id])


    const [edit_lab_form_active, set_edit_lab_form_active] = useState(false)
    const [delete_lab_form_active, set_delete_lab_form_active] = useState(false)
    const [delete_lab_id, set_delete_lab_id] = useState(null)

    const [add_lab_form_active, set_add_lab_form_active] = useState(false)

    const [edit_lab_form_id, set_edit_lab_form_id] = useState(null)
    const [edit_lab_form_deadline, set_edit_lab_form_deadline] = useState(null)
    const [edit_lab_form_url, set_edit_lab_form_url] = useState(null)
    const [edit_lab_form_name, set_edit_lab_form_name] = useState(null)

    const [edit_disciplune_active, set_edit_disciplune_active] = useState(false)

    const [all_groups, set_all_groups] = useState()
    const [all_teachers, set_all_teachers] = useState()

    const [selected_group, set_selected_group] = useState()

    const [selected_teachers, set_selected_teachers] = useState()

    const [delete_discipline_form_active, set_delete_discipline_form_active] = useState(false)

    useEffect(async () => {
        if (edit_disciplune_active === true) {
            network.get_all_group().then(response => {
                if (response.status === 200) {
                    set_all_groups(response.data)
                }
            })
            network.get_all_teachers().then(response => {
                if (response.status === 200) {
                    console.log(response)
                    const tachers_data = response.data.map(element => {
                        return {
                            id: element.user_id,
                            name: element.user_name
                        }
                    }
                    ).filter(el => el.id != auth.id)
                    set_all_teachers(tachers_data)
                }
            })
        }

    }, [edit_disciplune_active])

    const add_lab_active = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        set_edit_lab_form_deadline(today)
        set_edit_lab_form_url('')
        set_edit_lab_form_name('')

        set_add_lab_form_active(true)
    }

    const edit_lab = (data) => {
        set_edit_lab_form_id(data.id)
        set_edit_lab_form_deadline(data.deadline)
        set_edit_lab_form_url(data.url)
        set_edit_lab_form_name(data.name)

        set_edit_lab_form_active(true)
    }
    const delete_lab_acivate = (id) => {
        set_delete_lab_id(id)
        set_delete_lab_form_active(true)

    }

    const delete_lab_teacher = () => {
        network.delete_lab_teacher(
            auth.token,
            delete_lab_id,
        ).then(response => {
            if (response.status === 200) {
                get_all_data()
                set_delete_lab_form_active(false)
            }
        })
    }

    const update_lab_teacher = () => {
        network.update_lab_teacher(
            auth.token,
            edit_lab_form_id,
            edit_lab_form_name,
            edit_lab_form_url,
            edit_lab_form_deadline
        ).then(response => {
            if (response.status === 200) {
                set_edit_lab_form_active(false)
                get_all_data()
            }
        })
    }
    const add_lab_teacher = () => {
        network.add_lab_teacher(
            auth.token,
            edit_lab_form_name,
            edit_lab_form_url,
            Number(params.id),
            edit_lab_form_deadline
        ).then(response => {
            if (response.status === 200) {
                set_add_lab_form_active(false)
                get_all_data()
            }
        })
    }
    const tranform_time = (time) => {
        if (time != null) {
            var time = time.split('T')
            time[0] = time[0].split('-').reverse().join('.')
            time[1] = time[1].substring(0, 5)
    
            return time.join(' - ')
        } else {
            return '-'
        }
    }

    const delete_discipline_teacher = () => {
        network.delete_discipline_teacher(
            auth.token,
            Number(params.id),
        ).then(response => {
            if (response.status === 200) {
                navigate('/tasks')
                window.location.reload();
            }
        })
    }
    const update_discipline_teacher = () => {
        var teachers = selected_teachers
        teachers.push({ id: auth.id })
        network.update_discipline(
            auth.token,
            Number(params.id),
            selected_group.map(el => el.id),
            teachers.map(el => el.id)
        ).then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        })
    }


    const [edit_lab_student_active, set_edit_lab_student_active] = useState(false)
    const [selected_teachers_student, set_selected_teachers_student] = useState()
    const [uses_url_student, set_uses_url_student] = useState()
    const [open_lab_data_student, set_open_lab_data_student] = useState()
    const [disabled_edit, set_disabled_edit] = useState(false)

    const open_edit_lab_student = (x) => {
        set_disabled_edit(x.status)
        console.log(x)
        set_open_lab_data_student(x)
        if (x.url_student === null) {
            set_uses_url_student('')
        } else {
            set_uses_url_student(x.url_student)
        }

        if (x.reviewers_id === null) {
            set_selected_teachers_student({ id: -1, name: 'Все' })
        } else {
            set_selected_teachers_student({id: x.reviewers_id, name: data.teacher_list.filter(y => y.id === x.reviewers_id)[0].name})
        }

        set_edit_lab_student_active(true)
    }

    const handler_lab_student = () => {
        if (open_lab_data_student.valid === null) {
            network.add_laboratory_student(
                auth.token,
                open_lab_data_student.student_laboratory_id,
                selected_teachers_student.id,
                data.discipline_id,
                uses_url_student
            ).then(response => {
                get_all_data()
            })
        } else {
            network.repeat_student_laboratory(
                auth.token,
                open_lab_data_student.student_laboratory_id,
                uses_url_student,
                selected_teachers_student.id
            ).then(response => {
                console.log(444)
                get_all_data()
            })
        }

          
    }
    return (
        data != null ?
            <>
                <div className={style.task}>
                    <div className={style.task_info}>
                        <h2>{data.name}</h2>
                        <div className={style.row}>
                            {auth.type === USER_TYPE.teacher ?
                                <>
                                    <div>Группы: {data.group_list.map(x => <span className={style.group} key={x.id}>{x.name}</span>)}</div>
                                    <div className={style.teachers}>Преподаватели: {data.teacher_list.map(x => <div className={style.teacher} key={x.id}>{x.name}</div>)}</div>

                                    <CustomButton
                                        onClick={() => set_edit_disciplune_active(true)}
                                        // bg_color_id={1}
                                        min_size='100'
                                        size='big'
                                        content={
                                            <div className={style.change_button_content}>
                                                Изменить
                                            </div>
                                        } />
                                    <CustomButton
                                        onClick={() => set_delete_discipline_form_active(true)}
                                        bg_color_id={2}
                                        min_size='100'
                                        size='big'
                                        content={
                                            <div className={style.delete_button_content}>
                                                Удалить
                                            </div>
                                        } />
                                </>
                                :
                                <>
                                    <div>Группы: {data.groups.map(x => <span className={style.group} key={x.id}>{x.name}</span>)}</div>
                                    <div className={style.teachers}>Преподаватели: {data.teacher_list.map(x => <span className={style.teacher} key={x.id}>{x.name}</span>)}</div>
                                </>
                            }
                        </div>

                    </div>
                    <div className={style.labs}>
                        {auth.type === USER_TYPE.teacher ?
                            <>
                                <div className={style.labs_column}><h3>Срок</h3></div>
                                <div className={style.labs_column}><h3>
                                    Выполнило
                                </h3></div>
                            </>
                            :
                            <>
                                <div className={style.labs_column}><h3>Срок - Загруженно</h3></div>
                                <div className={style.labs_column}><h3>
                                    Попытки
                                </h3></div>
                            </>
                        }
                        <div className={style.labs_column}><h3>Название работы</h3></div>
                        <div className={style.labs_add}>
                            {auth.type === USER_TYPE.teacher ?
                                <CustomButton
                                    className={style.add_button}
                                    onClick={() => add_lab_active(true)}
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
                        </div>
                        {auth.type === USER_TYPE.teacher ?
                            data.laboratory_list.map(x =>

                                <>
                                    <div><div className={style.deadline}>{tranform_time(x.deadline)}</div></div>
                                    <div>{x.complete_percent.toFixed(2)} %</div>
                                    <div>{x.name}</div>
                                    <div className={style.lab_buttons}>
                                        <CustomButton content={<img src={doc_img} />}></CustomButton>
                                        <CustomButton bg_color_id={2} onClick={() => delete_lab_acivate(x.id)} content={<img src={trash_img} />}></CustomButton>
                                        <CustomButton onClick={() => edit_lab(x)} content={<img src={edit_img} />}></CustomButton>
                                    </div>
                                </>
                            )
                            :
                            data.laboratory_list.map(x =>

                                <>

                                    <div className={style.date}>
                                        <div className={style.deadline}>{tranform_time(x.deadline)}</div>
                                        {x.last_update_date != null?
                                        <div className={style.updatetime}>{tranform_time(x.last_update_date)}</div>
                                        :
                                        null}
                                    
                                    </div>
                                    <div>{x.count_try}</div>
                                    <div>{x.name}</div>
                                    <div className={style.lab_buttons}>
                                        <CustomButton content={<img src={doc_img} />}></CustomButton>
                                        <CustomButton onClick={() => open_edit_lab_student(x)} content={<img src={edit_img} />}></CustomButton>
                                        <div className={style.status}>{x.status? "Принято" : x.valid === true? "Проверка" : x.valid === false? "Отклонено" : "Выдано"}</div>
                                    </div>
                                </>
                            )

                        }
                    </div>
                </div>
                {auth.type === USER_TYPE.teacher ?
                    <>
                        <FullscreenForm active={edit_lab_form_active} setActive={set_edit_lab_form_active} content={
                            edit_lab_form_deadline != null ?
                                <div className={style.teacher_lab_edit_form}>
                                    <h3>Изменение лабораторной</h3>
                                    <label>Дедлайн:</label>
                                    <input type="datetime-local" value={edit_lab_form_deadline} onChange={(e) => set_edit_lab_form_deadline(e.target.value)} />
                                    <label>Ссылка на задание</label>
                                    <input type="url" placeholder="ссылка" value={edit_lab_form_url} onChange={(e) => set_edit_lab_form_url(e.target.value)} />
                                    <label>Название работы</label>
                                    <input type='text' placeholder="название работы" value={edit_lab_form_name} onChange={(e) => set_edit_lab_form_name(e.target.value)} />
                                    <div className={style.buttons}>
                                        <CustomButton size='big' onClick={() => set_edit_lab_form_active(false)} content="Назад"></CustomButton>
                                        <CustomButton size='big' bg_color_id={1} onClick={update_lab_teacher} content="Сохранить"></CustomButton>
                                    </div>
                                </div>
                                :
                                null
                        } />
                        <FullscreenForm active={delete_lab_form_active} setActive={set_delete_lab_form_active} content={
                            <>
                                <div className={style.delete_lab_from}>
                                    <h3>Вы уверены, что хотите удалить работу?</h3>
                                    <div className={style.buttons}>
                                        <CustomButton size='big' onClick={() => set_delete_lab_form_active(false)} content="Назад"></CustomButton>
                                        <CustomButton size='big' bg_color_id={2} onClick={delete_lab_teacher} content="Удалить"></CustomButton>
                                    </div>
                                </div>
                            </>
                        } />
                        <FullscreenForm active={delete_discipline_form_active} setActive={set_delete_discipline_form_active} content={
                            <>
                                <div className={style.delete_lab_from}>
                                    <h3>Вы уверены, что хотите удалить дисциплину?</h3>
                                    <div className={style.buttons}>
                                        <CustomButton size='big' onClick={() => set_delete_discipline_form_active(false)} content="Назад"></CustomButton>
                                        <CustomButton size='big' bg_color_id={2} onClick={delete_discipline_teacher} content="Удалить"></CustomButton>
                                    </div>
                                </div>
                            </>
                        } />
                        <FullscreenForm active={add_lab_form_active} setActive={set_add_lab_form_active} content={
                            <div className={style.teacher_lab_edit_form}>
                                <h3>Добавление новой лабораторной</h3>
                                <label>Дедлайн:</label>
                                <input type="datetime-local" value={edit_lab_form_deadline} onChange={(e) => set_edit_lab_form_deadline(e.target.value)} />
                                <label>Ссылка на задание</label>
                                <input type="url" placeholder="ссылка" value={edit_lab_form_url} onChange={(e) => set_edit_lab_form_url(e.target.value)} />
                                <label>Название работы</label>
                                <input type='text' placeholder="название работы" value={edit_lab_form_name} onChange={(e) => set_edit_lab_form_name(e.target.value)} />
                                <div className={style.buttons}>
                                    <CustomButton size='big' onClick={() => set_add_lab_form_active(false)} content="Назад"></CustomButton>
                                    <CustomButton size='big' bg_color_id={1} onClick={add_lab_teacher} content="Добавить"></CustomButton>
                                </div>
                            </div>
                        } />
                        <FullscreenForm active={edit_disciplune_active} setActive={set_edit_disciplune_active} content={
                            <div className={style.teacher_lab_edit_form}>
                                <h3>Изменение параметров дисциплины</h3>
                                <label>Группы:</label>
                                <Select
                                    options={all_groups}
                                    placeholder="группы"
                                    value={selected_group}
                                    onChange={(data) => set_selected_group(data)}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    isSearchable={true}
                                    isMulti
                                    className={style.select}
                                />
                                <label>Дополнительные преподаватели:</label>
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
                                    <CustomButton size='big' onClick={() => set_edit_disciplune_active(false)} content="Назад"></CustomButton>
                                    <CustomButton size='big' bg_color_id={1} onClick={update_discipline_teacher} content="Изменить"></CustomButton>
                                </div>
                            </div>
                        } />
                    </>
                    :
                    <>
                        <FullscreenForm active={edit_lab_student_active} setActive={set_edit_lab_student_active} content={
                            // edit_lab_form_deadline != null ?
                            <div className={style.teacher_lab_edit_form}>
                                <h3>Изменение лабораторной</h3>
                                <label>Ссылка на вашу работу:</label>
                                <input type="url" placeholder="ссылка" value={uses_url_student} onChange={(e) => set_uses_url_student(e.target.value)} disabled={disabled_edit}/>
                                <label>Проверяющий:</label>
                                <Select
                                    options={
                                        [{ id: -1, name: 'Все' }].concat(data.teacher_list)
                                    }
                                    placeholder="предмет"
                                    value={selected_teachers_student}
                                    onChange={(data) => set_selected_teachers_student(data)}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    isSearchable={true}
                                    className={style.select}
                                    isDisabled={disabled_edit}
                                    
                                />
                                <div className={style.buttons}>
                                    <CustomButton size='big' onClick={() => set_edit_lab_student_active(false)} content="Назад"></CustomButton>
                                    <CustomButton size='big' bg_color_id={1} onClick={handler_lab_student} content="На проверку" disabled={disabled_edit}></CustomButton>
                                </div>
                            </div>
                        } />

                    </>
                }
            </>
            :
            null
    )
}

export default Task