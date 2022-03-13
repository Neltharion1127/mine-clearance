import React from "react";
import './index.scss'

class Block extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const top = this.props.index - this.props.info.col;
        const topLeft = this.props.index - this.props.info.col - 1;
        const topRight = this.props.index - this.props.info.col + 1;
        const left = this.props.index - 1;
        const right = this.props.index + 1;
        const bottom = this.props.index + this.props.info.col;
        const bottomLeft = this.props.index + this.props.info.col - 1;
        const bottomRight = this.props.index + this.props.info.col + 1;
        const roundArray = [top, topLeft, topRight, left, right, bottom, bottomLeft, bottomRight,this.props.index]
        let roundMineCount = 0;
        roundArray.forEach(i => {
            this.props.mine.includes(i) && roundMineCount++
        })
        return (<div
            className={'block'}
            onClick={() => {
                this.props.blockClicked(this.props.index)
            }}
            style={
                {
                    width: 100 / this.props.info.col + '%',
                    height: 100 / this.props.info.row + '%'
                }
            }>

            {this.props.mine.includes(this.props.index)?'B':''} {roundMineCount}
        </div>);
    }
}

export default Block;