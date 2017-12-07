import React,{Component} from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import styles from './home.css'
import Data from '../../data.js'

//公共list组件
class Commonli extends Component {
	goOther(event){
		let hrefCon = this.refs.title.innerText;
		window.open("http://m.lab.geovis.ai:10019/#/earth/"+hrefCon+"");   
	}
	render(){
		return (
			<div className={styles['themes-li']} onClick={this.goOther.bind(this)}>
				<img src={this.props.themesliImg} />
				<div>
					<p className={styles["themes-li-title"]} ref="title">{this.props.titleDesc}</p>
					<p className={styles["themes-li-lettertitle"]}>{this.props.letterDesc}</p>
					<p className={styles["themes-li-descdesc"]}>{this.props.connentDesc}</p>			
				</div>	
				<div className={styles["themes-li-foot"]}>
					<img src="./src/assets/user.png" />
					<span className={styles["user-home"]}>{this.props.author}</span>
					<span className={styles["fr"]}>{this.props.time}</span>
				</div>	
			</div>
		)
	}
}
//全部部分的组件
class Allthemes extends Component {
	constructor(props) {  
        super(props);  
        this.state = {
        	searchStr: 'aa',
        	data:Data.details1,
        	allData : '',
        	isReady : false
        };  
    }
    componentWillMount(){
  //   	const re = this;
		// let toke = 'feaQuaIKtUxemo8maVp4q8AO+qJj0qN2h1TZdKvLHCogm5zgLiTc1oXdQq8/akUbfqm/2c/njmGOp3QqTweoctXYV17RC9myFmeqt2wnxfHJMcUPQ3jNMAm4wY+im/PmoHGHknyzmzoj/ftsR3YnzeqLL+cIOywHCo/AuU5YyDA=';
		// fetch("http://192.168.48.3:8808/metadata-service/metadata/manage/query", {
		// 	  method: "POST",
		// 	  headers: {
		// 	    'Content-Type': 'application/x-www-form-urlencoded'
		// 	  },
		// 	  body: "dataType=LAB0&token="+toke+""
		// 	}).then(function(response) {
		//   		response.json().then( (dataval) => {
		//   			re.setState({
		//   				data : dataval,
		//   				allData : dataval ,
		//   				isReady : true
		//   			})
		//   		})
		// });
    }	
    componentDidMount(){
    	// console.log(this.state.data)
    }
	tabTheme(msg,event){
		let len = document.querySelectorAll(`.${styles['theme-tab']} > ${'li'}`).length;
		for(let i =0;i<len;i++){
			// document.querySelectorAll(`.${styles['theme-tab']} > ${'li'}`)[i].style.background = 'white';
			document.querySelectorAll(`.${styles['theme-tab']} > ${'li'}`)[i].style.color = 'black';
		}
		// event.target.style.background = '#009999';				
		event.target.style.color = '#009999';				
		switch(msg) {
			case '全部' :				
				this.setState({data:Data.details1})
			;break;
			case '学校分布' :				
				// let arr = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '学校分布'){
				// 		arr.push(val)
				// 	}
				// })
				// this.setState({data:arr})
				this.setState({data:Data.details2})
			;break;
			case '人口普查' :
				// let arr2 = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '人口普查'){
				// 		arr2.push(val)
				// 	}
				// })
				// this.setState({data:arr2})
				this.setState({data:Data.details3})
			;break;
			case '交通' :
				// let arr3 = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '交通'){
				// 		arr3.push(val)
				// 	}
				// })
				// this.setState({data:arr3})
				this.setState({data:Data.details4})
			;break;
			case '自然灾害' :
				// let arr4 = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '自然灾害'){
				// 		arr4.push(val)
				// 	}
				// })
				// this.setState({data:arr4})
				this.setState({data:Data.details5})
			;break;
			case '社会焦点' :
				// let arr5 = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '社会焦点'){
				// 		arr5.push(val)
				// 	}
				// })
				// this.setState({data:arr5})
				this.setState({data:Data.details6})
			;break;
			case '智慧城市' :
				// let arr6 = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '智慧城市'){
				// 		arr6.push(val)
				// 	}
				// })
				// this.setState({data:arr6})
				this.setState({data:Data.details7})
			;break;
			case '街景' :
				// let arr7 = [];
				// this.state.allData.map( (val) => {
				// 	if(val.subject == '街景'){
				// 		arr7.push(val)
				// 	}
				// })
				// this.setState({data:arr7})
				this.setState({data:Data.details8})
			;break;			
			default:alert("组件不存在");
		}
	} 
	getLocalTime(chuo){
		let time = new Date( chuo ).toLocaleString()
		return time.slice(0,time.indexOf(' '));
	} 	  
	render(){
		return (
			<div className={styles["content-main"]}>
				<ul className={styles["theme-tab"]}>
					{
						Data.titleArr.map((val) => 
							<li key={val.toString()} onClick={this.tabTheme.bind(this,val)}>{val}</li>
						)
					}
				</ul>
				<div>			
					{
						this.state.data.map((val) =>
							<Commonli key={val.author.toString()} themesliImg={val.themesliImg} titleDesc={val.titleDesc} letterDesc={val.letterDesc} connentDesc={val.connentDesc} author={val.author} time={val.time}></Commonli>
						)
					}
				</div>
			</div>		
		)
	}
}
//home页面总体结构
class Home extends Component{
    render(){
        return(
			<div className={styles["home-main"]}>		
				<header>
					<img src="./src/assets/logo.png" />
					<span>GV Lab</span>			
					<a href="#" className={styles["register"]}>注册</a>
					<Link to="/land" className={styles['homephone-land']}>登陆</Link>	
					<img className={styles["userpng"]} src="./src/assets/user.png" />						
				</header>
				<nav>
					<img src="./src/assets/indexbg.png" />
				</nav>	
				<Link to="/smartGPhone" className={styles["global-enter"]}>GV Lab</Link>						
				<Allthemes></Allthemes>
				<div className={styles["home-footer"]}>航天星图科技(北京)有限公司版权所有</div>
			</div>
        )
    }
}
export default Home;
