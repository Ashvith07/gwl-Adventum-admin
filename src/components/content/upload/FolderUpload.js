import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone'
import './FolderUpload.css'


class FolderUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
          files: [],
          drawerOpenned:true
        };
      }

      componentWillReceiveProps(props){
        this.setState({
            drawerOpenned:props.drawer
        })
    }

      handleChange(files){
        this.setState({
          files: files
        });
      }
      render(){
        return (
          <div>
        <div className={(this.state.drawerOpenned==true)?"small-card-shift-right":"small-card-shift-left"}>

            <input  directory="" webkitdirectory="" type="file" />
            </div>
          </div>
        )  
        }
}

export default FolderUpload;