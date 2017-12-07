import React, {Component} from 'react';
import { render } from 'react-dom';
import Home from './components/Home/home.jsx'
import Land from './components/Land/land.jsx'
import ThemeHead from './components/ThemeHead/themeHead.jsx'
import Earth from './components/Earth/Earth.jsx'
import GlobalPerson from './components/GlobalPerson/globalPerson.jsx'
import TianJinExplosion from './components/TianJinExplosion/tianJinExplosion.js'
import GlobalPolyline from './components/GlobalPolyline/globalPolyline'
import ChinaTrain from './components/ChinaTrain/chinaTrain.js'
import BeijingDisaster from './components/BeijingDisaster/beijingDisaster'
import GlobalSeismic from './components/GlobalSeismic/globalSeismic'
import EducationCollage from './components/EducationCollage/educationCollage'
import EducationMiddleschool from './components/EducationMiddleschool/educationMiddleschool'
import EducationPrimaryschool from './components/EducationPrimaryschool/educationPrimaryschool'
import EducationKindergarten from './components/EducationKindergarten/educationKindergarten'
import EducationTechnicalschool from './components/EducationTechnicalschool/educationTechnicalschool'
import BeijingBus from './components/BeijingBus/beijingBus'
import SmartGPhone from './components/SmartGPhone/SmartGPhone'

import ChinaPerson from './components/ChinaPerson/chinaPerson'
import ChinaOldPerson from './components/ChinaOldPerson/chinaOldPerson'
import ChinaWorker from './components/ChinaWorker/chinaWorker'
import PersonGlobal from './components/PersonGlobal/personGlobal'
import TibetPanorama from './components/TibetPanorama/TibetPanorama';
import OgasawaraIslands from './components/OgasawaraIslands/OgasawaraIslands.js'
import Chengdu from './components/Chengdu/chengdu'

import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const EarthTheme = ({ match }) => (
  <div>
    <Earth></Earth>
    <Route path={`${match.url}/1970年全球人口`} component={GlobalPerson}/>
    <Route path={`${match.url}/天津爆炸`} component={TianJinExplosion}/>
    <Route path={`${match.url}/全球航线`} component={GlobalPolyline}/>
    <Route path={`${match.url}/全国火车站`} component={ChinaTrain}/>
    <Route path={`${match.url}/北京地质灾害`} component={BeijingDisaster}/>
    <Route path={`${match.url}/全球地震分布`} component={GlobalSeismic}/>
    <Route path={`${match.url}/全国大学分布`} component={EducationCollage}/>
    <Route path={`${match.url}/北京中学分布`} component={EducationMiddleschool}/>
    <Route path={`${match.url}/全国主要城市小学分布`} component={EducationPrimaryschool}/>
    <Route path={`${match.url}/全国主要城市幼儿园分布`} component={EducationKindergarten}/>
    <Route path={`${match.url}/全国技术院校分布`} component={EducationTechnicalschool}/>
    <Route path={`${match.url}/中国人口比例`} component={ChinaPerson}/>
    <Route path={`${match.url}/中国老年人口比例`} component={ChinaOldPerson}/>
    <Route path={`${match.url}/中国就业人口`} component={ChinaWorker}/>
    <Route path={`${match.url}/全球人口`} component={PersonGlobal}/>
    <Route path={`${match.url}/北京市公交线路密度分布`} component={BeijingBus}/>
    <Route path={`${match.url}/成都3D图`} component={Chengdu}/>
    <Route path={`${match.url}/西藏-川藏公路`} component={TibetPanorama}/>
    <Route exact path={match.url} render={() => (
      <h1>无此专题</h1>
    )}/>  
  </div>
)

const BasicExample = () => (
  <HashRouter>
    <div>      
      <Route exact path="/" component={Home} />
      <Route path="/land" component={Land} />
      <Route path="/themeHead" component={ThemeHead} />
      <Route path="/earth" component={EarthTheme} ></Route> 
      <Route path="/smartGPhone" component={SmartGPhone} ></Route> 
    </div>
  </HashRouter>
)

export default BasicExample;


