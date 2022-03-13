import React from "react";
import './App.css';
import Board from './component/board/board'
import Control from "./component/control/control";

class App extends React.Component<any, any> {
    board: any

    constructor(props: any) {
        super(props)
        this.state = {
            info: {
                col: 10,
                row: 10
            },
            mine: []
        }
        this.board = React.createRef();
    }

    resetMine() {
        const mine: number[] = [];
        const count = Math.floor(this.state.info.col * this.state.info.row / 10);
        for (let i = 0; i < count; i++) {
            let random = this.getRandomNumber()
            while (mine.includes(random)) {
                random = this.getRandomNumber()
            }
            mine.push(random)
        }
        console.log(mine.sort((a,b)=>a-b))
        return mine;
    }

    getRandomNumber() {
        return Math.round(Math.random() * this.state.info.col * this.state.info.row)+1;
    }

    componentDidMount() {
        this.setState({
            mine: this.resetMine()
        })
    }
    /**
     * 重置
     * @param e
     */
    resetBoard = (e: any) => {
        this.setState(
            {
                info: e
            }, () => {
                this.setState({
                    mine: this.resetMine()
                })
            }
        )

    }
    blockClicked = (index:any) => {
        console.log(this.state.mine)
        if(this.state.mine.includes(index+1)){
            console.log(false)
        } else {
            console.log(true)
        }
    }

    render() {
        return (
            <div className="App">
                <Control info={this.state.info}
                         resetBoard={(e: any) => {
                             this.resetBoard(e)
                         }}/>
                <Board
                    info={this.state.info}
                    blockClicked={(index:any)=>{this.blockClicked(index)}}
                    ref={this.board}
                    mine={this.state.mine}
                />
            </div>
        );
    }
}

export default App;
