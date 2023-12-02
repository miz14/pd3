import css from "./discipline.module.scss";

export default function Discipline ({name, color, link}) {
    return(
        link? <a className={css.disc_block} style={"color: " + color}>{name}</a> : <div className={css.disc_block} style={{"color" : color}}>{name}</div>
    )
}