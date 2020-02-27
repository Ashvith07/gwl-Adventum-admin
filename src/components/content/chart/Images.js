import React, { Component } from 'react';
import GraphCard from "../../common/card/GraphCard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import axios from 'axios';

class Images extends Component {
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
            label: "User Time Evaluation",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            values: [],
            }],
            backendResponse: false
        }
    }

    componentDidMount(){
      
      axios.get(`http://localhost:8081/api/labelled_images_count_graph`).then(response => {
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
    

    render() {
      const {backendResponse} = this.state;
        return (
            <div>
          
              <GraphCard 
                type={this.state.type} 
                data={this.state.data}
                options={this.state.options}
                height={500}
                width={700} /> 
            </div>
        );
    }
}

export default Images;