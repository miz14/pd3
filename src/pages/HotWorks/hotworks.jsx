import { useEffect, useState } from "preact/hooks";
import HotWorksLaboratory from "../../components/HotWorksLaboratory/hotworks_laboratory";
import style from './hotworks.module.scss'
import classNames from "classnames";
import AsyncSelect from 'react-select/async'
import { useSelector } from "react-redux";
import USER_TYPE from "../../constant/user_types";
import CustomButton from "../../components/CustomButton/custom_button";
import network from "../../network";
import doc_img from '../../assets/doc.svg'
import accept_img from '../../assets/accept.svg'
import down_img from '../../assets/down.svg'

const HotWorks = () => {

    const auth = useSelector(state => state.auth)

    const [data, set_data] = useState(null)
    const [selected_subject, set_selected_subject] = useState(null)
    const [selected_group, set_selected_group] = useState(null)
    const [only_my_checkbox, set_only_my_checkbox] = useState(false)

    const get_data = () => {
        if (auth.type === USER_TYPE.teacher) {
            console.log(2)
            network.get_all_student_laboratory_for_teacher(
                auth.token,
                only_my_checkbox,
                selected_subject != null ? selected_subject.id : null,
                selected_group != null ? selected_group.id : null
            ).then(response => {
                console.log(response)
                if (response.status === 200) {
                    set_data(response.data)
                }
            })
        }
        else if (auth.type === USER_TYPE.student) {
            console.log(1)
            network.get_all_student_laboratory_for_student(
                auth.token,
                selected_subject != null ? selected_subject.id : null
            ).then(response => {
                if (response.status === 200) {
                    set_data(response.data)
                }
            })
        }
    }


    useEffect(() => {
        get_data()
    }, [])

    const get_all_subjects = () => {
        return network.get_all_subjects().then(response => response.data)
    }
    const get_all_group = () => {
        return network.get_all_group().then(response => response.data)
    }

    const [all_grops, set_all_groups] = useState([
        { id: 1, name: 'abn' }
    ])

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

    const use_filter = () => {
        get_data()
    }

    const accept_lab = (id) => {
        network.accept_student_laboratory(
            auth.token,
            id
        ).then(response => {
            if (response.status === 200) {
                set_data(data.map(x => {
                    if (x.student_laboratory_id === id) {
                        x.status = true
                    }
                    return x
                }))
            }
        })
    }
    const dany_lab = (id) => {
        network.deny_student_laboratory(
            auth.token,
            id
        ).then(response => {
            if (response.status === 200) {
                set_data(data.filter(x => x.student_laboratory_id != id))
            }
        })
    }

return (
    <main className={classNames(style.container, style.hotworks)}>
        {auth.token != null ?
            data != null ?
                <>
                    <div className={style.filters}>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={get_all_subjects}
                            placeholder="предмет"
                            value={selected_subject}
                            onChange={(data) => set_selected_subject(data)}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            // isSearchable={true}
                            className={style.select}
                            isClearable
                            getNewOptionData

                        />
                        {auth.type === USER_TYPE.teacher ?
                            <>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={get_all_group}
                                    placeholder="группа"
                                    value={selected_group}
                                    onChange={(data) => set_selected_group(data)}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    isSearchable={true}
                                    className={style.select}
                                    isClearable
                                />
                                <div className={style.checkbox_block}>
                                    <span>Назначенные мне:</span>
                                    <div>
                                        <input id="ch" className={style.checkbox} type="checkbox" onChange={e => set_only_my_checkbox(e.target.checked)} />
                                        <label for="ch" />
                                    </div>
                                </div>
                            </>
                            :
                            null
                        }


                        <CustomButton size='big' bg_color_id={1} content="Применить" onClick={use_filter} />
                    </div>





                    <div className={style.labs}>
                        <div className={style.labs_column}><h3>Срок - Загруженно</h3></div>
                        <div className={style.labs_column}><h3>Попытки</h3></div>
                        <div className={style.labs_column}><h3>Дисциплина</h3></div>
                        <div className={style.labs_column}><h3>Название работы</h3></div>
                        <div className={style.labs_column}><h3>Сдает</h3></div>
                        <div />
                        {data.map(x =>

                            <>
                                <div className={style.date}>
                                    <div className={style.deadline}>{tranform_time(x.deadline)}</div>
                                    <div className={style.updatetime}>{tranform_time(x.loading_time)}</div>
                                </div>
                                <div>{x.count_try}</div>
                                <div>{x.discipline.name}</div>
                                <div><a className={style.link} href={x.url_student_task}>{x.laboratory_name}</a></div>
                                <div>{x.student.group + '/' + x.student.name}</div>
                                <div className={style.lab_buttons}>
                                    <CustomButton content={<img src={doc_img} />}></CustomButton>
                                    {x.status === false && auth.type === USER_TYPE.teacher ?
                                        <>
                                            <CustomButton onClick={() => dany_lab(x.student_laboratory_id)} content={<img src={down_img} />}></CustomButton>
                                            <CustomButton onClick={() => accept_lab(x.student_laboratory_id)} bg_color_id={1} content={<img src={accept_img} />}></CustomButton>
                                        </>
                                        :
                                        <div className={style.status}>{x.status ? "Принято" : x.valid === true ? "Проверка" : x.valid === false ? "Отклонено" : "Выдано"}</div>
                                    }
                                </div>
                            </>
                        )}
                    </div>
                </>
                :
                <div className={style.need_login}>
                    Требуется вход
                </div>
            :
            null
        }
    </main>
)
}

export default HotWorks