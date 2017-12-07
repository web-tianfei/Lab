import React, { Component } from 'react'
import { render } from 'react-dom'
import hangxianData from './hangxian.js'

const GeoVis = window.GeoVis;
const Engine = window.Engine;
class GlobalPolyline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentObj: []
        }


    }

    componentDidMount() {
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(116.16, 40.11, 40000000.0)
        });
        // 初始时加Collection
        this.billboards = window.earth.scene.primitives.add(new Engine.BillboardCollection());
        this.billboards._rs = Engine.RenderState.fromCache({
            depthTest: {
                enabled: true,
            },
            depthMask: false,
            blending: Engine.BlendingState.ADDITIVE_BLEND,
        });

        const re = this;
        for (let j = 0; j < 6700; j++) {
            if (hangxianData[0][j]) {
                re.addPloyline(0, j, '#66FEFF');
            }
            if (hangxianData[1][j]) {
                re.addPloyline(1, j, '#EA8036');
            }
            if (hangxianData[2][j]) {
                re.addPloyline(2, j, '#7ADC46');
            }
            if (hangxianData[3][j]) {
                re.addPloyline(3, j, '#66FEFF');
            }
        }
        this.inv = window.setInterval(() => {
            this.state.currentObj.map((val, index) => {
                const billboard = val.bill_texture;
                // let billboard_index = val.bill_index;
                // console.log(val.bill_index < val.positions.length - 1);
                val.bill_index = val.bill_index < val._positions.length - 1 ? val.bill_index + 1 : 0;
                billboard.position = Engine.Cartesian3.fromDegrees(
                    val._positions[val.bill_index][0], val._positions[val.bill_index][1], val._positions[val.bill_index][2]);
            })
        }, 80);

    }
    componentWillUnmount() {
        //删除
        window.earth.scene.mode = Engine.SceneMode.SCENE2D;
        this.billboards.removeAll();
        this.state.currentObj.map((val, index) => {
            val.removeFrom(window.earth.features);
        });
        window.clearInterval(this.inv);
    }

    addPloyline(index, max, lineColor) {
        const beser = new GeoVis.BezierCurve({
            start: [hangxianData[index][max].D_lon, hangxianData[index][max].D_lat, 0],
            end: [hangxianData[index][max].S_lon, hangxianData[index][max].S_lat, 0.0],
            width: 0.8
        });
        const line = new GeoVis.Polyline(beser.positions, {
            colors: [GeoVis.Color.fromCssString(lineColor).withAlpha(0.6)],
            vertexColor: true,
            followSurface: true,
            width: 2.0
        }).addTo(window.earth.features);
        this.state.currentObj.push(line);
        line.bill_texture = this.billboards.add({
            position: Engine.Cartesian3.fromDegrees(beser.positions[0][0], beser.positions[0][1], beser.positions[0][2]),
            image: './src/assets/line_texture.png',
            scale: 0.2
        });
        line.bill_index = 0;
        // return line;
    }
    render() {
        return (
            <div />
        )
    }
}
export default GlobalPolyline;
