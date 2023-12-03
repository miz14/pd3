import css from "./filterParam.module.scss";

export default function FilterParam({name, options}) {

    return (
        <div className={css.filter_param_block}>
            <h3>{name}</h3>
            <select className={css.param_list}>
                {options.map((el, idx) => {
                    return (
                        <option key={idx} value={el["val"]}>{el["text"]}</option>
                    )
                })}
            </select>
        </div>
    )
}