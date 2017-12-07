/**
 * 项目：Global
 * 文件：Earth.js
 * 作者：qianjing
 * 部门：产品研发部
 * 邮箱：jqian@mail.ie.ac.cn
 * 日期：2017-XX-XX HH:MM:SS
 * 用途：
 */

import React, { Component} from 'react';
import { render } from 'react-dom';
// import GeoVis from '../../../thirdParty/GeoVis-0.8.4/GeoVis';
import ThemeDom from '../ThemeDom/themeDom.jsx'
import SizeChange from '../SizeChange/sizeChange'
import styles from './Earth.css';

const GeoVis = window.GeoVis;
const Engine = window.Engine;

export default class Earth extends Component {
    constructor(props){
        super(props)
        this.state = {
            isReady : false
        }
    }

    valueChange(){
        this.setState({
            currentVal : document.querySelector('.range').value            
        })        
    }

    actionValue(event){        
        const re = this;
        //开始暂停      
        if(event.target.src.slice(event.target.src.indexOf("assets")) == 'assets/bobo.png'){
            clearInterval(re.clock)  
        }else{
            re.clock = setInterval(function(){        
                if(document.querySelector('.range').value >= re.state.max){
                    clearInterval(re.clock);
                }
                document.querySelector('.range').value ++;
                re.setState({
                    currentVal : document.querySelector('.range').value
                })
                console.log(re.state.currentVal)
            },1000)
        }
    }  

    clickfun(event){
        const re = this;
        let currentBtn;
        if(event.target.firstChild){
            currentBtn = event.target.firstChild.src.slice(event.target.firstChild.src.indexOf("assets"))
        }else{
            currentBtn = event.target.src.slice(event.target.src.indexOf("assets"))
        }
        switch (currentBtn){
            case 'assets/tongji.png':
                console.log("统计")
            break;
            case 'assets/shixu.png':
                if(re.state.isvisible){
                    re.setState({isvisible : ''})  
                }else{
                    re.setState({isvisible : `${styles['isvisible']}`}) 
                }
            break;
            case 'assets/fenji.png':
                console.log("分级....");
            break;
            default:alert("无此数据");
        }
    }  

    componentDidMount() {
        window.earth = new GeoVis.Earth('geovis-earth');
        const layer = new GeoVis.MultiTypeLayer('img').addTo(window.earth.layers);
        window.earth.scene.mode = Engine.SceneMode.SCENE2D;
        if(window.earth){
            this.setState({isReady : true})
        }
    }

    render() {
        return (
            <div>
                <div id="geovis-earth" className={styles['geovis-earth']}></div>                 
                {this.state.isReady ? <ThemeDom clickfun={this.clickfun.bind(this)}></ThemeDom> : ''}
                {this.state.isReady ? <SizeChange></SizeChange> : ''}
            </div>
        )
    }
}
