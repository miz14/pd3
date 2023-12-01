//мб на потом <Container width="200"> child <Container/>
import React from "react";
import "./container.scss"

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.width = {width: props.width}
    }
    render() {
        const style = {
            width: this.props.width + "px"
        }
        return (
            <div className="container" style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default Container;