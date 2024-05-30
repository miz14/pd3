import style from './big_button.module.scss'
import classNames from 'classnames'

const BigButton = ({className, bg_color_id, min_size, content, onClick}) => {

    const bg_color_class = {
        1: style.bg_color_1,
        2: style.bg_color_2,
    }

    console.log(bg_color_class[1])
    return(
        <button onClick={onClick} className={classNames(className, style.big_button, bg_color_id != undefined? bg_color_class[bg_color_id] : null)} style={min_size != undefined? "min-width: " + min_size + "px": null}>
            {content}
        </button>
    )
}

export default BigButton