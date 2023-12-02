import { Component } from "react";
import css from "./timeData.module.scss";
import clock from "../../../assets/Icons/clock-circle.svg";

export default function TimeData({date}) {
    return(
        <div className={css.time_block}>
            <img src={clock}/>
            <span>{date}</span>
        </div>
    )
};