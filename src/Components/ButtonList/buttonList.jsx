import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './buttonList.css';


const Engine = window.Engine;
const GeoVis = window.GeoVis;
class Button1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            altShow: false,
            name: '',
            text: '',
            value: this.props.value,
        };
    }
    onmouseover() {
        this.setState(
            { altShow: true },
        );
    }
    onmouseleave() {
        this.setState(
            { altShow: false },
        )
    }

    mouseup() {
        if (this.state.value === '2D') {
            this.setState({ value: '3D' });
            window.earth.scene.mode = Engine.SceneMode.SCENE3D;
        } else {
            this.setState({ value: '2D' });
            window.earth.scene.mode = Engine.SceneMode.SCENE2D;
        }

    }

    mousedown() {
        this.setState(
            { altShow: false },
        )
    }

    render() {
        let comp;
        this.state.name = this.state.altShow ? this.props.buttonName : '';

        this.state.img = this.state.altShow ? <img src="./src/assets/低栏.png" /> : '';

        return (
            <div className={styles["button1"]}>
                <button alt="btn"  onClick={this.props.dimensionTab} onMouseUp={this.mouseup.bind(this)} onMouseDown={this.mousedown.bind(this)} >{this.state.value}<img src={this.props.buttonImg} /></button>
                <span>{this.state.name}</span>
                <p>{this.state.text}</p>

                {this.state.img}
                {/* {comp} */}

            </div>
        )
    }
}


