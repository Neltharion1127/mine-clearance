import React from "react";
import './index.scss'
import Block from './Block/Block'

class Board extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const blocks = () => {
            let count = this.props.info.row * this.props.info.col
            let ret = []
            for (let i = 0; i < count; i++) {
                ret.push(
                    <Block
                        key={i}
                        info={this.props.info}
                        index={i}
                        blockClicked={(index: any) => {
                            this.props.blockClicked(index)
                        }}
                        mine={this.props.mine}></Block>
                )
            }
            return ret;
        }
        return (<div className="board">
            {blocks()}
        </div>)
    }
}

export default Board;