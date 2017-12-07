import React, { Component } from 'react'
import { render } from 'react-dom'
import Disaster from './beijingDisasterData.js'

class BeijingDisaster extends Component{
	constructor(props){
        super(props)
        this.state = {
            currentObj : []
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
		const re = this;
		//先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
		//视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(116.16, 40.11, 100000.0)
        });
        re.initImg(8, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace(/&amp;/g, '&');
                    a = a.replace('[1234]', '2');

                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                });

		const dataArr = Disaster.rows;
		let i = 1;  
		console.log(dataArr.length)
		let length = dataArr.length  > 1500 ? 1500  : dataArr.length;         
        let addpoint = setInterval(function(){
            if(i >= length){
                clearInterval(addpoint)
            }
            let markerpoint = new GeoVis.PointMarker([ dataArr[i].经度 , dataArr[i].纬度 , 0 ], {id: `marker_${i}`,color: GeoVis.Color.fromCssString("#02c874")});
            markerpoint.addTo(earth.features)
            markerpoint.bindPopup("<b>"+dataArr[i].灾害类型+"</b><br>"+dataArr[i].隐患点名称+"",{
                maxWidth: 120
            })
            // markerpoint.showPopup();
            re.state.currentObj.push(markerpoint)
            i++;
        },1)
	}
	componentWillUnmount(){
        //删除        
        this.state.currentObj.map( (val,index) => {
            val.removeFrom(window.earth.features);
        })        
    }
	render(){
		return (
			<div />
		)
	}
}
export default BeijingDisaster