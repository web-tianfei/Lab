import React, { Component } from 'react'
import { render } from 'react-dom'
import tianjinData from './tianjin.js'
import TimeLine from '../TimeLine/timeLine.jsx'

class Explosion extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentObj : [],
            max : '62',
            maxtime : '00:32:30',
            min : '0',
            mintime : '22:57:43',
            value : '0',
            currentVal : '',
            clock : 'obj',
            mark : 1,
            desc : "2015年8月12日23:30左右，位于天津市滨海新区天津港的瑞海公司危险品仓库发生火灾爆炸事故，造成165人遇难，798人受伤，304幢建筑物、12428辆商品汽车、7533个集装箱受损。",
            take : 0
        }
    }

    valueChange(){
        const re = this;
        this.setState({
            currentVal : document.querySelector('.range').value,
            take : Number(document.querySelector('.range').value)
        }) 
        let currentTake = Number(document.querySelector('.range').value);
        // re.state.take == 0 ? re.state.take = 62 : re.state.take;
        if(re.state.take < currentTake && re.state.take != 0){
            //添加
            let markerpoint = new GeoVis.PointMarker([ tianjinData[re.state.take][1] , tianjinData[re.state.take][2] , 0 ], {id: `marker_${re.state.take}`,color: GeoVis.Color.RED});
            markerpoint.addTo(window.earth.features);
            markerpoint.bindPopup("<b>"+tianjinData[re.state.take][0]+"</b><br>"+tianjinData[re.state.take][4]+"",{
                maxWidth: 120
            })
            markerpoint.showPopup();
            re.state.currentObj.push(markerpoint) 
        }else if(re.state.take != 0){
            //删除  
            let removeNum = re.state.take-1 < 0 ? 0 : re.state.take;    
            re.state.currentObj[ removeNum ].removeFrom(window.earth.features); 
            re.state.currentObj.splice(re.state.take , 1)
        }
        if(Number(document.querySelector('.range').value) == 0){
            re.state.currentObj.map( (val,index) => {
                val.removeFrom(window.earth.features);
            })
        } 
    }

    actionValue(event){        
        const re = this;
        //开始暂停      
        if(event.target.src.slice(event.target.src.indexOf("assets")) == 'assets/bobo.png'){
            clearInterval(re.clock)  
        }else{
            let i = this.state.take;  
            let dataLength = tianjinData.length > 2000 ? 2000 : tianjinData.length;

            re.clock = setInterval(function(){    
                if( Number(document.querySelector('.range').value) >= Number(re.state.max)-1 ){
                    clearInterval(re.clock);
                }
                
                re.setState({
                    currentVal : document.querySelector('.range').value
                })

                let markerpoint = new GeoVis.PointMarker([ tianjinData[i][1] , tianjinData[i][2] , 0 ], {id: `marker_${i}`,color: GeoVis.Color.RED});
                markerpoint.addTo(window.earth.features);
                markerpoint.bindPopup("<b>"+tianjinData[i][0]+"</b><br>"+tianjinData[i][4]+"",{
                    maxWidth: 120
                })
                markerpoint.showPopup();
                re.state.currentObj.push(markerpoint)
                i++;
                document.querySelector('.range').value ++;
            },500)
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
            destination : Engine.Cartesian3.fromDegrees(117.56, 39.01, 120000.0)
        }); 
        re.initImg(1, (data) => {
                    let a = data.remotedatasource.url;
                    a = a.replace('[abc]', 'a');
                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                });
    }
    componentWillUnmount(){
        //删除
        this.state.currentObj.map( (val,index) => {
            val.removeFrom(window.earth.features);
        })        
    }

    render(){
        return (
            <div>
                <TimeLine max={this.state.max} maxtime={this.state.maxtime} min={this.state.min} mintime={this.state.mintime} value={this.state.value} nowVal={this.state.currentVal} valChange={this.valueChange.bind(this)} actionVal={this.actionValue.bind(this)} ></TimeLine>
            </div>
        )
    }
}
export default Explosion