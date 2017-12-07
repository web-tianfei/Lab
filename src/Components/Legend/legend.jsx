import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './legend.css'

class PG_legend extends Component{
    render(){
        return(
            <div className={styles["PG_legend"]}>
                <div><div style={{backgroundColor: '#13e113'}}></div><span>人口数&#60;10万</span></div>
                <div><div style={{backgroundColor: '#12d50c'}}></div><span>人口数10万-100万</span></div>
                <div><div style={{backgroundColor: '#74b486'}}></div><span>人口数100万-1000万</span></div>
                <div><div style={{backgroundColor: '#f17828'}}></div><span>人口数1000万-1亿</span></div>
                <div><div style={{backgroundColor: '#cc2700'}}></div><span>人口数&#62;1亿</span></div>
            </div>
        )
    }
}
class CP_legend extends Component{
     render(){
         return(
             <div className={styles["CP_legend"]}>
                 <div><div style={{backgroundColor: 'rgb(255,220,0)'}}></div><span>人口数&#60;12938693</span></div>
                <div><div style={{backgroundColor: 'rgb(255,180,0)'}}></div><span>人口数12938693-28846170</span></div>
                <div><div style={{backgroundColor: 'rgb(255,150,0)'}}></div><span>人口数28846170-46023761</span></div>
                <div><div style={{backgroundColor: 'rgb(255,121,0)'}}></div><span>人口数46023761-65700762</span></div>
                <div><div style={{backgroundColor: 'rgb(255,64,0)'}}></div><span>人口数65700762-80417528</span></div>
                <div><div style={{backgroundColor: 'rgb(255,32,0)'}}></div><span>人口数80417528-104320459</span></div>
                <div><div  style={{backgroundColor: 'rgb(255,0, 0)'}}></div><span>人口数&#62;104320459</span></div>
             </div>
         )
     }
}
class CW_legend extends Component{
     render(){
         return(
             <div className={styles["CW_legend"]}>
                 <div ><div style={{backgroundColor: 'rgb(255,255,200)'}}></div><span>就业人口&#60;1293869</span></div>
                <div><div style={{backgroundColor: 'rgb(255,255,136)'}}></div><span>就业人口1293869-2884617</span></div>
                <div><div style={{backgroundColor: 'rgb(190,255,0)'}}></div><span>就业人口2884617-4602376</span></div>
                <div><div style={{backgroundColor: 'rgb(165,255,0)'}}></div><span>就业人口4602376-6570076</span></div>
                <div><div style={{backgroundColor: 'rgb(75,255,0)'}}></div><span>就业人口6570076-8041752</span></div>
                <div><div style={{backgroundColor: 'rgb(0,255,0)'}}></div><span>就业人口8041752-10432045</span></div>
                <div><div style={{backgroundColor: 'rgb(0,255,0)'}}></div><span>就业人口&#62;10432045</span></div>
             </div>
         )
     }
}
    class CO_legend extends Component{
     render(){
         return(
             <div className={styles["CO_legend"]}>
                 <div ><div style={{backgroundColor: 'rgb(255,255,128)'}}></div><span>老龄人口百分比&#60;7.67</span></div>
                <div><div style={{backgroundColor: 'rgb(255,255,64)'}}></div><span>老龄人口百分比7.67-9.73</span></div>
                <div><div style={{backgroundColor: 'rgb(255,255,32)'}}></div><span>老龄人口百分比9.73-11.53</span></div>
                <div><div style={{backgroundColor: 'rgb(255,255,0)'}}></div><span>老龄人口百分比11.53-13.21</span></div>
                <div><div style={{backgroundColor: 'rgb(255,128,0)'}}></div><span>老龄人口百分比13.21-15.43</span></div>
                <div><div style={{backgroundColor: 'rgb(255,64,0)'}}></div><span>老龄人口百分比15.43-17.42</span></div>
                <div><div style={{backgroundColor: 'rgb(255,32,0)'}}></div><span>老龄人口百分比&#62;17.42</span></div>
             </div>
         )
     }
}
class Legend extends Component{
    
    render(){
        let who_legend;
        switch(this.props.id){
            case'personGlobal':who_legend=<PG_legend />;break;
            case'chinaPerson':who_legend=<CP_legend />;break;
            case 'chinaWorker':who_legend=<CW_legend />;break;
            case 'chinaOldPerson':who_legend=<CO_legend />;break;
        }
        return(
            <div ref='tablezong' className={styles["table-zong"]}>
                <div className={styles["table-top"]}>
                    <div></div>
                    <span>图例</span>
                    <a onClick={this.props.onclick}>x</a>
                </div>
                <div className={styles["table-pop"]} >
                    {who_legend}
                </div>
                
            </div>
        )
    }
}
export default Legend