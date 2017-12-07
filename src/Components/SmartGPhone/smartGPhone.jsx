import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import createFragment from 'react-addons-create-fragment';
import styles from './smartGPhone.css';
import Data from '../../data.js';

import GlobalPerson from '../GlobalPerson/globalPerson';
import TianJinExplosion from '../TianJinExplosion/tianJinExplosion.js';
import GlobalPolyline from '../GlobalPolyline/globalPolyline';
import ChinaTrain from '../ChinaTrain/chinaTrain.js';
import BeijingDisaster from '../BeijingDisaster/beijingDisaster';
import GlobalSeismic from '../GlobalSeismic/globalSeismic';
import EducationCollage from '../EducationCollage/educationCollage'
import EducationMiddleschool from '../EducationMiddleschool/educationMiddleschool'
import EducationPrimaryschool from '../EducationPrimaryschool/educationPrimaryschool'
import EducationKindergarten from '../EducationKindergarten/educationKindergarten'
import EducationTechnicalschool from '../EducationTechnicalschool/educationTechnicalschool'
import BeijingBus from '../BeijingBus/beijingBus'


import Chengdu from '../Chengdu/chengdu'
import Volcano from '../Volcano/volcano.jsx'
import ChinaPerson from '../ChinaPerson/chinaPerson';
import ChinaOldPerson from '../ChinaOldPerson/chinaOldPerson';
import ChinaWorker from '../ChinaWorker/chinaWorker';
import PersonGlobal from '../PersonGlobal/personGlobal';
import Detail from '../Detail/detail';
import TibetPanorama from '../TibetPanorama/TibetPanorama';
import OgasawaraIslands from '../OgasawaraIslands/OgasawaraIslands';



//单个专题的list
class SingerList extends Component {
    render() {
        return (
            <ul className={this.props.class}>
                {
                    this.props.lists.map(con =>
                        <li key={con.name}>
                            <input id={con.name} type="checkbox" onClick={this.props.checkboxEvent} value={con.name} className={styles["smartgInput-li"]} />
                            <img onClick={this.props.checkboxEvent} className={styles["smartgInput-liImg"]} src={con.img} />
                            <label className={styles['label-input']} htmlFor={con.name} >{con.name}</label>
                        </li>
                    )
                }
            </ul>
        )
    }
}
//专题列表
class ListChunk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: styles['themes-mainLi'],
            lists: ['全部11', '全部22', '全部33', '全部44', '全部55'],
            liChild: styles['themes-mainLi-child']
        };
    }
    slideDown(event) {
        if(event.target.childNodes.length > 0){
            if (event.target.className === styles['themes-mainLi']) {
                event.target.className = `${styles.activeStyle} ${styles['themes-mainLi']}`
                event.target.nextSibling.className = '';
                event.target.lastChild.src = './src/assets/xiajian.png';
                event.target.lastChild.style.margin = '21px 25px';
            } else {
                event.target.className = `${styles['themes-mainLi']}`
                event.target.nextSibling.className = `${styles['themes-mainLi-child']}`;
                event.target.lastChild.src = './src/assets/youjian.png';
                event.target.lastChild.style.margin = '18px 25px';
            }
        }
    }
    render() {
        return (
            <ul>
                <li className={this.state.isActive} onClick={this.slideDown.bind(this)}>
                    <img className={styles["smartg-titlePng"]} src={this.props.titlelogo} />
                    {this.props.title}
                    <img className={styles["smartg-titlegoPng"]} src="./src/assets/youjian.png" />
                </li>
                <SingerList lists={this.props.lists} class={this.state.liChild} checkboxEvent={this.props.checkEvents}></SingerList>
            </ul>
        )
    }
}

