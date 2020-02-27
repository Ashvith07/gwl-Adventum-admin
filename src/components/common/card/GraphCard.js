import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Bar, Line} from 'react-chartjs-2';

class GraphCard extends Component {
    constructor(props){
        super(props);
        console.log("props of graph", this.props);
        this.state={
           
        }
    }
    render() {
        console.log("props of graphhhhhhhhhhhhhhh", this.props.data);
            return (
                <Card>
                    <CardContent>
                        <Typography>
                            {
                                (this.props.type=='bar')?
                            
                        < Bar
                            data={this.props.data}
                            options={this.props.options}
                            height={this.props.height}
                            width={this.props.width}
                        />  
                           :'' }
                        </Typography>
                    </CardContent>
                </Card>
        
        
        );
    }

}

export default GraphCard;