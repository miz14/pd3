import style from './accept_form.module.scss'

const AcceptForm = ({active, setActive, accept_action, accept_text}) => {

    const accept = () => {
        accept_action()
        setActive(false)
    }
    return (
        active?
        <div className={style.form_bg}>
            <div className={style.form}>
                <button onClick={() => accept}>{accept_text}</button>
                <button onClick={() => setActive(false)}>Отмена</button>
                
            </div>
        </div>
        :
        null
    )
}

export default AcceptForm