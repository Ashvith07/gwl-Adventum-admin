import React, { Component } from 'react';
import GraphCard from "../../common/card/GraphCard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {Grid
} from "@material-ui/core";
import axios from 'axios';
import { Button, MenuItem, FormControl, TextField } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';

class RateOfLabelledImages extends Component {
    state={
      type:'bar',
        options : {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Number of images labelled',
                  ticks: {
                    callback: function(label, index, labels) {
                      return label;
                    },
                    fontSize: 18,
                    fontColor: 'black'
                 },
                  display: true
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Users',
                  ticks: {
                    callback: function(label, index, labels) {
                      return label.toFixed(2) + "%";
                    },
                    fontSize: 18,
                    fontColor: 'black'
                 },
                  display: true
                }
              }]
            }     
          },
        data: {
            labels: [],
            datasets: [{
            label: "User Labelled Images Evaluation",
            backgroundColor: '#42F5E6',
            borderColor: 'rgb(255, 99, 132)',
            values: [],
            }],
            backendResponse: false
        },
        filterType: 'Yesterday',
        filterArr: ['Yesterday','Weekly','Monthly']
    }

    componentDidMount(){
      
      axios.post(`http://localhost:8081/api/`).then(response => {
        console.log(response.data.res,"response");
      
        var tempArr1=[];
        var tempArr2=[];
        response.data.res.forEach(user=> {
          
           tempArr1.push(user.user_name);
           tempArr2.push(parseInt(user.labelled_images));
         });
         this.setState({
          data: {
            labels:tempArr1,
            datasets: [{
              label: "User Labelled Image Evaluation",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data:tempArr2
          }],
          backendResponse: true
          }
        })
        
      })
        .catch(err => console.log(err));
    
    }

    handleChange = name => event => {
        debugger
        this.onClickType(event.target.value);
        this.setState({ [name]: event.target.value });
        debugger
      };

    onClickType =(filterType) => {
        debugger 
        console.log(filterType,'Filter');
        
        let requiredDate ={};
        let currentDateEpoc = new Date().getTime() ;
        let requiredDateEpoc;
      var currentDate = new Date();
      var tempCurrentDate = new Date();
        
        debugger
       if(filterType == 'Yesterday'){
        debugger
        tempCurrentDate.setDate(tempCurrentDate.getDate()-1);
       }
       else if(filterType == 'Weekly'){
        tempCurrentDate.setDate(tempCurrentDate.getDate()-7);
       }
       else {
        tempCurrentDate.setDate(tempCurrentDate.getDate()-30);
       }debugger


       requiredDateEpoc = tempCurrentDate.getTime()/1000;

        console.log(tempCurrentDate,"tempCurrentDate1");
        console.log(currentDate,"currentDate1");


        console.log(currentDateEpoc,"currentDateEpoc");
        console.log(requiredDateEpoc,"requiredDateEpoc");

        // requiredDate=tempCurrentDate;
        // let requiredDateSplit =requiredDate.toString().split(' ');
        // let month1= requiredDateSplit[1]; //nov
        // let date1 = requiredDateSplit[2];  //27
        // let year1 = requiredDateSplit[3];   //2019
        // let finalRequiredDate =date1+ '/'+month1+'/'+year1;
        // console.log(finalRequiredDate,"finalRequiredDate");
        // debugger
        // let currentDateSplit = currentDate.toString().split(' ');
        // let month2= currentDateSplit[1]; 
        // let date2 = currentDateSplit[2]; 
        // let year2 = currentDateSplit[3];   
        // let finalCurrentDate =date2+ '/'+month2+'/'+year2;
        // console.log(finalCurrentDate,"finalCurrentDate");
        debugger
        debugger
        let tempArr1 =[];
        let tempArr2=[];
        axios.post(`http://localhost:8081/api/rate_of_labelled_images_graph`, {requiredDate: requiredDateEpoc, currentDate:currentDateEpoc})
      .then(response => {
        console.log(response);
        debugger
        response.data.res.forEach(data=> {
          
            tempArr1.push(data.user_name);
            tempArr2.push(data.labelled_image);
          });
             console.log(tempArr1,"tempArr1");
             console.log(tempArr2,"tempArr2");
             
    })
      .catch(error => console.log(error) )
    
  
      }


    

    render() {
      const {backendResponse,filterType,filterArr} = this.state;
      const s = ''
        return (
            <Grid>

                <Grid item md ={12}> <TextField 
          id="standard-select-currency-native"
          select
          label=" select filter"
          value={filterType}
          onChange={this.handleChange('filterType')}
          SelectProps={{
            native: true
          }}
          helperText="Please select your filter"
          margin="normal"
        >
          {filterArr.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        {/* <Button onClick ={() => {this.onClickType(filterType)}}>Click to apply filter</Button> */}
        </Grid>       
              <GraphCard 
                type={this.state.type} 
                data={this.state.data}
                options={this.state.options}
                height={300}
                width={700} /> 
            </Grid>
        );
    }
}

export default RateOfLabelledImages;