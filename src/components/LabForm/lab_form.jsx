import style from './lab_form.module.scss'

const LabForm = ({active, setActive}) => {
    // const disable_lab_form = () => {
    //     // event.preventDefault();
    //     // console.log([event.target, event.currentTarget])
    //     // if (event.target !== event.currentTarget) {
    //         console.log(123)
    //         // setActive(false)
    //     }

    // const handleChildElementClick = (e) => {
    //     e.stopPropagation()
    //     // Do other stuff here
    //  }

    return (
        active?
        <div className={style.labform_bg} onClick={() => setActive(false)}>
            <div onClick={(e) => e.stopPropagation()}>
            <div className={style.labform}>
                <input type='datetime-local' placeholder='дата дедлайна'></input>
                <input type='text' placeholder='название'></input>
                <input type='text' placeholder='ссылка на задание'></input>
                <button>Сохранить</button>
                
            </div>
            </div>
        </div>
        :
        null
    )
}

export default LabForm