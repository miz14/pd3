import TableLabels from "./TableLabels/tableLabels";
import TableLine from "./TableLine/tableLine";
import "./listPageMaket.scss";
import { Children } from "react";

const ListPageMaket = (Children) => {
    return (
        <div className="main-block">
            <div>
                
            </div>
            <table>
                <tbody>

                    <TableLabels columns={["Дата", "Дисциплина", "Курс/группа", "Попыток сдачи", "Название работы"]}/>
                    <TableLine data={["04.11.23 - 12:30", "ООАИП", "3-б/ФИТ-211", "0", "lab1.2"]}/>
                </tbody>
            </table>
        </div>
    )
}

export default ListPageMaket;