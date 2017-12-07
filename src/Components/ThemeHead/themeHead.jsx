import React, {Component} from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import styles from './themeHead.css'

const toolsList = [
    {
        img: './src/assets/liangce.png',
        name: '量测'
    },
    {
        img: './src/assets/biaohui.png',
        name: '标绘'
    },
    {
        img: './src/assets/chutu.png',
        name: '出图'
    },
    {
        img: './src/assets/qingchu.png',
        name: '清除'
    },
    {
        img: './src/assets/allmovies.png',
        name: '全屏'
    }
]
const toolsList2 = [
    {
        img: './src/assets/liangce.png',
        name: '量测'
    },
    {
        img: './src/assets/biaohui.png',
        name: '标绘'
    },
    {
        img: './src/assets/chutu.png',
        name: '出图'
    },
    {
        img: './src/assets/qingchu.png',
        name: '清除'
    },
    {
        img: './src/assets/allmovies.png',
        name: '退出全屏'
    }
]

class ToolsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toolItem : toolsList
        };
    }
    toolFun(obj){        
        const name = obj.name;
        switch (name){
            case '量测':
                
            break;
            case '标绘':
                
            break;
            case '出图':
                
            break;
            case '清除':
                
            break;
            case '全屏':
                this.setState({toolItem : toolsList2})
                //根节点
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
            break;
            case '退出全屏':
                this.setState({toolItem : toolsList})
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            break;
            default : alert('无此按钮') ;
        }
    }
    render() {
        return (
            <ul className={styles["tools-ul"]}>
                {
                    this.state.toolItem.map((val, index) => 
                        <li key={index} onClick={this.toolFun.bind(this,val)}><img alt="" src={val.img} /><span>{val.name}</span></li>
                    )
                }
            </ul>
        )
    }
}

class ThemeHead extends Component {
    render() {
        return (
            <div className={styles["themes-header"]}>
                <Link to="/smartGPhone">
                    <img src="./src/assets/globalsmartg1.png" />                    
                    <div className={styles["themes-goHome"]}>
                        <p>小G</p>
                        <p>GV Lab</p>
                    </div>
                </Link>
                <div onClick={this.props.actionTool} className={styles["tool-slide"]}>
                    <img alt="gotool" src="./src/assets/themeslist.png" />
                </div>                
            </div>
        )
    }
}
export default ThemeHead;
