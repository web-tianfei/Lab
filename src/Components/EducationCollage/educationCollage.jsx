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
            destination : Engine.Cartesian3.fromDegrees(116.16, 36.51,10000000.0)
        });
	    //添加全球地震数据
	    this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/beyondb/wms?service=WMS&version=1.1.0&request=GetMap&layers=beyondb:vt_education_collage_20160810_shp_education_collage_20160810_v01&styles=&bbox=76.001549,18.289904,131.166061,50.383831&width=768&height=446&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson', 
	    	{
	    		markerSize: 9,
	    		markerColor:GeoVis.Color.PURPLE
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