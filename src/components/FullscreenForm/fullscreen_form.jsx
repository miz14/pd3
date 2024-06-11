import style from './fullscreen_form.module.scss'

const FullscreenForm = ({active, setActive, content}) => {
    return (
        active?
        <div className={style.bg} onClick={() => setActive(false)}>
            <div onClick={(e) => e.stopPropagation()}>
                <div className={style.form}>
                    {content}
                </div>
            </div>
        </div>
        :
        null
    )
}

export default FullscreenForm