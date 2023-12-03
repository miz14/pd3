import LabButtons from "../LabButtons/labButtons";
import css from "./TableLine.module.scss";

export default function TableLine({columns, columns_size, sep, teacher_buttons, problem, bg}) {
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
        <div className={css.table_label + " " + (bg? css.table_label_bg : null)}>
            <div className={css.left}>
                <div className={css.value}>
                    {col_data}
                </div>
                {problem? 
                <div className={css.problem}>
                    <div className={css.problem_label}>
                        Проблема:
                    </div>
                    <div className={css.problem_place}>
                        <div className={css.problem_place_text}>
                            131232 2312 313 23 213 123 123 1 313 1 12321 321 321
                            231 3
                            1312321  43 4234 24 
                            232 43424 34243
                        </div>
                    </div>
                </div> : null}
            </div>
            {teacher_buttons? <LabButtons/> : null}
        </div> 
    )
};