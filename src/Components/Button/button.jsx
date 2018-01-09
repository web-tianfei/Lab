import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './button.css';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            altShow: false,
            pShow: false,
            name: '',
            text: '',
        };
      
    }
    onmouseover() {
        this.setState(
            { altShow: true },

        );
    }
    onmouseleave() {
        this.setState(
            { altShow: false },
        )
    }
    render() {
        let a;
        this.state.name = this.state.altShow ? this.props.buttonName : '';
        this.state.text = this.state.pShow ? this.props.pValue : '';
        this.state.img = this.state.altShow? <img src='./src/assets/低栏.png' alt="w" /> : '';
        switch(this.props.index){
            case 'button4':a=styles.button4;break;
            case 'button5':a=styles.button5;break;
            case 'button6':a=styles.button6;break;
        };
        return (
            <div className={a}>
                <button onClick={this.props.events} onMouseLeave={this.onmouseleave.bind(this)} onMouseEnter={this.onmouseover.bind(this)}>{this.props.value}<img src={this.props.buttonImg} /></button>
                <span>{this.state.name}</span> 
                {this.state.img}
            </div>
        )
    }
}


export default Button
