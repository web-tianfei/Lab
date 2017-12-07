import React, { Component } from 'react'
import { render } from 'react-dom'  

class GlobalSeismic extends Component{
	constructor(props){
        super(props)
        this.state = {
            currentObj : ''
        }
    }
	componentDidMount(){
		//视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(116.16, 35.51, 7000000.0)
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
	    //添加全球地震数据
	    this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/gwc/service?service=WFS&version=1.0.0&request=GetFeature&typeName=beyondb:vt_education_kindergarten_20160810_shp_education_kindergarten_20160810_v01&maxFeatures=3500&outputFormat=application%2Fjson', 
	    	{
	    		markerSize: 6,
	    		markerColor:GeoVis.Color.fromCssString('#353f42')
	    	});
	    this.state.currentObj.addTo(window.earth);
	}
	componentWillUnmount(){
        //删除
        this.state.currentObj.removeFrom(window.earth);
    }
	render(){
		return (
			<div />
		)
	}
}  
export default GlobalSeismic;  