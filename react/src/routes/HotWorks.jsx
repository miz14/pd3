import ListPageMaket from "../Components/ListPageMaket/listPagemaket";

export default function HotWorks() {

    const dict = {
        "date" : "04.11.23 - 12:30",
        "discipline" : "ООАИП",
        "dicsipline_color" : "var(--cl-lime)",
        "course" : "3Б",
        "group" : "ФИТ-211",
        "attempts" : "0",
        "labName" : "lab1.2"
    }
    const filters = [
        {
            "name" : "Курс",
            "options" : [
                {
                    "val" : "",
                    "text" : "Любой"
                }
            ]
        },
        {
            "name" : "Группа",
            "options" : [
                {
                    "val" : "",
                    "text" : "Любая"
                }
            ]
        }
    ]

    const data = [dict, dict, dict]
    
    return(    
        <ListPageMaket hot_works={data} filters={filters}/>
    )
}