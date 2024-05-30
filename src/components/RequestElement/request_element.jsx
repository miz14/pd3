import { useState } from "preact/hooks"
import WORK_STATUS from "../../constant/work_status"

const RequestElement = ({data}) => {

    const [status, set_status] = useState(data.status)


    const accept_request = () => {
        set_status(WORK_STATUS.accept)
    }
    const reject_request = () => {
        set_status(WORK_STATUS.reject)
    }

    const reset_status = () => {
        set_status(WORK_STATUS.queue)
    }

    return(
        <>
        <div>
            {data.id + ' ' + status}
            <button onClick={() => {}}>Задание</button>
            {
            status === WORK_STATUS.queue?
            <>
            <button onClick={reject_request}>Отклонить</button>
            <button onClick={accept_request}>Принять</button>
            </>
            :
            <button onClick={reset_status}>Отменить</button>
            }
        </div>
        </>
    )
}

export default RequestElement