// 第二个button
class BotImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threeMap: [
                {
                    url: '../src/Components/ButtonList/images/1.png', alt: '第三方底图1'
                },
                {
                    url: '../src/Components/ButtonList/images/2.png', alt: '第三方底图2'
                },
                {
                    url: '../src/Components/ButtonList/images/3.png', alt: '第三方底图3'
                },
                {
                    url: '../src/Components/ButtonList/images/4.png', alt: '第三方底图4'
                },
                {
                    url: '../src/Components/ButtonList/images/5.png', alt: '第三方底图5'
                },
                {
                    url: '../src/Components/ButtonList/images/6.png', alt: '第三方底图6'
                },
                {
                    url: '../src/Components/ButtonList/images/7.png', alt: '第三方底图7'
                },
                {
                    url: '../src/Components/ButtonList/images/8.png', alt: '第三方底图8'
                },
            ],
            baseMap: [
                { name: "基础底图1", imgurl: "../src/Components/ButtonList/images/基础底图1.png" },
                { name: "基础底图2", imgurl: "../src/Components/ButtonList/images/基础底图2.png" },
                { name: "基础底图3", imgurl: "../src/Components/ButtonList/images/基础底图3.png" },
                { name: "基础底图4", imgurl: "../src/Components/ButtonList/images/基础底图4.png" },
                { name: "基础底图5", imgurl: "../src/Components/ButtonList/images/基础底图5.png" },
                { name: "基础底图6", imgurl: "../src/Components/ButtonList/images/基础底图6.png" },
                { name: "基础底图7", imgurl: "../src/Components/ButtonList/images/基础底图7.png" },
                { name: "基础底图8", imgurl: "../src/Components/ButtonList/images/基础底图8.png" }
            ]
        }
    }

    componentDidMount() {

    }

    onclick(e) {
        switch (e.target.id) {
            case '0':
                this.initImg(6, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace(/&amp;/g, '&');
                    a = a.replace('[01234567]', '1');
                    const layer = new GeoVis.TileLayer(a, {
                        projection: 'EPSG:900913'
                    }).addTo(window.earth.layers);
                }); break;
            case '1':
                this.initImg(1, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace('[abc]', 'a');
                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                }); break;
            case '2':
                this.initImg(7, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace(/&amp;/g, '&');
                    a = a.replace('[0123]', '0');

                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                }); break;
            case '3':
                this.initImg(8, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace(/&amp;/g, '&');
                    a = a.replace('[1234]', '2');

                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                }); break;
            case '4':
                this.initImg(4, (data) => {
                    const a = data.remotedatasource.url;
                    const layer = new GeoVis.TMSLayer(a, {
                        projection: 'EPSG:4326'
                    }
                    ).addTo(window.earth.layers);
                });
                break;
            case '5':
                this.initImg(2, (data) => {
                    const a = data.remotedatasource.url;

                    const layer = new GeoVis.ArcGisLayer(a,
                        { minLevel: 0, maxLevel: 20 }).addTo(window.earth.layers);
                });
                break;
            case '6':
                this.initImg(3, (data) => {
                    const a = data.remotedatasource.url;
                    const layer = new GeoVis.ArcGisLayer(a,
                        { minLevel: 0, maxLevel: 20 }).addTo(window.earth.layers);
                });
                break;

            case '7':
                const layer = new GeoVis.TileLayer('../src/Components/ButtonList/dark/{z}/{x}/{y}.png', {
                    projection: 'EPSG:900913'
                }
                ).addTo(window.earth.layers);
                break;
            default: break;
        }

    }
    addBaseMap(prams1){
        new GeoVis.WMTSLayer('http://192.168.4.229:28080/beyonserver/gwc/service/wmts', {
            layer: prams1,
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3'],
            maximumLevel: 19,
            projection: 'EPSG:4326'
        }).addTo(earth.layers);
    }
    baseMapEvent(e) {
        switch (e.target.id) {
            case '0':
                this.addBaseMap('beyondb:linyin_0816_world_black')
            break;
            case '1':
                this.addBaseMap('beyondb:linyin_0816_world_blue')
            break;
            case '2':
                this.addBaseMap('beyondb:linyin_0816_world_deepColor')
            break;
            case '3':
                this.addBaseMap('beyondb:linyin_0816_world_gray')
            break;
            case '4':
                this.addBaseMap('beyondb:linyin_0816_world_gray2')
            break;
            case '5':
                this.addBaseMap('beyondb:linyin_0816_world_lightColor')
            break;
            case '6':
                this.addBaseMap('beyondb:linyin_0816_world_lightColor2') 
            break;              
            case '7':
                this.addBaseMap('beyondb:linyin_0816_world_retro')
            break;
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

    render() {
        return (
            <div className={styles["botImg"]}>
                <div className={styles["botImg1"]}><div></div><span>底图选择</span></div>
                <div className={styles["botImg2"]}>
                    <p>基础底图</p>
                    {
                        this.state.baseMap.map((val, index) =>
                            <div key={val.name} className={styles['base-map']} title={val.name} onClick={this.baseMapEvent.bind(this)}><img id={index} src={val.imgurl} alt={val.name} /></div>
                        )
                    }
                </div>
                <div className={styles["botImg3"]}>
                    <p>第三方底图</p>
                    {
                        this.state.threeMap.map((val, index) =>
                            <div key={index} className={styles['base-map']} title={val.alt}><img id={index} alt={val.alt} src={val.url} onClick={this.onclick.bind(this)} /></div>
                        )
                    }
                </div>
            </div>
        )
    }


}


class Button2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            altShow: false,
            name: '',
            text: '',
        };
    }
    onmouseover() {
        this.setState(
            { altShow: true },

        );
    }
    onmouseleave() {
        this.setState(
            { altShow: false },
        )
    }
    mousedown() {
        this.setState(
            { altShow: false },
        )
    }
    render() {
        this.state.name = this.state.altShow ? this.props.buttonName : '';

        if (this.props.pShow2) {
            this.state.comp = <BotImg />
        } else {
            this.state.comp = ''
        }
        this.state.img = this.state.altShow ? <img src="./src/assets/低栏.png" /> : '';
        return (
            <div className={styles["button2"]}>
                <button onClick={this.props.mapTab} onMouseDown={this.mousedown.bind(this)}  >{this.props.value}<img alt="btn" src={this.props.buttonImg} /></button>
                <span>{this.state.name}</span>
                <p>{this.state.text}</p>
                {this.state.img}
                {this.state.comp}
            </div>
        )
    }
}


