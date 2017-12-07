import React, { Component } from 'react'
import { render } from 'react-dom'        
import dataJson from './globalPersonData.js'
import ThemeDesc from '../ThemeDesc/themeDesc'

class GlobalPerson extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentObj : '',
            title : "1970年全球人口",
            desc : "1970年，中国人口总数8.16亿，印度人口总数才5.49亿，仅相当于中国的67.32%"
        }
    }
    componentDidMount () {
        this.earth = window.earth;
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(80.16, 28.11, 30000000.0)
        });
        let newArr = [];               
        let allArr = [];              
        for(let i = 0;i<dataJson[0][1].length;i++){                    
            if( i % 3 == 0){
                newArr.push(dataJson[0][1][i])
            }else if( (i+2) % 3 == 0){
                newArr.push(dataJson[0][1][i])
            }else if( (i+1) % 3 == 0){
                newArr.push(dataJson[0][1][i])
            }
            if(newArr.length % 3 == 0){
                allArr.push(newArr);
                newArr = [];
            }
        }
        allArr.splice(1000)
        //颠倒经纬度信息
        for(let n = 0;n<allArr.length;n++){
            let two = allArr[n][0];
            allArr[n][0] = allArr[n][1];
            allArr[n][1] = two;
        }         
        let newAllArr = [];       
        //新增相同元素信息
        for(let m=0;m<allArr.length;m++){
                const temp = [allArr[m][0],allArr[m][1],allArr[m][2]];                                           
                newAllArr.push(allArr[m])                     
                newAllArr.push(temp)                                       
        }
        //改变高度值  
        for(var i = 0;i<newAllArr.length;i++){
            if( i % 4 == '1' || i % 4 == '2'){
                newAllArr[i][2] = 0;
            }else{
                if(newAllArr[i][2] == '0'){
                    newAllArr[i][2] = 800000; 
                }else if(newAllArr[i][2] < 0.005){
                    newAllArr[i][2] = 800000;
                }else{
                    newAllArr[i][2] = Number(newAllArr[i][2]) * 80000000;
                }                        
            }
        }                             
        // 初始化示例
        var colors = [];
        for(let j=0;j<1000;j++){
            colors.push(
                GeoVis.Color.fromCssString("#02c874").withAlpha(0.8),
                GeoVis.Color.fromCssString("white").withAlpha(0),
                GeoVis.Color.fromCssString("#00aeae").withAlpha(0.8),
                GeoVis.Color.fromCssString("white").withAlpha(0),
                GeoVis.Color.fromCssString("#0080ff").withAlpha(0.8),
                GeoVis.Color.fromCssString("white").withAlpha(0)                
            )
        }
        var positions = [
          [6, 159, 100000],
          [30, 99, 0],
          [45, -109, 0],
          [42, 115, 700000]
        ];
        this.state.currentObj = new GeoVis.Polyline(newAllArr, {
          colors: colors,
          vertexColor: false,
          followSurface: true,
          width: 2.0
        }).addTo(window.earth.features);
    }
    componentWillUnmount(){
        //删除
        this.state.currentObj.removeFrom(window.earth.features);
    }
    render () {
        return (
            <div>
                <ThemeDesc title={this.state.title} desc={this.state.desc}></ThemeDesc>
            </div>
        );
    }
}

export default GlobalPerson;