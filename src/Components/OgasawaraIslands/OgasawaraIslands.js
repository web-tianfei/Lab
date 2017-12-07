import React, { Component } from 'react';
import { render } from 'react-dom';

import styles from './OgasawaraIslands.css';

const GeoVis = window.GeoVis;
const Engine = window.Engine;
export default class OgasawaraIslands extends Component {
    componentWillMount() {
        this.state = {
            isPanorama: false,
            geoid: undefined,
            lon: 0,
            lat: 0,
            yaw: 0
        }
        this.isPanoramaLoad = false;
        this.isLeftDown = false;
        this.lastsegments = [];
        this.lastpoints = [];
        this.pointsMap = new Map();
    }
    componentDidMount() {
        const state = this.state;
        // 添加两条路矢量
        this.earth = window.earth;
        this.layer = new GeoVis.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            projection: 'EPSG:900913'
        }).addTo(this.earth.layers);
        this.earth.scene.mode = Engine.SceneMode.SCENE3D;
        this.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(142.204728, 27.018492, 5000.0),
            orientation: {
                heading: Engine.Math.toRadians(0.0),
                pitch: Engine.Math.toRadians(-35.0),
                roll: 0.0
            }
        });

        this.init();
    }

    componentWillUnmount() {
        this.layer.removeFrom(this.earth.layers);
        if (this.marker) {
            this.marker.removeFrom(this.earth.features);
            this.marker = undefined;
        }
        this.removePoints();
        this.earth._listeners['leftUp'].splice(this.earth._listeners['leftUp'].length - 1, 1);
        this.earth._listeners['mouseMove'].splice(this.earth._listeners['mouseMove'].length - 1, 1);
        this.earth._listeners['leftDown'].splice(this.earth._listeners['leftDown'].length - 1, 1);
        this.earth._listeners['wheel'].splice(this.earth._listeners['wheel'].length - 1, 1);
    }

    getBBOX() {
        const earth = this.earth;
        const positionArray = [];
        let leftUp = { x: 0, y: 0 }, rightUp = { x: 0, y: 0 }, leftDown = { x: 0, y: 0 }, rightDown = { x: 0, y: 0 };
        let upHeight = 0;
        let windowPositionsLeftUp = new Engine.Cartesian2(0, upHeight);
        let cartesian = earth.camera.pickEllipsoid(windowPositionsLeftUp, earth.scene.globe.ellipsoid);
        while (!Engine.defined(cartesian) && upHeight < screen.height) {
            windowPositionsLeftUp = new Engine.Cartesian2(0, upHeight);
            cartesian = earth.camera.pickEllipsoid(windowPositionsLeftUp, earth.scene.globe.ellipsoid);
            upHeight++;
        }
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            leftUp = { x: longitudeString, y: latitudeString };
        }
        const windowPositionsRightUp = new Engine.Cartesian2(screen.width, upHeight);
        cartesian = earth.camera.pickEllipsoid(windowPositionsRightUp, earth.scene.globe.ellipsoid);
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            rightUp = { x: longitudeString, y: latitudeString };
        } else
            rightUp = leftUp;
        const windowPositionsLeftDown = new Engine.Cartesian2(0, screen.height);
        cartesian = earth.camera.pickEllipsoid(windowPositionsLeftDown, earth.scene.globe.ellipsoid);
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            leftDown = { x: longitudeString, y: latitudeString };
        }
        const windowPositionsRightDown = new Engine.Cartesian2(screen.width, screen.height);
        cartesian = earth.camera.pickEllipsoid(windowPositionsRightDown, earth.scene.globe.ellipsoid);
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            rightDown = { x: longitudeString, y: latitudeString };
        }
        positionArray.push(Math.min(leftUp.x, rightUp.x, leftDown.x, rightDown.x));
        positionArray.push(Math.min(leftUp.y, rightUp.y, leftDown.y, rightDown.y));
        positionArray.push(Math.max(leftUp.x, rightUp.x, leftDown.x, rightDown.x));
        positionArray.push(Math.max(leftUp.y, rightUp.y, leftDown.y, rightDown.y));
        return positionArray;
    }

    getSegmentInfo(pos) {
        this.fetchData(`http://192.168.44.56:8080/geowebcache/street/google_sqlite/query?gridSet=EPSG:4326&format=image/png&BBOX=${pos[0]},${pos[1]},${pos[2]},${pos[3]}`, (msg) => {
            if (msg.total > 0) {
                try {
                    const points = JSON.parse(msg.results);
                    if (points instanceof Array) {
                        for (const p of points) {
                            if (this.lastsegments.indexOf(p.segmentid) < 0) {
                                setTimeout(() => { this.requestPoints(p.segmentid); }, 1000);
                                // console.log(p.segmentid);
                            } else {
                                this.lastsegments.splice(this.lastsegments.indexOf(p.segmentid), 1);
                            }
                        }
                        // removeSegments(lastsegments);
                        this.lastsegments = [];
                        for (const p of points) {
                            this.lastsegments.push(p.segmentid);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }

    requestPoints(segmentid) {
        this.fetchData(`http://192.168.44.56:8080/geowebcache/street/google_sqlite/panojson?gridSet=EPSG:4326&format=image/png&SEGMENTID=${segmentid}`, (msg) => {
            if (msg.total > 0) {
                try {
                    const points = JSON.parse(msg.results);
                    if (points instanceof Array) {
                        for (const p of points) {
                            if (this.lastpoints.indexOf(p.segmentid) < 0) {
                                this.addPoint(p);
                            } else {
                                this.lastpoints.splice(this.lastpoints.indexOf(p.geoid), 1);
                            }
                        }
                        // removePoints(lastpoints);
                        this.lastpoints = [];
                        for (const p of points) { this.lastpoints.push(p.geoid); }
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    addPoint(p) {
        // console.log(p.geoid);
        if (!this.pointsMap.has(p.geoid)) {
            const point = new GeoVis.Point([parseFloat(p.lng), parseFloat(p.lat), 10], {
                id: p.geoid,
                color: new GeoVis.Color(255 / 255, 0 / 255, 32 / 255, 1.0),
                pixelSize: 8
            }).addTo(window.earth.features);
            // console.log(point);
            // point.id = p.geoid;
            // point.on('click', () => { alert('ddd'); });
            this.pointsMap.set(p.geoid, point);
        }
    }

    removePoints() {
        this.pointsMap.forEach((value, key) => {
            value.removeFrom(window.earth.features);
            this.pointsMap.delete(key);
        });
    }

    loadPanorama(options) {
        let url = '';
        const state = this.state;
        if (typeof options === 'string') {
            url = `http://192.168.44.56:8080/geowebcache/street/google_sqlite/panojson?gridSet=EPSG:4326&format=image/png&GEOID=${options}`;
        } else {
            url = `http://192.168.44.56:8080/geowebcache/street/google_sqlserver/panojson?gridSet=EPSG:4326&format=image/png&LOCATION=${options.lon},${options.lat}`
        }
        this.fetchData(url, (msg) => {
            try {
                const config = JSON.parse(msg.results);
                if (this.isPanoramaLoad === false) {
                    state.isPanorama = true;
                    state.geoid = config.geoid;
                    state.lon = parseFloat(config.lng);
                    state.lat = parseFloat(config.lat);
                    state.yaw = parseFloat(config.yaw);
                    this.setState(state);
                    this.isPanoramaLoad = true;
                }
            } catch (e) {
                console.error(e);
            }
        });
    }

    close() {
        this.setState({
            isPanorama: false,
            geoid: undefined,
            lon: 0,
            lat: 0,
            yaw: 0
        });
        this.isPanoramaLoad = false;
    }

    init() {
        const earth = window.earth;
        earth.on('mouseMove', (event) => {
            if (this.isLeftDown === true) {
                const position = this.getBBOX();
                if (position[2] - position[0] <= 0.01 && position[3] - position[1] <= 0.01) {
                    console.log(position);
                    this.getSegmentInfo(position);
                }
            }
        });
        earth.on('leftDown', (event) => { this.isLeftDown = true; });
        earth.on('leftUp', (event) => {
            this.isLeftDown = false;
            // pick points;
            // console.log(event.windowPosition);
            const point = earth.scene.pick(new Engine.Cartesian2(event.windowPosition[0], event.windowPosition[1]));
            if (point) {
                console.log(point);
                if (point.id) {
                    this.loadPanorama(point.id);
                } else {
                    this.loadPanorama({ lon: event.position[0], lat: event.position[1] });
                }
            } else {
                console.log('此处无街景');
            }
        });
        earth.on('wheel', (event) => {
            const position = Engine.Cartographic.fromCartesian(earth.camera.position);
            if (position.height < 8000) {
                const pos = this.getBBOX();
                if (pos[2] - pos[0] <= 1 && pos[3] - pos[1] <= 1) {
                    console.log(pos);
                    this.getSegmentInfo(pos);
                }
            } else {
                this.removePoints();
            }
        });
    }

    fetchData(url, callback) {
        fetch(url).then((response) => {
            // console.log(response);
            response.json().then((data) => {
                callback(data);
            });
        }).catch((err) => { console.error(err); });
    }

    render() {
        // const canvas = document.getElementById('geovis-earth');
        // const panoWidth = canvas.offsetWidth / canvas.offsetHeight > 1.2 ? canvas.offsetHeight * 1.2 / 2 + 70 : canvas.offsetWidth;
        // const panoStyle = {
        //     width: `${panoWidth}px`,
        //     height: `${canvas.offsetHeight / 2}px`,
        //     left: `${(canvas.offsetWidth - panoWidth) / 2}px`
        // }
        const panorama = this.state.isPanorama === true ? (
            <div className={styles.panorama}>
                <div className={styles.close} onClick={this.close.bind(this)}></div>
                <iframe
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  className={styles.panorama}
                  src={`./google_sqlite.html?geoid=${this.state.geoid}&lon=${this.state.lon}&lat=${this.state.lat}&yaw=${this.state.yaw}`}
                >
                </iframe>
            </div>
        ) : null;
        return (
            <div>
                {panorama}
            </div>
        );
    }
}
