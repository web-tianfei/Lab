import React, { Component } from 'react';
import { render } from 'react-dom';

const GeoVis = window.GeoVis;
const Engine = window.Engine;
const random = max => Math.floor((Math.random() < 0.5 ? -1 : 1) * Math.random() * max * 100) / 100;
const rand2 = (min, max) => Math.floor((Math.random() * (max - min) + min) * 100) / 100;
export default class Karpersky extends Component {
    componentWillMount() {
        this.state = {
            needUpdatePoints: true
        }
    }
    componentDidMount() {
        this.earth = window.earth;
        this.earth.scene.mode = Engine.SceneMode.SCENE3D;
        this.layer = new GeoVis.TileLayer('./assets/dark/{z}/{x}/{y}.png', {
            projection: 'EPSG:900913'
        }).addTo(this.earth.layers)
        this.geojson = new GeoVis.GeoJson('./src/common/countries.geo.json', {
            outline: true,
            // fill: true,
        }).addTo(this.earth);
        // this.geojson.on('finish', (geojson) => {
        //     geojson.target.features.polygons.forEach((feature) => {
        //         feature.fillColor = GeoVis.Color.fromCssString(Math.random() < 0.5 ? '#111' : '#222');
        //         feature.extrudedHeight = 1e4;
        //     });
        // });
        this.curvers = new Map();
        this.lines = new Map();

        this.points = new Map();
        this.shines = new Map();
        this.initData();
        this.loadData();
        this.inv = window.setInterval(() => {
            this.lines.forEach((value, key) => {
                const length = this.curvers.get(key).positions.length - value.line.colors.length;
                value.lineIndex = value.lineIndex < length ? value.lineIndex + 1 : 0;
                if (value.lineIndex === Math.floor(length / 2)) {
                    value.start.removeFrom(this.earth.features);
                    value.end.addTo(this.earth.features);
                } else if (value.lineIndex === 0) {
                    value.start.addTo(this.earth.features);
                    value.end.removeFrom(this.earth.features);
                }
                value.line.positions = this.curvers.get(key).positions.slice(value.lineIndex, value.line.colors.length + value.lineIndex);
            });
        }, 10);
        this.animate();
        // points
        this.loadPoints();
    }

    componentWillUnmount() {
        this.clearOnce(this.inv);
        window.clearInterval(this.allInv);
        this.setState({ needUpdatePoints: false});
        this.removePoints();
        this.layer.removeFrom(this.earth.layers);
        this.geojson.removeFrom(this.earth);
        this.earth.scene.mode = Engine.SceneMode.SCENE2D;
        this.earth = undefined;
    }

    fetchData(url, callback) {
        fetch(url).then((response) => {
            // console.log(response);
            response.json().then((data) => {
                callback(data);
            });
        }).catch((err) => { console.error(err); });
    }

    initData() {
        const randomLength = Math.floor(Math.random() * 20 + 30);
        for (let i = 0; i < randomLength; i++) {
            let start, end, color;
            if (i < randomLength / 4) {
                start = [random(180), random(50), 1000];
                end = [random(180), random(50), 1000];
                color = GeoVis.Color.fromCssString("#D81B60");
            } else {
                start = [-rand2(80, 120), rand2(30, 40), 1000];
                end = [Math.abs(random(180)), Math.abs(random(50)), 1000];
                color = GeoVis.Color.fromCssString("#29b2cf");
            }
            const curve = new GeoVis.BezierCurve({
                start: start,
                end: end,
                curve: 0.5,
                fit: 3
            });
            curve.color = color;
            this.curvers.set(i, curve);
        }
    }

    initpoints(min, max) {
        const randomPoints = Math.floor(Math.random() * (max - min) + min);
        for (let i = 0; i < randomPoints; i++) {
            const point = [random(130), random(40), 1000];
            const color = Engine.Color.fromRandom({ minimumAlpha: 0.4 });
            this.points.set(i, { point, color });
        }
    }

    loadPoints() {
        if (this.pointInv) {
            this.shines.forEach((value) => {
                value.removeFrom(this.earth.features);
            });
            this.points.clear();
            this.shines.clear();
        }
        const min = Math.floor(Math.random() * 10 + 20);
        const max = Math.floor(Math.random() * 150 + 100);
        this.initpoints(min, max);
        let count = 0;
        this.pointInv = window.setInterval(() => {
            // console.log(count);
            const point = new GeoVis.Point(this.points.get(count).point, {
                color: this.points.get(count).color,
                pixelSize: 4
            }).addTo(this.earth.features);
            this.shines.set(count, point);
            setTimeout(() => { point.removeFrom(this.earth.features); }, 1000);
            count++;
            if (count >= this.points.size) {
                window.clearInterval(this.pointInv);
                if (this.state.needUpdatePoints === true) this.loadPoints();
            }
        }, 50);
    }

    removePoints() {
        window.clearInterval(this.pointInv);
        this.shines.forEach((value) => {
            value.removeFrom(this.earth.features);
        });
        this.points.clear();
        this.shines.clear();
    }

    loadData() {
        this.curvers.forEach((value, key) => {
            const colorLength = Math.floor(value.positions.length * 0.4);
            const colors = new Array(colorLength);
            for (let i = 0; i < colorLength; i++) {
                const alpha = i < colorLength / 2 ? i / colorLength : (colorLength - i) / colorLength;
                colors[i] = value.color.withAlpha(alpha * 2)
            }
            colors.push(value.color.withAlpha(0.0));
            const line = new GeoVis.Polyline(value.positions.slice(0, colors.length), {
                colors: colors,
                vertexColor: true,
                followSurface: true,
                width: 2.0
            }).addTo(this.earth.features);
            const point = new GeoVis.Point(value.positions[0], {
                color: value.color.withAlpha(0.6),
                pixelSize: 4
            }).addTo(this.earth.features);
            const endpoint = new GeoVis.Point(value.positions[value.positions.length - 1], {
                color: value.color.withAlpha(0.6),
                pixelSize: 4
            });
            this.lines.set(key, {
                line: line,
                start: point,
                end: endpoint,
                lineIndex: 0
            });
        });
    }

    animate() {
        this.allInv = window.setInterval(() => {
            this.clearOnce(this.inv);
            this.initData();
            this.loadData();
            this.inv = window.setInterval(() => {
                this.lines.forEach((value, key) => {
                    const length = this.curvers.get(key).positions.length - value.line.colors.length;
                    value.lineIndex = value.lineIndex < length ? value.lineIndex + 1 : 0;
                    if (value.lineIndex === Math.floor(length / 2)) {
                        value.start.removeFrom(this.earth.features);
                        value.end.addTo(this.earth.features);
                    } else if (value.lineIndex === 0) {
                        value.start.addTo(this.earth.features);
                        value.end.removeFrom(this.earth.features);
                    }
                    value.line.positions = this.curvers.get(key).positions.slice(value.lineIndex, value.line.colors.length + value.lineIndex);
                });
            }, 10);
        }, 3000);
    }

    clearOnce(invt) {
        this.lines.forEach((value) => {
            value.line.removeFrom(this.earth.features);
            value.start.removeFrom(this.earth.features);
            value.end.removeFrom(this.earth.features);
        });
        this.curvers.clear();
        this.lines.clear();
        window.clearInterval(invt);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
