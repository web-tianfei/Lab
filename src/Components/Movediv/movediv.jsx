import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './movediv.css';
import Legend from '../Legend/legend';
import Detail from '../Detail/detail';

class Movediv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left: 0,
            top: 0,
            currentX: 0,
            currentY: 0,
            flag: false
        }
    }
    startDrag(e) {
        // var dragBox=document.getElementById('form');
        var newState = {};
        var event = e || window.event;
        event.preventDefault();
        // var computedStyle=document.defaultView.getComputedStyle(dragBox,null);
        // newState.left=computedStyle.left;
        // newState.top=computedStyle.top;
        newState.currentX = event.clientX;
        newState.currentY = event.clientY;
        newState.flag = true;
        // this.props.callbackParent(newState);
         /*以下为修改处*/
        var dragBoxs = document.querySelector('#movediv')
        var computedStyle = document.defaultView.getComputedStyle((dragBoxs), null);
        newState.left = computedStyle.left;
        newState.top = computedStyle.top;
        /*以上为修改处*/
        this.setState(newState);

    }

  

    move(event) {
        var e = event ? event : window.event;
        var dBox = (this.refs.dragBox);
        if (this.state.flag) {
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - this.state.currentX, disY = nowY - this.state.currentY;
            /*增加拖拽范围检测*/
            var currentLeft = parseInt(this.state.left) + disX;
            var currentTop = parseInt(this.state.top) + disY;
            var docX = document.documentElement.clientWidth || document.body.clientWidth;
            var docY = document.documentElement.clientHeight || document.body.clientHeight;
            if (currentLeft <= 0) {//检测屏幕左边，因为我这里的初始居中是利用了负1/2的盒子宽度，所以用250px判断边界
                dBox.style.left = 0 + "px";
            } else if (currentLeft >= (docX - dBox.offsetWidth )) {
                dBox.style.left = (docX - this.state.offsetX) + "px";
            } else {
                dBox.style.left = currentLeft + "px";
            }
            if (currentTop <= 50) { //检测屏幕上边，因为我这里的初始居中是利用了负1/2的盒子高度，所以用200px判断边界
                dBox.style.top = 50 + "px";
            } else if (currentTop >= (docY - dBox.offsetHeight )) {
                dBox.style.top = (docY - this.state.offsetY) + "px";
            } else {
                dBox.style.top = currentTop + "px";
            }
        }
    }
    endDrag() {
        var computedStyle = document.defaultView.getComputedStyle((document.querySelector('#movediv')), null);
        this.setState({
            left: computedStyle.left,
            top: computedStyle.top,
            flag: false
        });
    }
    /*
    组件被装载后才会被调用，也就是说调用这个方法的时候，
    组件已经被渲染到了页面上，
    这个时候可以修改DOM。
    此时把相应的docume事件绑定到上面
    */
    componentDidMount() {
        document.addEventListener('mousemove', (e) => { this.move(e); }, false);/*ES6新特性，箭头函数，需要依赖jsx编译工具才能正确运行*/
        document.addEventListener('mouseup', (e) => { this.endDrag(e); }, false);
    }
    render() {
        let detail;
        detail = this.props.isDetail ? <Detail row1Col1={this.props.row1Col1} row1Col2={this.props.row1Col2} row2Col1={this.props.row2Col1} row2Col2={this.props.row2Col2}/>:''
        return (
                <div  className={styles['movediv']} id="movediv" ref="dragBox" onMouseDown={this.startDrag.bind(this)} >
                    {/* <DragArea onMouseDown={this.onChildChanged.bind(this)} /> */}
                    {detail}
                     <Legend id={this.props.id} onclick={this.props.onclick}/> 
                    
                </div>
        );
    }
}

export default Movediv