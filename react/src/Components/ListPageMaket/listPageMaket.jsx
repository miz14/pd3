import TableLabels from "./TableLabels/tableLabels";
import TableLine from "./TableLine/tableLine";
import { Children } from "react";
import css from "./listPageMaket.module.scss";
import TimeData from "./TimeData/timeData";
import Discipline from "./Discipline/discipline";
import CourseGroup from "./CourseGroup/courseGroup";


const ListPageMaket = (Children) => {
    return (
        <div className={css.main_block + " container"}>
            <div className={css.options}>
                {Children[0]}
            </div>
                
            <div>
                <TableLabels columns={["Дата", "Дисциплина", "Курс/группа", "Попыток сдачи", "Название работы"]}/>
                <TableLine data={[
                    <TimeData date="04.11.23 - 12:30"/>,
                    <Discipline name="ООАИП" color="var(--cl-lime)"/>,
                    <CourseGroup course="3-б" group="ФИТ-211"/>,
                    "0",
                    "lab1.2"
                ]}/>
            </div>
        </div>
    )
}

export default ListPageMaket;