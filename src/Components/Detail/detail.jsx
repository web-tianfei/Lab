import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './detail.css'

class Detail extends Component{
    
    render(){
        return(
            
                <div className={styles["table-pop"]} ref='table'>
                     
                    <div className={styles['pop1']}><span>{this.props.row2Col1}</span></div>
                    <div className={styles['pop2']}><span>{this.props.row1Col2}：{this.props.row2Col2}</span></div>
                </div>
            
        )
    }
}
export default Detail

            