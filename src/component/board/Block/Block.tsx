import React from "react";
import './index.scss'

class Block extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    rightClick = (e: any) => {
        e.preventDefault()
        this.props.rightClicked(this.props.index)
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
        const roundArray = [top, topLeft, topRight, left, right, bottom, bottomLeft, bottomRight, this.props.index]
        let roundMineCount: number = 0;
        roundArray.forEach(i => {
            this.props.mine.includes(i) && roundMineCount++
        })
        // 判断当前的block是否被点击过
        const BlockClicked: boolean = this.props.clickedBlockIndexArr.includes(this.props.index)
        /**
         * 右键点击
         */

        return (
            <div
                className={'block'}
                onClick={() => {
                    this.props.blockClicked(this.props.index)
                }}
                onContextMenu={this.rightClick.bind(this)}
                style={
                    {
                        width: 100 / this.props.info.col + '%',
                        height: 100 / this.props.info.row + '%',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: BlockClicked ? 'lightblue' : 'none'
                    }
                }>
                {/*地雷*/}
                {/*{this.props.mine.includes(this.props.index) ? 'B' : ''}*/}
                {/*标记*/}
                {this.props.markedBlockArr.includes(this.props.index) ? 'M' : ''}
                {/*周围地雷数量*/}
                {this.props.clickedBlockIndexArr.includes(this.props.index) && roundMineCount ? roundMineCount : ''}
            </div>
        );
    }
}

export default Block;
