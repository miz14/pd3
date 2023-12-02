import TableLabels from "./TableLine/tableLine";
import TableLine from "./TableLine/tableLine";
import { Children } from "react";
import css from "./listPageMaket.module.scss";
import TimeData from "./TimeData/timeData";
import Discipline from "./Discipline/discipline";
import CourseGroup from "./CourseGroup/courseGroup";
import Attemps from "./Attemps/attemps";
import LabName from "./LabName/labName";


export default function ListPageMaket({hot_works}) {
    if (hot_works)

    return (
        
        <div className={css.list_page_maket_block + " container"}>
            <div className={css.options}>
                {Children[0]}
            </div>
            <TableLine columns={["Дата", "Дисциплина", "Курс/группа", "Попыток сдачи", "Название работы"]} columns_size={[150, 220, 150, 180, 220]} sep={true}/>
            
            
            <div className={css.data}>
                {hot_works.map((el, idx) => {
                    return(
                        <div className={css.data_element}>
                            <TableLine
                                columns={[
                                <TimeData date={el["date"]}/>,
                                <Discipline name={el["discipline"]} color={el["discipline_color"]}/>,
                                <CourseGroup course={el["course"]} group={el["group"]}/>,
                                <Attemps num={el["attempts"]}/>,
                                <LabName name={el["labName"]}/>
                            ]} columns_size={[150, 220, 150, 180, 220]}
                            teacher_buttons={{"doc" : "link", "skip" : "action", "accept" : "action"}}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}