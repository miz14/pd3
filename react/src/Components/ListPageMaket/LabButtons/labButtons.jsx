import css from "./labButtons.module.scss";
import document from "../../../assets/Icons/document.svg";
import skip from "../../../assets/Icons/skip-arrow.svg";
import accept from "../../../assets/Icons/accept.svg";

export default function LabButtons() {
    return(
        <div className={css.lab_buttons_block}>
            <button className={css.document}>
                <img src={document}/>
            </button>
            <button className={css.skip}>
                <img src={skip}/>
            </button>
            <button className={css.accept}>
                <img src={accept}/>
            </button>
        </div>
    )
}