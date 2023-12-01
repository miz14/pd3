import React from "react";
import "./navItem.scss";

class NavItem extends React.Component {
    constructor(props) {
        super(props)
        this.name = {width: props.name}
        this.count = {count: props.count}
        this.status = {status: props.status}
    }

    render() {
        return(
            <button>
                <div>
                    <span className="name">{this.props.name}</span>
                    {this.props.count? <span className="count">{"(" + this.props.count + ")"}</span> : null}
                </div>
                <rect className={"line" + (this.props.status == "1"? " line-active": null)}/>
            </button>
        )
    }

}

export default NavItem