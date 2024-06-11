import RequestElement from "../../components/RequestElement/request_element"

const Requests = () => {

    const data = [
        {
            id: 1,
            lab_id: 1,
            date: '04.11.23',
            subject: 'ООАИП',
            student_name: 'Иванов И.И.',
            lab_name: 'lab1',
            try_count: 1,
            task_link: 'link',
            status: 'в очереди',
            problem_text: 'проблема ...'            
        },
        {
            id: 1,
            lab_id: 1,
            date: '04.11.23',
            subject: 'ООАИП',
            student_name: 'Иванов И.И.',
            lab_name: 'lab1',
            try_count: 1,
            task_link: 'link',
            status: 'в очереди',
            problem_text: 'проблема ...'            
        },
    ]
    return (
        <>
        <div>
            <input placeholder="Предмет"></input>
            <input placeholder="Группа"></input>
            <input placeholder="Проблема"></input>
            <button>Применить</button>
        </div>
        <div>
            {data.map(x => 
                    <RequestElement key={x.id} data={x}/>
)}
        </div>
        </>
    )
}

export default Requests