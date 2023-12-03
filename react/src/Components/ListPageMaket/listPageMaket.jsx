import TableLabels from "./TableLine/tableLine";
import TableLine from "./TableLine/tableLine";
import { Children } from "react";
import css from "./listPageMaket.module.scss";
import TimeData from "./TimeData/timeData";
import Discipline from "./Discipline/discipline";
import CourseGroup from "./CourseGroup/courseGroup";
import Attemps from "./Attemps/attemps";
import LabName from "./LabName/labName";
import Filter from "./Filter/filter";


export default function ListPageMaket({filters, hot_works, requests}) {
    return (
        
        <div className={css.list_page_maket_block + " container"}>

            {/* фильтры */}
            {filters? 
            <div className={css.options}>
                <Filter filters={filters}/>
            </div> : null}
            
            {/* Горящие работы */}
            {hot_works? 
            <>
            <TableLine columns={["Дата", "Дисциплина", "Курс/группа", "Попыток сдачи", "Название работы"]} columns_size={[150, 220, 150, 180, 220]} sep={true}/>
            <div className={css.data}>
                {hot_works.map((el, idx) => {
                    return(
                        <TableLine key={idx}
                            columns={[
                            <TimeData date={el["date"]}/>,
                            <Discipline name={el["discipline"]} color={el["discipline_color"]}/>,
                            <CourseGroup course={el["course"]} group={el["group"]}/>,
                            <Attemps num={el["attempts"]}/>,
                            <LabName name={el["labName"]}/>
                        ]} columns_size={[150, 220, 150, 180, 220]}
                        teacher_buttons={{"doc" : "link", "skip" : "action", "accept" : "action"}}/>
                    )
                })}
            </div>
            </> : null}

            {/* Запросы */}
            {requests?
            <>
            <TableLine columns={["Дата", "Дисциплина", "Курс/группа", "Попыток сдачи", "Название работы"]} columns_size={[150, 220, 150, 180, 220]} sep={true}/>
            <div className={css.data}>
                {requests.map((el, idx) => {
                    return(
                        <TableLine key={idx}
                            columns={[
                            <TimeData date={el["date"]}/>,
                            <Discipline name={el["discipline"]} color={el["discipline_color"]}/>,
                            <CourseGroup course={el["course"]} group={el["group"]}/>,
                            <Attemps num={el["attempts"]}/>,
                            <LabName name={el["labName"]}/>
                        ]} columns_size={[150, 220, 150, 180, 220]}
                        problem={el["problem"]}
                        teacher_buttons={{"doc" : "link", "skip" : "action", "accept" : "action"}}/>
                    )
                })}
            </div>
            </> : null}
        </div>
    )
}