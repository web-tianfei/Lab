import React,{Component} from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import styles from './landing.css'

//账号登陆
class Userland extends Component{
	render(){
		return (
			<div>
				<div className={styles["input-chunk"]}>
					<img src="./src/assets/user.png" />
					<input type="text" name="" placeholder="邮箱/用户名" />
				</div>
				<div className={styles["input-chunk"]}>
					<img src="./src/assets/password.png" />
					<input type="password" name="" placeholder="密码" />
				</div>
			</div>
		)
	}
}
//手机号登陆
class PhoneLand extends Component{
	render(){
		return (
			<div>
				<div className={styles["input-chunk"]}>
					<img src="./src/assets/phone.png" />
					<input type="number" name="" placeholder="手机号码" />
				</div>
				<div className={styles["msg-chunk"]}>
					<div className={`${styles["input-chunk"]} ${styles["msg-test"]}`}>
						<img src="./src/assets/msg.png" />
						<input type="number" name="" placeholder="短信验证码" />						
					</div>
					<p>获取验证码</p>
				</div>				
			</div>
		)
	}
}
class Tabland extends Component{
	render(){
		if(this.props.istabland){
			return <Userland />
		}else{
			return <PhoneLand />
		}
	}
}
//登陆界面
class Landing extends Component{
	constructor(props){
		super(props)
		this.state = {
			landType : true,
		}
	}
	userType(event){
		this.setState({landType : true})
		event.target.style.color = '#009999'
		event.target.nextSibling.nextSibling.style.color = '#fff'
	}
	phoneType(event){
		this.setState({landType : false})
		event.target.style.color = '#009999'
		event.target.previousSibling.previousSibling.style.color = '#fff'
	}
	render(){
		return(
			<div className={styles["land-container"]}>
				<div className={styles["land-header"]}>
					<img src="./src/assets/logo.png" />
					<span>GEOVIS LAB</span>			
					<Link to="/">返回首页</Link>
				</div>	
				<img className={styles["landlogo-img"]} src="./src/assets/landlogo.png" />	
				<article>
					<div className={styles["title-tab"]}>
						<p onClick={this.userType.bind(this)}>账号登陆</p>
						<p>|</p>
						<p onClick={this.phoneType.bind(this)}>手机登陆</p>
					</div>
					<Tabland istabland={this.state.landType}></Tabland>
					<p className={styles["on-land"]}>登陆</p>
					<div className={styles["foot-tab"]}>
						<p>忘记密码?</p>
						<p>|</p>
						<p>注册账号</p>
					</div>
					<div className={styles["foot-split"]}> 
						<div></div>
						<p>使用第三方账号登陆</p>
						<div></div>
					</div>
					<div className={styles["foot-icon"]}>
						<img src="./src/assets/webo.png" />
						<img src="./src/assets/wechat.png" />
						<img src="./src/assets/qq.png" />
					</div>
				</article>
				
			</div>
		)
	}
}
export default Landing