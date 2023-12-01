import "./tableLine.scss";
import { Component } from "react";

class TableLine extends Component {
    constructor(props) {
        super(props)
        this.data = {data: props.data}
    }
    render() {
        let data = this.props.data
        const data_l = []
        for (let i = 0; i < data.length; i++) {
            data_l.push(
                <>
                <th>
                    {data[i]}
                </th>
                <th/>
                </>
            )
        }
        return (
            <tr>
                {data_l}
            </tr>
        )
    }
}

export default TableLine;