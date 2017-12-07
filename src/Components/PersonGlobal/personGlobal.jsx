import React, { Component } from 'react'
import { render } from 'react-dom'
import Movediv from '../Movediv/movediv'
import Detail from '../Detail/detail'
import ThemeDesc from '../ThemeDesc/themeDesc'

const detail = {
    
    row1Col1: '国家/地区',
    row1Col2: '人口',
}
const legend = {
    id : 'personGlobal'
}

class PersonGlobal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentObj: '',
            name:'',
            pop:'',
            isLegend:true,
            isDetail:false,
            title : "全球人口",
            desc : "截至2016年，全世界人口总数为72亿6291万，中国是世界第一人口大国。2025年世界人口将突破80亿，英国将成欧洲第一人口大国。2050年世界人口将突破94亿，亚洲再增13亿人。非洲的人口也可能增加一倍，达到21亿。"
        }

    }

    componentDidMount() {
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(113.16, 39.71, 20000000.0)
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
        //添加全球人口数据
        this.state.currentObj = new GeoVis.GeoJson('../src/common/countries.geo.json', {
            fillColor: GeoVis.Color.fromCssString('#009688').withAlpha(0.2),
            fill: true,
            outline: false
        })
        this.state.currentObj.addTo(earth);

        this.state.currentObj.on('finish', (geojson) => {
            console.log(geojson);

            geojson.target.features.polygons.forEach((feature) => {
                // console.log(feature);
                let a;
                let pop = feature.properties.population;
                let name = feature.properties.name;
                if (pop > 100000000) a = '#cc2700';
                if (10000000 < pop && pop <= 100000000) a = '#f17828';
                if (1000000 < pop && pop <= 10000000) a = '#74b486';
                if (100000 < pop && pop <= 10000000) a = '#12d50c';
                if (pop <= 100000) a = '#13e113';
                feature.fillColor = GeoVis.Color.fromCssString(a);
                feature.extrudedHeight = parseInt(pop / 1000);
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
        // aDetail = this.state.isDetail?<Detail  row1Col1={detail.row1Col1} row1Col2={detail.row1Col2} row2Col1={this.state.name} row2Col2={this.state.pop}/>:''
        aLegend = this.state.isLegend?<Movediv isDetail={this.state.isDetail} row1Col1={detail.row1Col1} row1Col2={detail.row1Col2} row2Col1={this.state.name} row2Col2={this.state.pop} id={legend.id} onclick={this.onclick.bind(this)}/>:''
        return (
            <div>
            {/* {aDetail}, */}
            {aLegend}
            <ThemeDesc title={this.state.title} desc={this.state.desc}></ThemeDesc>
            </div>
        )
    }
}



export default PersonGlobal;  