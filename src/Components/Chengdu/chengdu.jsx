import React, { Component } from 'react';
import { render } from 'react-dom';

class Chengdu extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentObj : ''
        }
    }
    componentDidMount() {
        //视角跳转至成都
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(104.06, 30.67, 7000.0)
        });
        new GeoVis.WMTSLayer('http://192.168.4.229:28080/beyonserver/gwc/service/wmts', {
            layer: 'beyondb:linyin_0816_world_black',
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3'],
            maximumLevel: 19,
            projection: 'EPSG:4326'
        }).addTo(earth.layers);


        this.state.currentObj = new GeoVis.TileLayer('https://tilelayer.geoq.cn/database/customer/layergroup/5c4767e3af7b0576195759e03168a7c6/{z}/{x}/{y}@2x.png', {
            projection: 'EPSG:900913'
        })
        this.state.currentObj .addTo(earth.layers);
    }
    componentWillUnmount() {
        //删除
        this.state.currentObj.removeFrom(window.earth.layers);
    }
    render() {
        return (
            <div />
        )
    }
}
export default Chengdu