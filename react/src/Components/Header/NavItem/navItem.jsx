import React from "react";
import css from "./navItem.module.scss";

export default function NavItem({name, count, status}) {
    return(
        <button className={css.nav_item}>
            <div className={css.name_block}>
                <span className={css.name}>{name}</span>
                {count? <span className={css.count}>{"(" + count + ")"}</span> : null}
            </div>
            <div className={css.line + " " + (status == 1? css.line_active : "")}/>
        </button>
    )
}