import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './navSlider.css';
import Button from '../Button/button';
import ButtonList from '../ButtonList/buttonList';
const imgList = [
                {
                    img: "./src/assets/tongji.png",
                    name: "统计",
                    pValue: '当前专题没有统计数据',
                    index: 'button4',
                },
                {
                    img: "./src/assets/shixu.png",
                    name: "时序",
                    pValue: '当前专题没有时序数据',
                    index: 'button5',
                },
                {
                    img: "./src/assets/fenji.png",
                    name: "分级",
                    pValue: '当前专题没有等级数据',
                    index: 'button6',
                }
            ]
class ButtonList2 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.isShixu){imgList.splice(1,1)}
        return (
            <div className={styles["sliderWrap2"]}>
                {
                    imgList.map((val, index2) =>
                        <Button key={index2} value={val.value} events={this.props.clickfun} buttonImg={val.img} index={val.index} buttonName={val.name} pValue={val.pValue} />
                    )
                }
            </div>
        )
    }
}
class NavSlider extends Component {
    render() {
        return (
            <div ref="doubleBtn" className={styles["navSlider"]}>
                <ButtonList />
                <ButtonList2 clickfun={this.props.clickfunction} isShixu={this.props.isShixu}/>
            </div>
        )
    }
}
export default NavSlider;
