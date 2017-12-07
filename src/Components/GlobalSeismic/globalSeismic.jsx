import React, { Component } from 'react'
import { render } from 'react-dom'  

class GlobalSeismic extends Component{
	constructor(props){
        super(props)
        this.state = {
            currentObj : []
        }
    }
	componentDidMount(){
		//先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;

        new GeoVis.WMTSLayer('http://192.168.4.229:28080/beyonserver/gwc/service/wmts', {
            layer: 'beyondb:linyin_0816_world_deepColor',
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3'],
            maximumLevel: 19,
            projection: 'EPSG:4326'
        }).addTo(earth.layers);
		//视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(116.16, 40.11, 12500000.0)
        });
	    //添加全球地震数据
	    this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/beyondb/wms?service=WMS&version=1.1.0&request=GetMap&layers=beyondb:vt_global_seismic_data_shp_global_seismic_data_v01&styles=&bbox=-179.115479,-89.019896,179.268278,89.108056&width=768&height=443&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson', 
	    	{
	    		markerSize: 5,
	    		markerColor:GeoVis.Color.GREENYELLOW
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