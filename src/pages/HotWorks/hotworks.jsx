import HotWorksLaboratory from "../../components/HotWorksLaboratory/hotworks_laboratory";
import style from './hotworks.module.scss'

const HotWorks = () => {

    const data = [
        {
            group: [
                {
                    id: 1,
                    deadline: '04.11.23',
                    subject: 'ООАИП',
                    student_name: 'Иванов И.И.',
                    lab_name: 'lab1',
                    try_count: 1,
                    task_link: 'link',
                    status: 'в очереди'            
                },
                {
                    id: 2,
                    deadline: '04.11.23',
                    subject: 'ООАИП',
                    student_name: 'Иванов И.И.',
                    lab_name: 'lab1',
                    try_count: 1,
                    task_link: 'link',
                    status: 'в очереди'            
                }
            ]

        },
        {
            id: 3,
            deadline: '04.11.23',
            subject: 'ООАИП',
            student_name: 'Иванов И.И.',
            lab_name: 'lab1',
            try_count: 1,
            task_link: 'link',
            status: 'в очереди'            
        }

    ]


    return(
        <>
        <div className={style.filters}>
            <input placeholder="Предмет"></input>
            <input placeholder="Группа"></input>
            <button>Применить</button>
        </div>
        <div>
            {data.map(x => 
                x.group != undefined?
                <div key={x.group[0].id}>{x.group.map(y => 
                    // <div key={y.id}>{y.id}</div>
                    <HotWorksLaboratory key={y.id} data={y}/>
                )}
                </div>
                :
                <HotWorksLaboratory key={x.id} data={x}/>
)}
        </div>
        </>
    )
}

export default HotWorks