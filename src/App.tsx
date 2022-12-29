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
            mine: [],
            clickedBlockIndexArr: [],
            gameState: this.gameStateSymbol.start,
            markedBlockArr: []
        }
        this.board = React.createRef();
    }

    gameStateSymbol = {
        start: Symbol(),
        fail: Symbol(),
        success: Symbol()
    }

    resetMine() {
        const mine: number[] = [];
        const count = Math.floor(this.state.info.col * this.state.info.row * 0.15625);
        for (let i = 0; i < count; i++) {
            let random = this.getRandomNumber();
            // 排除已经生成了地雷的地方和大于等于col*row的
            while (mine.includes(random) || random >= this.state.info.col * this.state.info.row) {
                random = this.getRandomNumber()
            }
            mine.push(random)
        }
        return mine;
    }

    /**
     * 生成 0 - 行 * 列 之间的整数
     */
    getRandomNumber() {
        return Math.round(Math.random() * this.state.info.col * this.state.info.row);
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
                    mine: this.resetMine(),
                    clickedBlockIndexArr: [],
                    markedBlockArr:[],
                    gameState: this.gameStateSymbol.start,
                })
            }
        )

    }
    /**
     * 点击 block回调函数
     * @param index 被点击的block的
     */
    blockClicked = (index: any) => {
        if (this.state.mine.includes(index)) {
            // 点击到地雷 游戏结束
            this.setState({
                gameState: Symbol('fail')
            })
        } else {
            // 添加到已经被点击过的数组中
            this.addToClickedBlockIndexArr([index]);

            let autoClickedBlockArr: Array<number> = []
            // 点击之后的递归逻辑
            if (index >= 0) {
                this.recursionClickBlock(index, autoClickedBlockArr);
                // 遍历之后将自动点击的添加到已经点击的列表中
                this.addToClickedBlockIndexArr(autoClickedBlockArr)
            }
        }
    }
    rightClicked = (index: number) => {
        if (this.state.markedBlockArr.includes(index)) {
            this.setState({
                markedBlockArr: this.state.markedBlockArr.filter((item: number) => item !== index)
            },()=>{
            })
        } else {
            this.setState({
                markedBlockArr: [...this.state.markedBlockArr, index]
            },()=>{
                const condition = this.state.mine.length === this.state.markedBlockArr.length && this.state.mine.filter((t:number) => !this.state.markedBlockArr.includes(t));
                if(condition){
                    this.setState({
                        gameState:this.gameStateSymbol.success
                    })
                }
            })
        }

    }
    getRoundArr = (index: number) => {
        let top, topLeft, topRight, left, right, bottom, bottomLeft, bottomRight;

        top = index - this.state.info.col;
        topRight = index - this.state.info.col + 1;
        topLeft = index - this.state.info.col - 1;

        left = index - 1;
        right = index + 1;

        bottom = index + this.state.info.col;
        bottomLeft = index + this.state.info.col - 1;
        bottomRight = index + this.state.info.col + 1;
        // 第一行没有top
        if (index < this.state.info.col) {
            top = null;
            topRight = null;
            topLeft = null;
        }
        // 最左边一列没有left
        if ((index + 1) % this.state.info.col === 1) {
            left = null;
            topLeft = null;
            bottomLeft = null;
        }
        // 最右边一列没有right
        if ((index + 1) % this.state.info.col === 0) {
            right = null;
            topRight = null;
            bottomRight = null;
        }
        // 最后一列没有bottom
        if (Math.ceil((index + 1) / this.state.info.col) === this.state.info.row) {

            bottom = null;
            bottomLeft = null;
            bottomRight = null;
        }
        const roundArray = [top, topLeft, topRight, left, right, bottom, bottomLeft, bottomRight]
        return roundArray.filter(item => item !== null)
    }

    /**
     * 遍历点击周围的没有雷的block
     * @param index
     */
    recursionClickBlock(index: number, autoClickedBlockArr: Array<number>) {
        // 已经被点击过的直接跳过|| 包含地雷的
        if (autoClickedBlockArr.includes(index) || this.state.clickedBlockIndexArr.includes(index) || this.state.mine.includes(index)) {
            return;
        }
        // 如果当前block周围的地雷的数量不为0 跳过
        autoClickedBlockArr.push(index)
        const roundArray = this.getRoundArr(index);
        // 周围的地雷数量
        let roundMineCount = 0;
        roundArray.forEach(i => {
            this.state.mine.includes(i) && roundMineCount++
        })
        if (roundMineCount > 0) {
            return;
        }
        // 遍历周围的block
        roundArray.forEach(index => {
            this.recursionClickBlock(index, autoClickedBlockArr)
        })
    }

    /**
     * 接受到的数组添加到已点击数组中 并且判断是否游戏胜利
     * @param arr
     */
    addToClickedBlockIndexArr = (arr: Array<number>) => {
        const set = new Set([...this.state.clickedBlockIndexArr, ...arr])
        return this.setState({
            // @ts-ignore
            clickedBlockIndexArr: [...set]
        },()=>{
            // 游戏胜利
            // 所有已选择的区块和地雷的区块
            let tempArr = [...this.state.mine,...this.state.markedBlockArr,...this.state.clickedBlockIndexArr]
            // @ts-ignore
            tempArr = [...new Set(tempArr)]
            if(tempArr.length === this.state.info.col * this.state.info.row){
                this.setState({
                    gameState:this.gameStateSymbol.success
                })
            }
        })
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
                    markedBlockArr={this.state.markedBlockArr}
                    blockClicked={(index: any) => {
                        this.blockClicked(index)
                    }}
                    rightClicked={(index: number) => {
                        this.rightClicked(index)
                    }}
                    gameStateSymbol={this.gameStateSymbol}
                    gameState={this.state.gameState}
                    ref={this.board}
                    mine={this.state.mine}
                    clickedBlockIndexArr={this.state.clickedBlockIndexArr}
                />
            </div>
        );
    }
}

export default App;
