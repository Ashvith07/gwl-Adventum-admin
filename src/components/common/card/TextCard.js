import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class TextCard extends Component {
    constructor(props){
        super(props);
        console.log("props", this.props);
        this.state={
            color: this.props.color,
            textColor: this.props.textColor,
            fontSize: this.props.fontSize,
            fontWeight: this.props.fontWeight
        }
    }
    render() {
        return (
            <Card style={{backgroundColor:this.state.color, margin:'43px 2% 43px 3%'}}>
                <CardContent>
                    <Typography>
                        <p 
                        style={{color:this.state.textColor, 
                        fontSize:this.state.fontSize,
                        fontWeight: this.state.fontWeight}}>{this.props.text}</p>
                        <p 
                        style={{color:this.state.textColor, 
                        fontSize:this.state.fontSize,
                        fontWeight: this.state.fontWeight}}>{this.props.count}</p>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default TextCard;