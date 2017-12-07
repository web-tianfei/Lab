import React, { Component } from 'react';
import { render } from 'react-dom';

import styles from './SinkiangPanorama.css';
import MoveVideo from '../MoveVideo/moveVideo'
const GeoVis = window.GeoVis;
const Engine = window.Engine;
export default class SinkiangPanorama extends Component {
    componentWillMount() {
        this.state = {
            isPanorama: false,
            lon: 0,
            lat: 0
        }
    }
    componentDidMount() {
        const state = this.state;
        // 添加两条路矢量
        this.earth = window.earth;
        this.layer = new GeoVis.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            projection: 'EPSG:900913'
        }).addTo(this.earth.layers);
        const url = 'http://192.168.4.229:28080/beyonserver/beyondb/wms?service=WMS&version=1.1.0&request=GetMap&layers=beyondb:vt_qianjingpoint_b_v01' +
            '&styles=&bbox=80.115479,31.019896,80.268278,31.108056&width=768&height=443&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson';
        this.geojson = new GeoVis.GeoJson(url, {
            markerSize: 16,
            markerColor: new GeoVis.Color(0 / 255, 0 / 255, 255 / 255, 1.0)
        }).addTo(this.earth);
        this.earth.scene.mode = Engine.SceneMode.SCENE3D;
        this.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(80.125479, 31.951896, 5000.0),
            orientation: {
                heading: Engine.Math.toRadians(0.0),
                pitch: Engine.Math.toRadians(-35.0),
                roll: 0.0
            }
        });

        this.geojson.on('finish', (geojson) => {
            console.log(geojson);
            this.earth.on('leftUp', (event) => {
                const point = this.earth.scene.pick(new Engine.Cartesian2(event.windowPosition[0], event.windowPosition[1]));
                if (point) {
                    if (point.id) {
                        // console.log(point);

                    } else {
                        // console.log(point);
                        state.isPanorama = state.isPanorama === false ? true : state.isPanorama;
                        state.lon = event.position[0];
                        state.lat = event.position[1];

                        this.setState(state);
                        // loadPanorama({ lon: event.position[0], lat: event.position[1] });
                    }
                } else {
                    console.log('此处无街景');
                }
            });
            this.leftUpIndex = this.earth._listeners['leftUp'].length - 1;
        });

        window.abc = (lon, lat, heading) => {
            // console.log(lon, lat);
            // console.log(document.getElementsByClassName());
            if (!this.marker)
                this.marker = new GeoVis.Marker([lon, lat], {
                    iconUrl:"./assets/图层-10-拷贝-2.png",
                    width: 30,
                    height: 30
                }).addTo(this.earth.features);
            else {
                this.marker.lon = lon;
                this.marker.lat = lat;

            }
            console.log(this.marker)
            
            this.marker.element.style.transform = `rotate(${heading-45}deg)`;
            this.marker.element.style.width='30px'
            this.marker.element.style.height='40px'
            // console.log(this.marker ? this.marker.lon + ', ' + this.marker.lat : '(0, 0)');
        }

    }

    componentWillUnmount() {
        // alert('remove');
        this.layer.removeFrom(this.earth.layers);
        if (this.marker) {
            this.marker.removeFrom(this.earth.features);
            this.marker = undefined;
        }
        this.geojson.removeFrom(this.earth);
        console.log(this.leftUpIndex);
        // this.earth.off('leftUp', this.loadPanorama.bind(this));
        this.earth._listeners['leftUp'].splice(this.leftUpIndex, 1);
        this.earth = undefined;
    }

    fetchData(url, earth, callback) {
        fetch(url).then((response) => {
            // console.log(response);
            response.json().then((data) => {
                data.features.forEach((value, key) => {
                    const point = new GeoVis.Point(value.geometry.coordinates, {
                        color: new GeoVis.Color(255 / 255, 0 / 255, 32 / 255, 1.0),
                        pixelSize: 32
                    }).addTo(earth.features);
                    point.id = value.id;
                    point.properties = value.properties;
                    this.points.set(value.id, point);
                });
                callback();
            });
        }).catch((err) => { console.error(err); });
    }

    close() {
        const state = this.state;
        state.isPanorama = false;
        this.setState(state);
        this.marker.removeFrom(this.earth.features);
        this.marker = undefined;
    }

    render() {
        const canvas = document.getElementById('geovis-earth');
        const panoWidth = canvas.offsetWidth / canvas.offsetHeight > 1.2 ? canvas.offsetHeight * 1.2 / 2 + 70 : canvas.offsetWidth;
        const panoStyle = {
            width: `${panoWidth }px`,
            height: `${canvas.offsetHeight / 2}px`,
            left: `${(canvas.offsetWidth - panoWidth) / 2}px`
        }
        const panorama = this.state.isPanorama === true ? (
            <MoveVideo classname1={styles.panorama} classname2={styles.close} style={panoStyle} onclick={this.close.bind(this)} lon={this.state.lon} lat={this.state.lat} style2={styles.frameStyle}/>
            // <MoveVideo> </MoveVideo>
        ) : null;
        return (
            <div>
                {panorama}
            </div>
        );
    }
}
