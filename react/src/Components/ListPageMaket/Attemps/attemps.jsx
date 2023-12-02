import css from "./attemps.module.scss";

export default function Attemps({num}) {
    return(
        <div className={css.att_block}>
            {num}
        </div>
    )
}