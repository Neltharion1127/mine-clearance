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
                        rightClicked={(index: any) => {
                            this.props.rightClicked(index)
                        }}
                        mine={this.props.mine}
                        clickedBlockIndexArr ={this.props.clickedBlockIndexArr}
                        markedBlockArr={this.props.markedBlockArr}
                    ></Block>
                )
            }
            return ret;
        }
        if(this.props.gameStateSymbol.start === this.props.gameState){
            return (<div className="board">
                {blocks()}
            </div>)
        }
        if(this.props.gameStateSymbol.success === this.props.gameState){
            return (<div className="board">
                <div className="board-result">
                    <p>
                        :)
                    </p>
                </div>
            </div>)
        }
        else {
            return (<div className="board">
                <div className="board-result">
                    <p>
                        :(
                    </p>
                </div>
            </div>)
        }

    }
}

export default Board;
