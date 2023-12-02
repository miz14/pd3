//мб на потом <Container width="200"> child <Container/>
import React from "react";
import css from "./container.module.scss"

export default function Container({width}) {
    const style = {
        width: width + "px"
    }
    return (
        <div className={css.container} style={style}>
            {this.props.children}
        </div>
    )
};