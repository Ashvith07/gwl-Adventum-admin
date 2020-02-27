import React, { Component } from 'react';
import TextCard from "../../common/card/TextCard";
import axios from 'axios';

const textConfig={
    text: "Total Images Labelled",
    color:'#7EB6FF',
    textColor:'white',
    fontSize:'30px', 
    fontWeight: 'bolder'
}
let labelledCount;

class ImagesLabelled extends Component {
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
        let res = await axios.get("http://localhost:8081/api/images_labelled_count");
        labelledCount = res.data.count[0].count;
        this.setState({ total: labelledCount });    
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
                    count={labelledCount} />
            </div>
        );
    }
}

export default ImagesLabelled;