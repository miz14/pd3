import FilterParam from "./FilterParam/filterParam";
import css from "./filter.module.scss";

export default function Filter({filters}) {

    return (
        <div className={css.filter_block}>
            {filters.map((el, idx) => {
                return(
                    <FilterParam key={idx} name={el["name"]} options={el["options"]}/>
                )
            })}
            <button>
                Выбрать
            </button>
        </div>
    )
}