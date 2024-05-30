import style from './lab_form.module.scss'

const LabForm = ({active, setActive}) => {
    return (
        active?
        <div className={style.labform_bg}>
            <div className={style.labform}>
                <button onClick={() => setActive(false)}>close</button>
                <input type='text' placeholder='название'></input>
                <input type='date' placeholder='дата дедлайна'></input>
                <input type='text' placeholder='ссылка на задание'></input>
                <button>Сохранить</button>
                
            </div>
        </div>
        :
        null
    )
}

export default LabForm