import "./TableLabels.scss";
import { Component } from "react";

class TableLabels extends Component {
    constructor(props) {
        super(props)
        this.columns = {columns: props.columns}
    }

    render() {
        const col = this.props.columns;
        const col_data = []
        for (let i = 0; i < col.length; i++) {
            col_data.push(
                <>
                <th className="label-col">
                {col[i]}
                </th>
                <th className="label-line">

                </th>
                </>
            )
        }
        // const col_data = col.map((el, i) => 
            
        //     <th key={i} scope="col" className="label-col">
        //         {el}
        //     </th>
        //     <th scope="col" className="label-line">

        //     </th>
            
            
        // )
        return (
            <tr className="table-label">
                {col_data}
                {/* {col.map((el, idx) => {
                    return (

                        <th key = {idx} scope="col" className="label-col">
                            {el}
                        </th>
                        // <th key = {idx} scope="col" className="label-line">

                        // </th>
                    )
                })} */}
            </tr> 
        )
    }
}

export default TableLabels;