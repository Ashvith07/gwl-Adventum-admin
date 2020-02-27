import React, { Component } from 'react';
import GraphCard from "../../common/card/GraphCard";
import axios from 'axios';
import { mdiDatabaseSettings } from '@mdi/js';


class UserTimeEvaluation extends Component {
    state={
      type:'bar',
        options : {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Time taken(hh.mm)',
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
            backgroundColor: '#7EB6FF',
            borderColor: 'rgb(255, 99, 132)',
            data: []
            }]
        }
    }

componentDidMount(){

  axios.get(`http://localhost:8081/api/user_evaluation_no_of_hours_graph`).then(response => {
    console.log(response.data.res,"response");
  
    var tempArr1=[];
    var tempArr2=[];
    response.data.res.forEach(user=> {
      
       tempArr1.push(user.user_name);
       tempArr2.push(parseFloat(user.time));
     });
     this.setState({
      data: {
        labels:tempArr1,
        datasets:[{
          label: "User Time Evaluation",
            backgroundColor: '#7EB6FF',
            borderColor: 'rgb(255, 99, 132)',
        data:tempArr2,
      }]
      }
    })
    
  })
    .catch(err => console.log(err));

}


    render() {
      console.log(this.state,"state");
      
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

export default UserTimeEvaluation;