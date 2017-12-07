import React, { Component } from 'react'
import { render } from 'react-dom'  

class GlobalSeismic extends Component{
	constructor(props){
        super(props)
        this.state = {
            currentObj : ''
        }
    }
    initImg(id, callback) {
        fetch(`http://192.168.48.3:8690/remotedatasource/${id}`,{
              method: "POST"
            })
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res.status); return;
                }
                res.json().then((data) => {

                    callback(data);

                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
	componentDidMount(){
		this.initImg(4, (data) => {
                    const a = data.remotedatasource.url;
                    const layer = new GeoVis.TMSLayer(a, {
                        projection: 'EPSG:4326'
                    }
                    ).addTo(window.earth.layers);
                });
	    //添加全球地震数据
	    this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/beyondb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=beyondb:vt_education_primary_school_20160810_education_primary_school_20160810_v01&maxFeatures=10000&outputFormat=application%2Fjson', 
	    	{
	    		markerSize: 3,
	    		markerColor:GeoVis.Color.GREEN
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