class SmartG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoLeft: true,
            smartgInputMove: `${styles['smartg-input']} ${styles['fl']}`,
            isGoDown: `${styles['smartg-list']}`,
            checkedArr: [],
            data: Data.details1,
            title: '社会焦点',
            isReady : false,
            themesTitles : [],
            imgList : ["./src/assets/shehuijiaodian.png","./src/assets/scholl.png" ,"./src/assets/ziranzaihai.png" ,"./src/assets/jiaotong.png" ,"./src/assets/personcha.png" ,"./src/assets/jiejing.png" ,"./src/assets/zhihuic.png" ],
            themesTitles2: [
                { title: '社会焦点', img : "./src/assets/shehuijiaodian.png" , lists: [  {'name' : '天津爆炸', 'img':'./src/assets/02_30.png'}] },
                { title: '学校分布', img : "./src/assets/scholl.png" , lists: [ {'name' : '全国大学分布', 'img':'./src/assets/0.png'},  {'name' : '北京中学分布', 'img':'./src/assets/07_30.png'},  {'name' : '全国主要城市小学分布', 'img':'./src/assets/03_30.png'},  {'name' : '全国主要城市幼儿园分布', 'img':'./src/assets/04_30.png'},  {'name' : '全国技术院校分布', 'img':'./src/assets/05_30.png'}] },
                { title: '自然灾害', img : "./src/assets/ziranzaihai.png" , lists: [ {'name' : '北京地质灾害', 'img':'./src/assets/06_300.png'},  {'name' : '全球地震分布', 'img':'./src/assets/09_300.png'} ] },
                { title: '交通', img : "./src/assets/jiaotong.png" , lists: [ {'name' : '全球航线', 'img':'./src/assets/30.png'},  {'name' : '全国火车站', 'img':'./src/assets/10_30.png'} ,  {'name' : '北京市公交线路密度分布', 'img':'./src/assets/01_30.png'}] },
                { title: '人口普查', img : "./src/assets/personcha.png" , lists: [ {'name' : '1970年全球人口', 'img':'./src/assets/11_30.png'},  {'name' : '全球人口', 'img':'./src/assets/12_30.png'},  {'name' : '中国人口比例', 'img':'./src/assets/13_30.png'},  {'name' : '中国老年人口比例', 'img':'./src/assets/14_30.png'},  {'name' : '中国就业人口', 'img':'./src/assets/08_30.png'}] },
                { title: '街景', img : "./src/assets/jiejing.png" , lists: [ {'name' : '西藏-川藏公路', 'img':'./src/assets/15_30.png'}]},
                { title: '智慧城市', img : "./src/assets/zhihuic.png" , lists: [ {'name' : '成都3D图', 'img':'./src/assets/chengdu.png'}] },                
            ]
        };
    }
    componentWillMount(){
        // const re = this;
        // let toke = 'feaQuaIKtUxemo8maVp4q8AO+qJj0qN2h1TZdKvLHCogm5zgLiTc1oXdQq8/akUbfqm/2c/njmGOp3QqTweoctXYV17RC9myFmeqt2wnxfHJMcUPQ3jNMAm4wY+im/PmoHGHknyzmzoj/ftsR3YnzeqLL+cIOywHCo/AuU5YyDA=';
        // fetch("http://192.168.48.3:8808/metadata-service/metadata/manage/query", {
        //       method: "POST",
        //       headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //       },
        //       body: "dataType=LAB0&token="+toke+""
        //     }).then(function(response) {
        //         response.json().then( (dataval) => {
        //             let allArr = [];
        //             let emptyArr = [];                    
        //             let listArr = [];
        //             let titleArr = [];
        //             dataval.map( (val) => {
        //                 if(titleArr.indexOf(val.subject) == -1){
        //                     titleArr.push(val.subject)
        //                 }
        //             })                    
        //             titleArr.map( (value) => {
        //                 dataval.map( (val) => {    
        //                     if(val.subject == value){
        //                         listArr.push({ name: val.tag, img: val.icon})                                
        //                     }
        //                 }) 
        //                 emptyArr.push({ 
        //                     title: value, 
        //                     img : re.state.imgList,
        //                     lists: listArr
        //                 })
        //                 allArr.push(emptyArr)
        //                 emptyArr = []; 
        //                 listArr = [];                      
        //             })
        //             re.setState({
        //                 themesTitles : allArr,
        //                 isReady : true
        //             })
        //         })
        // });
    }
    componentDidMount(){
        const re = this;
        document.querySelectorAll(`.${styles['smartg-main']}`)[0].style.height = (window.innerHeight-60)+'px';
        document.querySelectorAll(`.${styles['smartg-list']}`)[0].style.height = (window.innerHeight-60)+'px';
        document.querySelectorAll(`.${styles['themes-main']}`)[0].style.height = (window.innerHeight-140)+'px';
        //监听输入框 input时 其中的值 实时展示小g中的内容
        this.refs.inputVal.addEventListener("input", function(){
            //当输入框内容为空 展示xiaog中所有专题
            // if(this.value == ''){
                // re.searchTheme()
            // }
        });
        //监听input回车
        this.refs.inputVal.addEventListener("keydown", function(event){
            //当输入框内容为空 展示xiaog中所有专题
            if(event.keyCode == '13'){
                // re.searchTheme()
            }
        });
    }
    allChecked() {
        this.setState({ checkedArr: [] })
        document.querySelectorAll(`.${styles['smartgInput-li']}`).forEach((val, index) => {
            val.checked = false
        })
    }
    checkedEvents(event) {
        let hrefCon = event.target.value;
        window.location.href ="http://m.lab.geovis.ai:10019/#/earth/"+hrefCon+""; 
    }
    slideUp() {
        this.setState({ liChild: styles['themes-mainLi-child'] })
        for (let i = 0; i < document.querySelectorAll(`.${styles['themes-main']} > ${'ul'} > ${'ul'}`).length; i++) {
            document.querySelectorAll(`.${styles['themes-main']} > ${'ul'} > ${'ul'}`)[i].className = `${styles['themes-mainLi-child']}`;
            document.querySelectorAll(`.${styles['themes-main']} > ${'ul'} > ${'li'}`)[i].className = `${styles['themes-mainLi']}`;
        }
    }
    searchTheme(){
        
        let paramName = this.refs.inputVal.value;
        const re = this;
        let toke = 'feaQuaIKtUxemo8maVp4q8AO+qJj0qN2h1TZdKvLHCogm5zgLiTc1oXdQq8/akUbfqm/2c/njmGOp3QqTweoctXYV17RC9myFmeqt2wnxfHJMcUPQ3jNMAm4wY+im/PmoHGHknyzmzoj/ftsR3YnzeqLL+cIOywHCo/AuU5YyDA=';
        fetch("http://192.168.48.3:8808/metadata-service/metadata/manage/query", {
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: "dataType=LAB0&name="+paramName+"&token="+toke+""
            }).then(function(response) {
                response.json().then( (dataval) => {
                    console.log(dataval)
                    let allArr = [];
                    let emptyArr = [];                    
                    let listArr = [];
                    let titleArr = [];
                    dataval.map( (val) => {
                        if(titleArr.indexOf(val.subject) == -1){
                            titleArr.push(val.subject)
                        }
                    })                    
                    titleArr.map( (value) => {
                        dataval.map( (val) => {    
                            if(val.subject == value){
                                listArr.push({ name: val.tag, img: val.icon})                                
                            }
                        }) 
                        emptyArr.push({ 
                            title: value, 
                            img : re.state.imgList,
                            lists: listArr
                        })
                        allArr.push(emptyArr)
                        emptyArr = []; 
                        listArr = [];                      
                    })
                    console.log(allArr)
                    re.setState({
                        themesTitles : allArr,
                        isReady : true
                    })
                })
        });
    }
    render() {
        return (
            <div>
                <div className={styles["smartg-top"]}>
                    <Link to="/">GV Lab</Link>
                    <div className={styles["smartg-search"]}>
                        <div className={`${styles["smartg-logo"]} ${styles.fl} `}>
                            <img src="./src/assets/globalsmartg1.png" />
                        </div>
                        <div className={this.state.smartgInputMove} >
                            <input ref="inputVal" placeholder="请输入关键字" />
                            <div onClick={this.searchTheme.bind(this)} className={styles["fr"]}>
                                <img src="./src/assets/search.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["smartg-main"]}>                    
                    <div className={this.state.isGoDown}>
                        <div className={styles["ulList-title"]}>
                            <span>专题</span>
                            <p className={styles["fr"]} onClick={this.allChecked.bind(this)}>清除选择</p>
                        </div>                        
                        <div className={styles["themes-main"]}> 
                        {                           
                            this.state.themesTitles2.map((val, index) =>
                                    <ListChunk title={val.title} titlelogo={val.img} lists={val.lists} checkEvents={this.checkedEvents.bind(this)} key={val.title.toString()}></ListChunk>
                                ) 
                        }                           
                        </div>
                        <div className={styles['bottom-slide']} onClick={this.slideUp.bind(this)}><img className={styles['shouqi-png']} src="./src/assets/shouqi.png" /></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SmartG;
