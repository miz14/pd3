import LabButtons from "../LabButtons/labButtons";
import css from "./TableLine.module.scss";

export default function TableLine({columns, columns_size, sep, teacher_buttons}) {
    const col_data = []
    for (let i = 0; i< 2 * columns.length - 1; i++) {
        if (i % 2 == 0) col_data.push(
        <div key={i/2} className={css.label_col} style={{"width" : columns_size[i/2]}}>
            {columns[i/2]}
        </div>
        )
        else col_data.push(<div key={i/2} className={css.label_line + " " + (sep? css.label_line_color : "")}/>)
    }
    return (
        <div className={css.table_label}>
            <div className={css.value}>
                {col_data}
            </div>
            {teacher_buttons? <LabButtons/> : null}
        </div> 
    )
};