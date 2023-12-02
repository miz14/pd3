import css from "./courseGroup.module.scss";

export default function CourseGroup({course, group}) {

    return(
        <div className={css.crgr_block}>
            <span>
                <a href="">{course}</a>
            </span>
            
            <span>/</span>
            <span>
                <a href="">{group}</a>
            </span>
            
        </div>
    )
}