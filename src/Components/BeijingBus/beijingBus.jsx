import React, { Component } from 'react'
import { render } from 'react-dom'  

class GlobalSeismic extends Component{
	constructor(props){
        	super(props)
       		this.state = {
            		currentObj1 : '',
            		currentObj2 : '',
        	}
        }
	componentDidMount(){
		//视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(116.16, 40.51,400000.0)
        });
        new GeoVis.WMTSLayer('http://192.168.4.229:28080/beyonserver/gwc/service/wmts', {
            layer: 'beyondb:linyin_0816_world_deepColor',
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3'],
            maximumLevel: 19,
            projection: 'EPSG:4326'
        }).addTo(earth.layers);
        // console.log(Engine.Cartographic.fromCartesian(this._earth.camera.position);)
	    this.state.currentObj1 = new GeoVis.TileLayer('https://tilelayer.geoq.cn/database/customer/layergroup/379572ce134e4b49e238ac440e27e945/{z}/{x}/{y}@2x.png', {
            projection: 'EPSG:900913'
        }).addTo(window.earth.layers);

        this.state.currentObj2 = new GeoVis.TileLayer('http://tilelayer.geoq.cn/database/customer/layergroup/08822d75c3cd8d99440b40fc06cd123b/{z}/{x}/{y}@2x.png', {
            projection: 'EPSG:900913'
        }).addTo(window.earth.layers);
	}
	componentWillUnmount(){
        //删除
        this.state.currentObj1.removeFrom(window.earth.layers);
        this.state.currentObj2.removeFrom(window.earth.layers);
    }
	render(){
		return (
			<div />
		)
	}
}  
export default GlobalSeismic;  
