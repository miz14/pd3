import style from './delete_accept_form.module.scss'

const DeleteAcceptForm = ({active, setActive, delete_action}) => {

    const delete_accept = () => {
        delete_action()
        setActive(false)
    }
    return (
        active?
        <div className={style.form_bg}>
            <div className={style.form}>
                <button onClick={() => delete_accept}>Удалить</button>
                <button onClick={() => setActive(false)}>Отмена</button>
                
            </div>
        </div>
        :
        null
    )
}

export default DeleteAcceptForm