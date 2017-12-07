import React from 'react';
import { render } from 'react-dom';
import './common/reset.css'
import Home from './components/Home/home.jsx'
import Land from './components/Land/land.jsx'
import ThemeHead from './components/ThemeHead/themeHead.jsx'
import SmartG from './components/SmartG/smartg.jsx'
import BasicExample from './Router.jsx'

render((
        <BasicExample></BasicExample>
     ),
     document.getElementById('app')
);
