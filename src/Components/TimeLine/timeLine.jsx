import React,{Component} from 'react'
import {render} from 'react-dom'
import styles from './timeLine.css'

class TimeLine extends Component{
	constructor(props){
		super(props)
		this.state = {
			begin : './src/assets/bobo.png'
		}
	}
	tabImg(){
		if(this.state.begin == './src/assets/bobo.png'){
			this.setState({begin : './src/assets/zant.png'})
		}else{
			this.setState({begin : './src/assets/bobo.png'})
		}
	}
	render(){		
		return (
			<div className={`${styles['time-line']} ${this.props.isvisible}`}>
				<img className="beginBtn"  onMouseDown={this.tabImg.bind(this)} onClick={this.props.actionVal} src={this.state.begin} />
				<span>{this.props.mintime}</span>
				<div className={styles["center-main"]}>
					<input className="range" ref="rangeval" type="range" defaultValue={this.props.value} max={this.props.max} min={this.props.min} onInput={this.props.valChange} />
					<p>{this.props.nowVal}</p>
				</div>
				<span className={styles["fr"]}>{this.props.maxtime}</span>
			</div>
		)
	}
}
export default TimeLine;