import Header from "../Components/Header/header"
import TableLabels from "../Components/ListPageMaket/TableLine/tableLine";
import ListPageMaket from "../Components/ListPageMaket/listPagemaket";

export default function DefaultPage() {

    const dict = {
        "date" : "04.11.23 - 12:30",
        "discipline" : "ООАИП",
        "dicsipline_color" : "var(--cl-lime)",
        "course" : "3-б",
        "group" : "ФИТ-211",
        "attempts" : "0",
        "labName" : "lab1.2"
    }

    const data = [dict, dict, dict]
    
    return(
        <>
            <Header/>
            <ListPageMaket hot_works={data}/>
        </>
    )
}