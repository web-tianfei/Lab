import React, { Component } from 'react';
import { render } from 'react-dom';
import volcano from './volcanojson.js';

class Volcano extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentObj : []
        }
    }
    componentWillMount() {
        //删除
        this.state.currentObj.map( (val,index) => {
            val.removeFrom(window.earth.features);
        })  
    }
    componentDidMount() {
        const re = this;
        //视角跳转至全球
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(54.06, 30.67, 20000000.0)
        });
        for (let i = 0; i < volcano.rows.length; i++) {
            let markerpoint = new GeoVis.PointMarker([volcano.rows[i].经度, volcano.rows[i].纬度, 0], { id: `marker_${i}`, color: GeoVis.Color.RED }).addTo(window.earth.features);
            markerpoint.bindPopup("<b>"+'参考位置：'+volcano.rows[i].参考位置+"</b><br>"+"</b><br>"+"<b>"+'发震时刻：'+volcano.rows[i].发震时刻+"</b><br>",{
                maxWidth: 120
            })
            re.state.currentObj.push(markerpoint)
        }
        
    }
    render() {
        return (<div />)
    }
}
export default Volcano