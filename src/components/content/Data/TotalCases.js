import React, { Component } from 'react';
import TextCard from "../../common/card/TextCard";
import axios from 'axios';

const textConfig={
    text: "Total No. of Cases",
    color:'#CCCCFF',
    textColor:'white',
    fontSize:'30px', 
    fontWeight: 'bolder'
}
let count;
class TotalCases extends Component {
    constructor(props){
        super(props)
        this.state={
            total:[]
        }
    }
    

    componentWillMount(){
        this.getData(); 
    }

    getData= async ()=>{
        let res = await axios.get("http://localhost:8081/api/images_cases_count");
        count = res.data.count[0].count;
        this.setState({ total: count });    
    }
  
    render() {
        return (
            <div>
                <TextCard 
                    color={textConfig.color} 
                    textColor={textConfig.textColor} 
                    fontSize={textConfig.fontSize} 
                    text={textConfig.text} 
                    fontWeight={textConfig.fontWeight}
                    count={count} />
            </div>
        );
    }
}

export default TotalCases;