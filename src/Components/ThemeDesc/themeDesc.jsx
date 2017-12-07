import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './themeDesc.css'

class ThemeDesc extends Component{
	render(){
		return (
			<div>
				<div className={styles["theme-title"]}>{this.props.title}</div>				
			</div>
		)
	}
}

export default ThemeDesc