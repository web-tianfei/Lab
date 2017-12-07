import React, { Component } from 'react'
import { render } from 'react-dom'
import Movediv from '../Movediv/movediv'
import Detail from '../Detail/detail'
const detail = {
    row1Col1:'省/地区',
    row1Col2:'百分比%'
}
const legend = {
    id : 'chinaOldPerson'
}
class ChinaOldPerson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentObj: '',
            name:'',
            pop:'',
            isLegend:true,
            isDetail:false,
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
    componentDidMount() {
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(113.16, 39.71, 9000000.0)
        });
        this.initImg(3, (data) => {
                    const a = data.remotedatasource.url;
                    const layer = new GeoVis.ArcGisLayer(a,
                        { minLevel: 0, maxLevel: 20 }).addTo(window.earth.layers);
                });
        new GeoVis.TileLayer('../src/Components/ButtonList/dark/{z}/{x}/{y}.png', {
                    projection: 'EPSG:900913'
                }
                ).addTo(window.earth.layers);
        //添加中国老年人口数据
        this.state.currentObj = new GeoVis.GeoJson('../src/common/china.json', {
            fillColor: GeoVis.Color.fromCssString('#009688').withAlpha(0.2),
            fill: true,
            outline: true,
            outlineColor: GeoVis.Color.GREEN
        })
        this.state.currentObj.addTo(earth);
        this.state.currentObj.on('finish', (geojson) => {
            console.log(geojson);
            geojson.target.features.polygons.forEach((feature) => {
                // console.log(feature);
                let a;
                let pop = feature.properties.old_ratio;
                let name = feature.properties.name;
                if (17.42 <= pop) a = 0;
                if (15.43 < pop && pop <= 17.42) a = 32;
                if (13.21 < pop && pop <= 15.43) a = 64;
                if (11.53 < pop && pop <= 13.21) a = 128;
                if (9.73 < pop && pop <= 11.53) a = 255;
                if (7.67 < pop && pop <= 9.73) a = 255 + 64;
                if (pop <= 7.67) a = 255 + 128;
                feature.fillColor = GeoVis.Color.fromBytes(255, a > 255 ? 255 : a, a > 255 ? a - 255 : 0, 255).withAlpha(1.0);
                feature.extrudedHeight = parseInt((pop - 5) * 100000);
                feature.on('clickIn', (feature) => {
                    // alert('aaa');
                    console.log(feature);
                    feature.target.shine({
                        color: '#ff0000'
                    });

                    this.setState({name:name})
                    this.setState({pop:pop})
                    this.setState({isDetail:true})
                });
            });
        });
    }
    componentWillUnmount() {
        //删除
        this.state.currentObj.removeFrom(window.earth);
    }
    onclick(){
        this.setState({isLegend:false})
    }
    render() {
        let aDetail,aLegend;
        aLegend = this.state.isLegend?<Movediv isDetail={this.state.isDetail} row1Col1={detail.row1Col1} row1Col2={detail.row1Col2} row2Col1={this.state.name} row2Col2={this.state.pop} id={legend.id} onclick={this.onclick.bind(this)}/>:''
        return (
            <div>
            {/* {aDetail}, */}
            {aLegend}
            </div>
        )
    }
}
export default ChinaOldPerson;  
