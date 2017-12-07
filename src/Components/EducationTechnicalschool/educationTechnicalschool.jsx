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

	    // //添加全球地震数据
	    // this.state.currentObj = new GeoVis.GeoJson('http://192.168.4.229:28080/beyonserver/beyondb/wms?service=WMS&version=1.1.0&request=GetMap&layers=beyondb:vt_education_technical_school_20160810_shp_education_technical_school_20160810_v01&styles=&bbox=115,25,124.8,38&width=768&height=450&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson', 
	    // 	{
	    // 		markerSize: 6,
	    // 		markerColor:GeoVis.Color.GOLD
	    // 	});
	    // this.state.currentObj.addTo(window.earth);

	    //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
	    //视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(108.16, 35.51, 7000000.0)
        });
	    this.initImg(8, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace(/&amp;/g, '&');
                    a = a.replace('[1234]', '2');

                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                });

	    this.state.currentObj = new GeoVis.MarkerCluster('http://192.168.4.229:28080/beyonserver/beyondb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=beyondb:vt_education_technical_school_20160810_shp_education_technical_school_20160810_v01&maxFeatures=3000&outputFormat=application%2Fjson', {
			pixelRange: 56,
			minClusterSize: 6,
			markerIcon: ['./src/assets/juhe.png',
				'./src/assets/juhe.png',
				'./src/assets/juhe.png',
				'./src/assets/juhe.png',
				'./src/assets/juhe.png',
				'./src/assets/juhe.png',
				'./src/assets/juhe.png'],
			cluster: {
				fontColor: '#fefefe',
				markerSize: 42
			},
			marker: {
				iconUrl: './src/assets/图层-10-拷贝-2.png',
				width: 36,
				height: 30
			}
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