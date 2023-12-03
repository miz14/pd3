import ListPageMaket from "../Components/ListPageMaket/listPagemaket";

export default function Request() {
    const filters = [
        {
            "name" : "Проблема",
            "options" : [
                {
                    "val" : "",
                    "text" : "Любая",
                }
            ]
        }
    ]

    const dict = {
        "date" : "04.11.23 - 12:30",
        "discipline" : "ООАИП",
        "dicsipline_color" : "var(--cl-lime)",
        "course" : "3Б",
        "group" : "ФИТ-211",
        "attempts" : "0",
        "labName" : "lab1.2",
        "problem" : "Не нажат пул реквест"
    }
    const req = [dict, dict, dict]
    return(
        <ListPageMaket requests={req} filters={filters}/>
    )
}