import style from './custom_button.module.scss'
import classNames from 'classnames'

const CustomButton = ({className, bg_color_id, min_size, content, onClick, disabled, size='small'}) => {

    const bg_color_class = {
        1: style.bg_color_1,
        2: style.bg_color_2,
    }

    const size_class = {
        'big': style.big_button,
        'small': style.small_button
    }

    return(
        <button disabled={disabled} onClick={onClick} className={classNames(style.default, className, size_class[size], bg_color_class[bg_color_id])} style={min_size != undefined? "min-width: " + min_size + "px": null}>
            {content}
        </button>
    )
}

export default CustomButton