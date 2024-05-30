import { useState } from "preact/hooks"
import { useSelector } from "react-redux"
import WORK_STATUS from "../../constant/work_status"

const HotWorksLaboratory = ({data}) => {

    const auth = useSelector(state => state.auth)
    const [status, set_status] = useState(data.status)


    const accept_laboratory = () => {
        set_status(WORK_STATUS.accept)
        
    }

    const undo_accept = () => {
        set_status(WORK_STATUS.queue)
    }

    return(
        <>
        <div>
            {data.id + ' ' + status}
            <button onClick={() => {}}>Задание</button>
            {
            status != WORK_STATUS.accept?
            <>
            <button onClick={() => {}}>Отклонить</button>
            <button onClick={accept_laboratory}>Принять</button>
            </>
            :
            <button onClick={undo_accept}>Отменить</button>
            }
        </div>
        </>
    )
}

export default HotWorksLaboratory