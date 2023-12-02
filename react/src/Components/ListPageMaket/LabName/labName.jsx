import css from "./labName.module.scss";

export default function LabName({name}) {
    return(
        <div className={css.lab_name_block}>
            {name}
        </div>
    )
}