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
            destination : Engine.Cartesian3.fromDegrees(117.56, 39.51, 350000.0)
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
	    this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/beyondb/wms?service=WMS&version=1.1.0&request=GetMap&layers=beyondb:vt_education_middle_school_20160810_shp_education_middle_school_20160810_v01&styles=&bbox=116.716667,38.566667,118.316667,40.25&width=768&height=449&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson', 
	    	{
	    		markerSize: 10,
	    		markerColor:GeoVis.Color.fromCssString('#021f9b')
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