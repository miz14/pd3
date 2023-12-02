import css from "./TableLabels.module.scss";

export default function TableLabels({columns}) {
    const col_data = []
    for (let i = 0; i< 2 * columns.length - 1; i++) {
        if (i % 2 == 0) col_data.push(
        <div key={i/2} className={css.label_col}>
            {columns[i/2]}
        </div>
        )
        else col_data.push(<div key={i/2} className={css.label_line}/>)
    }
    return (
        <div className={css.table_label}>

            {col_data}
            
        </div> 
    )
};