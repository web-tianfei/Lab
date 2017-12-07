import React, { Component } from 'react'
import { render } from 'react-dom'
import Movediv from '../Movediv/movediv'
import Detail from '../Detail/detail'
const detail = {
    row1Col1:'省/地区',
    row1Col2:'数量'
}
const legend = {
    id : 'chinaWorker'
}
class ChinaWorker extends Component {
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
    componentDidMount() {
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(113.16, 39.71, 9000000.0)
        });
        new GeoVis.WMTSLayer('http://192.168.4.229:28080/beyonserver/gwc/service/wmts', {
            layer: 'beyondb:linyin_0816_world_retro',
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3'],
            maximumLevel: 19,
            projection: 'EPSG:4326'
        }).addTo(earth.layers);
        //添加中国就业人口数据
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
                let pop = feature.properties.at_work;
                let name = feature.properties.name;
                if (10432045 < pop) a = 0;
                if (8041752 < pop && pop <= 10432045) a = 0;
                if (6570076 < pop && pop <= 8041752) a = 75;
                if (4602376 < pop && pop <= 6570076) a = 165;
                if (2884617 < pop && pop <= 4602376) a = 190;
                if (1293869 < pop && pop <= 2884617) a = 225 + 136;
                if (pop <= 1293869) a = 255 + 200;
                feature.fillColor = GeoVis.Color.fromBytes(a > 255 ? 255 : a, 255, a > 255 ? a - 255 : 0, 255).withAlpha(1.0);
                feature.extrudedHeight = parseInt(pop / 10);
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
export default ChinaWorker;  