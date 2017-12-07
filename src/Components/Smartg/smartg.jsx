import React, { Component } from 'react';
import { render } from 'react-dom';
// import createFragment from 'react-addons-create-fragment';
import styles from './smartg.css';
import Data from '../../data.js';

import GlobalPerson from '../GlobalPerson/globalPerson';
import TianJinExplosion from '../TianJinExplosion/tianJinExplosion.js';
import GlobalPolyline from '../GlobalPolyline/globalPolyline';
import ChinaTrain from '../ChinaTrain/chinaTrain.js';
import BeijingDisaster from '../BeijingDisaster/beijingDisaster';
import GlobalSeismic from '../GlobalSeismic/globalSeismic';
import EducationCollage from '../EducationCollage/educationCollage';
import EducationMiddleschool from '../EducationMiddleschool/educationMiddleschool';
import EducationPrimaryschool from '../EducationPrimaryschool/educationPrimaryschool';
import EducationKindergarten from '../EducationKindergarten/educationKindergarten';
import EducationTechnicalschool from '../EducationTechnicalschool/educationTechnicalschool';
import BeijingBus from '../BeijingBus/beijingBus';
import Karpersky from '../Karpersky/Karpersky';

import Chengdu from '../Chengdu/chengdu';
import Volcano from '../Volcano/volcano.jsx';
import ChinaPerson from '../ChinaPerson/chinaPerson';
import ChinaOldPerson from '../ChinaOldPerson/chinaOldPerson';
import ChinaWorker from '../ChinaWorker/chinaWorker';
import PersonGlobal from '../PersonGlobal/personGlobal';
import Detail from '../Detail/detail';
import SinkiangPanorama from '../SinkiangPanorama/sinkiangPanorama.jsx';
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
        if (event.target.className === styles['themes-mainLi']) {
            event.target.className = `${styles.activeStyle} ${styles['themes-mainLi']}`
            event.target.nextSibling.className = '';
        } else {
            event.target.className = `${styles['themes-mainLi']}`
            event.target.nextSibling.className = `${styles['themes-mainLi-child']}`;
        }
    }
    render() {
        return (
            <ul>
                <li className={this.state.isActive} onClick={this.slideDown.bind(this)}>
                    {this.props.title}
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
            smartgInputMove: `${styles['smartgInputMoveL']} ${styles['smartg-input']} ${styles['fl']}`,
            isGoDown: `${styles['isMainVisble']} ${styles['smartg-list']}`,
            checkedArr: [],
            data: Data.details1,
            title: '社会焦点',
            themesTitles: [
                { title: '社会焦点', lists: [{ name: '天津爆炸微博评论', img: './src/assets/02_30.png' }] },
                { title: '学校分布', lists: [{ name: '全国大学分布', img: './src/assets/0.png' }, { name: '北京中学分布', img: './src/assets/07_30.png' }, { name: '全国主要城市小学分布', img: './src/assets/03_30.png' }, { name: '全国主要城市幼儿园分布', img: './src/assets/04_30.png' }, { name: '全国技术院校分布', img: './src/assets/05_30.png' }] },
                { title: '自然灾害', lists: [{ name: '北京地质灾害分布', img: './src/assets/06_300.png' }, { name: '全球地震分布', img: './src/assets/09_300.png' }, { name: '全球大地震事件', img: './src/assets/dizheng.png' },] },
                { title: '交通', lists: [{ name: '全球航线', img: './src/assets/30.png' }, { name: '全国火车站', img: './src/assets/10_30.png' }, { name: '北京市公交线路密度分布', img: './src/assets/01_30.png' }] },
                { title: '人口普查', lists: [{ name: '1970年全球人口数据', img: './src/assets/11_30.png' }, { name: '全球人口', img: './src/assets/12_30.png' }, { name: '中国人口', img: './src/assets/13_30.png' }, { name: '中国老年人口比例', img: './src/assets/14_30.png' }, { name: '中国就业人口', img: './src/assets/08_30.png' }] },
                { title: '街景', lists: [{ name: '西藏-川藏公路', img: './src/assets/15-30.png' }, { name: '新疆-新藏公路', img: './src/assets/xinjiang.png' }, { name: '三亚-三亚湾路', img: './src/assets/0.png' }, { name: '日本-小笠原诸島-父島', img: './src/assets/0.png' }] },
                { title: '国土', lists: [{ name: '国土11', img: './src/assets/0.png' }, { name: '国土22', img: './src/assets/0.png' }, { name: '国土33', img: './src/assets/0.png' }] },
                { title: '气象', lists: [{ name: '气象11', img: './src/assets/0.png' }, { name: '气象22', img: './src/assets/0.png' }] },
                { title: '智慧城市', lists: [{ name: '成都3D图', img: './src/assets/chengdu.png' }] },
                { title: '网络', lists: [{ name: '网络攻击示意', img: './src/assets/0.png' }] }
            ],
            themesContent: [
                { title: '社会焦点', lists: [<TianJinExplosion />] },
                { title: '学校分布', lists: [<EducationCollage />, <EducationMiddleschool />, <EducationPrimaryschool />, <EducationKindergarten />, <EducationTechnicalschool />] },
                { title: '自然灾害', lists: [<BeijingDisaster />, <GlobalSeismic />, <Volcano />] },
                { title: '交通', lists: [<GlobalPolyline />, <ChinaTrain />, <BeijingBus />] },
                { title: '人口普查', lists: [<GlobalPerson />, <PersonGlobal />, <ChinaPerson />, <ChinaOldPerson />, <ChinaWorker />] },
                { title: '街景', lists: [<TibetPanorama />, <SinkiangPanorama />, '三亚-三亚湾路', <OgasawaraIslands />] },
                { title: '国土', lists: ['国土11', '国土22', '国土33'] },
                { title: '气象', lists: ['气象11', '气象22'] },
                { title: '智慧城市', lists: [<Chengdu />] },
                { title: '网络', lists: [<Karpersky />] }
            ],
            currentTheme: ''
        };
    }
    goRight() {
        if (this.state.smartgInputMove === `${styles['smartgInputMoveL']} ${styles['smartg-input']} ${styles['fl']}`) {
            this.setState({ smartgInputMove: `${styles['smartgInputMoveR']} ${styles['smartg-input']} ${styles['fl']}` })
            document.querySelector(`.${styles['checked-item']}`).style.display = 'block';
        } else {
            this.setState({ smartgInputMove: `${styles['smartgInputMoveL']} ${styles['smartg-input']} ${styles['fl']}` })
            document.querySelector(`.${styles['checked-item']}`).style.display = 'none';
        }
        //针对下面的list部分
        if (this.state.isGoDown === styles['smartg-list']) {
            this.setState({ isGoDown: `${styles['isMainVisble']} ${styles['smartg-list']}` })
        }
    }
    goDown() {
        if (this.state.isGoDown === `${styles['isMainVisble']} ${styles['smartg-list']}`) {
            this.setState({ isGoDown: `${styles['smartg-list']}` })
        } else {
            this.setState({ isGoDown: `${styles['isMainVisble']} ${styles['smartg-list']}` })
        }
    }
    allChecked() {
        this.setState({ checkedArr: [] })
        document.querySelectorAll(`.${styles['smartgInput-li']}`).forEach((val, index) => {
            val.checked = false
        })
    }
    checkedEvents() {
        const re = this;
        // if(re.state.checkedArr.length >= 5){
        if (document.querySelectorAll(`.${styles['smartgInput-li']}:checked`).length > 5) {
            document.querySelectorAll(`.${styles['smartgInput-li']}:checked`)[document.querySelectorAll(`.${styles['smartgInput-li']}:checked`).length - 1].checked = false;
            alert("最多显示五个");
        } else {
            re.state.checkedArr = []
            const checkeds = document.querySelectorAll(`.${styles['smartgInput-li']}:checked`);
            checkeds.forEach((val, index) => {
                re.state.checkedArr.push(val.value)
            })
            re.setState({ checkedArr: re.state.checkedArr });
        }
    }
    removeChecked(msg, event) {
        //与多选列表中li联动
        this.state.checkedArr.splice(this.state.checkedArr.indexOf(msg), 1);
        this.setState({ checkedArr: this.state.checkedArr });
        document.querySelectorAll(`.${styles['smartgInput-li']}:checked`).forEach((val, index) => {
            if (val.value === msg) {
                val.checked = false
            }
        })
        //点击删除专题
        console.log(event.target.parentNode.style.background)
        if (event.target.parentNode.style.background == 'rgb(0, 152, 153)') {
            this.setState({ currentTheme: '' })
        }
    }
    slideUp() {
        this.setState({ liChild: styles['themes-mainLi-child'] })
        for (let i = 0; i < document.querySelectorAll(`.${styles['themes-main']} > ${'ul'} > ${'ul'}`).length; i++) {
            document.querySelectorAll(`.${styles['themes-main']} > ${'ul'} > ${'ul'}`)[i].className = `${styles['themes-mainLi-child']}`;
            document.querySelectorAll(`.${styles['themes-main']} > ${'ul'} > ${'li'}`)[i].className = `${styles['themes-mainLi']}`;
        }
    }
    addEffect(event) {
        const re = this;
        //改变当前选中样式
        for (let e = 0; e < document.querySelectorAll(`.${styles['checked-li']}`).length; e++) {
            document.querySelectorAll(`.${styles['checked-li']}`)[e].style.background = '#ebebeb';
            document.querySelectorAll(`.${styles['checked-li']}`)[e].style.color = '#818181';
        }
        event.target.parentNode.style.background = '#009899';
        event.target.parentNode.style.color = 'white';
        //添加当前专题        
        this.state.themesTitles.map((val, index) => {
            val.lists.map((value, item) => {
                if (value.name === event.target.innerText) {
                    (re.props.onsmartg)(event);
                    re.setState({ currentTheme: re.state.themesContent[index].lists[item] })
                }
            })
        })
        //多选列表收起来
        this.setState({ isGoDown: `${styles['isMainVisble']} ${styles['smartg-list']}` })
    }
    render() {
        return (
            <div>
                <div className={styles["smartg-main"]}>
                    <div className={`${styles["smartg-logo"]} ${styles.fl} `} onClick={this.goRight.bind(this)}>
                        <img src="./src/assets/globalsmartg1.png" />
                    </div>
                    <div className={this.state.smartgInputMove} >
                        <input placeholder="请输入关键字" />
                        <div className={styles["fr"]} onClick={this.goDown.bind(this)}>
                            <img src="./src/assets/themeslist.png" />
                        </div>
                    </div>
                    <div className={this.state.isGoDown}>
                        <div className={styles["ulList-title"]}>
                            <span>专题</span>
                            <p className={styles["fr"]} onClick={this.allChecked.bind(this)}>清除选择</p>
                        </div>
                        <div className={styles["themes-main"]}>
                            {
                                this.state.themesTitles.map(val =>
                                    <ListChunk title={val.title} lists={val.lists} checkEvents={this.checkedEvents.bind(this)} key={val.title.toString()}></ListChunk>
                                )
                            }
                        </div>
                        <div className={styles['bottom-slide']} onClick={this.slideUp.bind(this)}><img className={styles['shouqi-png']} src="./src/assets/shouqi.png" /></div>
                    </div>
                </div>
                <div className={styles["checked-item"]}>
                    <ul>
                        {
                            this.state.checkedArr.map(check =>
                                <li className={styles["checked-li"]} title={check} key={check.toString()}><span onClick={this.addEffect.bind(this)}>{check}</span><span onClick={this.removeChecked.bind(this, check)}>X</span></li>
                            )
                        }
                    </ul>
                </div>
                <div>{this.state.currentTheme}</div>
            </div>
        )
    }
}
export default SmartG;
