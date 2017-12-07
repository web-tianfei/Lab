import React,{Component} from 'react';
import { render } from 'react-dom';
import styles from './sizeChange.css';

const imgList = [
	{
        img : "./src/assets/放大.png",
        name:'img1'
        
	},
	{
		img : "./src/assets/缩小.png",
        name:'img2'
    },
    {
		img : "./src/assets/复位.png",
        name:'img3'
    }
]

class SizeChange extends Component{
    
    onclick(){
        
        earth.flyTo([105.218,35.58,18000000])
    }
    onclick1(){
        earth.zoomIn();
    }
    onclick2(){
        earth.zoomOut();
    }
    render(){
       
        return(
            <div className={styles['sizeChange']}>
                <button onClick={this.onclick1}><img src={imgList[0].img} /></button>
                <button onClick={this.onclick2}><img src={imgList[1].img} /></button>
                <button className={styles['reset']} onClick={this.onclick.bind(this)}><img src="./src/assets/复位.png" /></button> 
            </div>
            
        )
    }
}
export default SizeChange