import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./Card1.css";
import Charts from "../chart/UserTimeEvaluation";
// import DonutChart from "../chart/DonutChart";
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from "../chart/Images";
import TotalCases from "../Data/TotalCases";
import ImagesLabelled from "../Data/ImagesLabelled";
import Users from "../users/Users/Users";

class Card1 extends Component {
    constructor(props){
        super(props);
        this.state={
            drawerOpenned:true
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            drawerOpenned:props.drawer
        })
    }

    render() {
        return (
            
            (this.props.users == false)?  
                <div className="container-fluid">
               <div className="row">

               <div className="col-md-5">
               <p className={(this.state.drawerOpenned==true)?"small-card-shift-right":"small-card-shift-left"}>
               <TotalCases />
               </p>
               </div>
               <div className="col-md-5">
               <p className={(this.state.drawerOpenned==true)?"small-card-shift-right":"small-card-shift-left"}>
                <ImagesLabelled />
               </p>
               </div>
               <div className="col-md-2"></div>
               </div>
               <div className="row">
                   <div className="col-md-5">
                   <p className={(this.state.drawerOpenned==true)?"card-shift-right":"card-shift-left"}>
                       <Charts />
                   </p>
                   </div>
                   <div className="col-md-5">
                   <p className={(this.state.drawerOpenned==true)?"card-shift-right":"card-shift-left"}>
                       <Images />
                   </p>
                   </div>
                   <div className="col-md-2"></div>
           </div>
           </div>
            :
         
        ( <div className={(this.state.drawerOpenned==true)?"card-shift-right":"card-shift-left"}><Users /></div>)
            
        );
    }
}

export default Card1;