import React from "react";
import {Button, InputNumber, Form} from 'antd';
import './index.scss';

class Control extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state ={
            info: {
                row:this.props.info.row,
                col:this.props.info.col
            },
        }
    }

    resetBoard = () => {
        this.props.resetBoard(
            this.state.info
        )
    }

    changeInfo(e: any, type: string) {
        let param = {}
        type === 'row' ? param = {row: e, col: this.state.info.col} : param = {row: this.state.info.row, col: e};
        this.setState({
            info:param
        })
    }

    render() {
        return <div className="control">
            <Form
                name="control"
            >
                <Form.Item label="row">
                    <InputNumber max={20} min={5} defaultValue={this.props.info.row}
                                 onChange={(e) => this.changeInfo(e, 'row')}></InputNumber>
                </Form.Item>
                <Form.Item label="col">
                    <InputNumber max={20} min={5} defaultValue={this.props.info.col}
                                 onChange={(e) => this.changeInfo(e, 'col')}></InputNumber>
                </Form.Item>
                <Button className="reset" type="default" onClick={this.resetBoard}>reset board</Button>
            </Form>
        </div>;
    }
}

export default Control;