// 第三个button
class Layer extends Component {
    constructor(props){
        super(props)
        this.state = {
            bianjie : ''
        }
    }
    addBianJie(event){
        switch (event.target.id) {
            case 'c1':
                console.log('1111111')
            break;
            case 'c2':
                if(event.target.checked){
                    this.state.bianjie = new GeoVis.GeoJson('./src/Components/ButtonList/data/china.json', {
                        outline: true
                    }).addTo(earth);
                    // var geojson = new GeoVis.GeoJson('./src/Components/ButtonList/data/si_chuan_geo.json', {
                    //     outline: true
                    // }).addTo(earth);
                }else{
                    this.state.bianjie.removeFrom(window.earth);
                }
            break;
        }
    }
    render() {
        return (
            <div className={styles["layer"]}>
                <div className={styles["layer1"]}><div></div><span>图层</span></div>
                <div className={styles["layer2"]}>
                    <ul>
                        <li><input type="checkbox" id="c1" onClick={this.addBianJie.bind(this)} /><label htmlFor="c1">地名</label></li>
                        <li><input type="checkbox" id="c2" onClick={this.addBianJie.bind(this)} /><label htmlFor="c2">国/省界线</label></li>
                    </ul>
                </div>
            </div>
        )
    }
}


class Button3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            altShow: false,
            name: '',
            text: '',
        };
    }
    onmouseover() {
        this.setState(
            { altShow: true },
        );
    }
    onmouseleave() {
        this.setState(
            { altShow: false },
        )
    }
    mousedown() {
        this.setState(
            { altShow: false },
        )
    }
    render() {
        this.state.name = this.state.altShow ? this.props.buttonName : '';
        // this.state.text = this.state.pShow ? this.props.pValue : '';
        if (this.props.pShow3) {
            this.state.comp = <Layer />
        } else {
            this.state.comp = ''
        }
        this.state.img = this.state.altShow ? <img src="./src/assets/低栏.png" /> : '';
        return (
            <div className={styles["button3"]}>
                <button onClick={this.props.layerTab} onMouseDown={this.mousedown.bind(this)} >{this.props.value}<img alt="btn" src={this.props.buttonImg} /></button>
                <span>{this.state.name}</span>
                <p>{this.state.text}</p>
                {this.state.img}
                {this.state.comp}

            </div>
        )
    }
}


// 三个button放在一起
const imgList = [
    {
        img: '',
        name: '视图',
        value: '2D',
        index: 'button1',
    },
    {
        img: "./src/assets/低图.png",
        name: '底图',
        pValue: '',
        index: 'button2',
    },
    {
        img: "./src/assets/图层.png",
        name: "图层",
        pValue: '最多可加载五个数据图层',
        index: 'button3',

    },
];


class ButtonList1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pShow: false,
            pShow2: false,
            pShow3: false
        };
    }
    componentDidMount(){
        const re = this;
        window.earth.on('leftDown', () => {
            if(event.target.alt != 'btn'){
                re.setState(
                    {   
                        pShow: false,
                        pShow2: false,
                        pShow3: false 
                    }
                )
            }
        })
        document.onclick = function(event){
            if(event.target.alt == 'gotool'){
                re.setState(
                    {   
                        pShow: false,
                        pShow2: false,
                        pShow3: false 
                    }
                )
            }
        }
    }    
    dimensionTab() {
        this.setState({ pShow: !this.state.pShow, pShow2: false, pShow3: false })
    }
    mapTab() {
        this.setState({ pShow2: !this.state.pShow2, pShow: false, pShow3: false })
    }
    layerTab() {
        this.setState({ pShow3: !this.state.pShow3, pShow: false, pShow2: false })
    }
    render() {
        return (
            <div className={styles["sliderWrap"]}>
                <Button1 dimensionTab={this.dimensionTab.bind(this)} pShow={this.state.pShow} value={imgList[0].value} buttonImg={imgList[0].img} index={imgList[0].index} buttonName={imgList[0].name} pValue={imgList[0].pValue} />
                <Button2 mapTab={this.mapTab.bind(this)} pShow2={this.state.pShow2} value={imgList[1].value} buttonImg={imgList[1].img} index={imgList[1].index} buttonName={imgList[1].name} pValue={imgList[1].pValue} />
                <Button3 layerTab={this.layerTab.bind(this)} pShow3={this.state.pShow3} value={imgList[2].value} buttonImg={imgList[2].img} index={imgList[2].index} buttonName={imgList[2].name} pValue={imgList[2].pValue} />
            </div>
        )
    }
}
export default ButtonList1;
