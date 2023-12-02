import "./tableLine.module.scss";

export default function TableLine({data}) {
    const data_l = []
    for (let i = 0; i < data.length; i++) {
        data_l.push(
            
            <div key={i}>
                {data[i]}
            </div>
        )
    }
    return (
        <div>
            {data_l}
        </div>     
    )
};