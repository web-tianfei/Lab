import React, {Component} from 'react'
import {render} from 'react-dom'
import styles from './themeDom.css'
import ThemeHead from '../ThemeHead/themeHead'
import NavSlider from '../NavSlider/navSlider.jsx'

class ThemeDom extends Component {
    constructor(props){
        super(props);
        this.state={
            isShixu:false,
        }
    }
    onChildClick(e){
        
        if(e.target.innerText==='中国人口'){
            
            this.setState({
                isShixu:true,
            })
        }
    }
    actionTool(event){  
        console.log(event.target.parentNode.style.borderColor)     
        if(!event.target.parentNode.style.borderColor || event.target.parentNode.style.borderColor == 'rgb(53, 63, 66)'){
           this.refs.navSlider.refs.doubleBtn.className = `${styles['navSlider']} ${styles['navSlider2']}`; 
           event.target.parentNode.style.borderColor = '#7d7d7d';
           console.log('aa')
        }else{
            this.refs.navSlider.refs.doubleBtn.className = `${styles['navSlider']} ${styles['navSlider3']}`; 
            event.target.parentNode.style.borderColor = '#353F42'
            console.log("bb")
        }
        
    }
    render(){
        return (
            <div className={styles['outer-themesdom']}>
                <ThemeHead actionTool={this.actionTool.bind(this)}></ThemeHead>
                <NavSlider ref="navSlider" clickfunction={this.props.clickfun} isShixu={this.state.isShixu}></NavSlider>                
            </div>
        )
    }
}
export default ThemeDom;
