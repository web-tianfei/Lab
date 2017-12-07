import React, { Component } from 'react'
import { render } from 'react-dom'  

const GeoVis = window.GeoVis;
const Engine = window.Engine;
class ChinaTrain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentObj: ''
        }
    }
    componentDidMount() {
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(113.16, 39.71, 9000000.0)
        });
        //切换底图
        new GeoVis.WMTSLayer('http://192.168.4.229:28080/beyonserver/gwc/service/wmts', {
            layer: 'beyondb:linyin_0816_world_black',
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3'],
            maximumLevel: 19,
            projection: 'EPSG:4326'
        }).addTo(earth.layers);
        //添加中国火车站数据
        this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/beyondb/wms?service=WMS&version=1.1.0&request=GetMap&layers=beyondb:vt_transportation_train_station_transportation_train_station_v01&styles=&bbox=75.976509,18.295973,134.402496,52.98856&width=768&height=456&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson', {
            markerSize: 6,
            markerColor: GeoVis.Color.ORANGERED.withAlpha(0.8)
        });
        this.state.currentObj.addTo(window.earth);
    }
    componentWillUnmount() {
        //删除
        this.state.currentObj.removeFrom(window.earth);
    }
    render() {
        return (
            <div />
        )
    }
}  
export default ChinaTrain;
