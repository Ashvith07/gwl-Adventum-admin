import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Images from "../content/chart/Images";
import Charts from "../content/chart/UserTimeEvaluation";

import TextCard from "../common/card/TextCard";



class BaseLayout extends Component {
  constructor(props){
    super(props);
    this.state = { 
      redirect: false,
      drawerIsOpen: true,
      dropdownHidden:false,
      showUsers:false,
      showUpload:false,
      styles:{
        root: {
          width: '100%',
          },
        flex: {
          flex: 1,
          },
        menuButton: {
          marginLeft: -12,
          marginRight: 20,
          },
        drawerHeader: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          },
        drawerPaper: {
          width: '200px',
          },
        drawerInner:{}
          }
        }
  }

  handleUsers = () => {
    this.setState({
      showUsers:true
    })
  }

  handleUpload = () => {
    this.setState({
      showUpload:true
    })
  }

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };
  
  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  handleDropdown = () =>{
    this.setState(state => {
      return {
        dropdownHidden: !state.dropdownHidden,
        };
    }) 
  }

  handleDropdownClose=()=>{
    this.setState({
      dropdownHidden:false
    })
  }
    
  dropdown = React.createRef();
  state = {
    dropdownHidden: false,
  };
    
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.dropdown.current && !this.dropdown.current.contains(event.target)) {
      this.setState({
        dropdownHidden: false,
      });
    }
  };


  componentDidMount() {
    this.verifyFromServer()
}


  verifyFromServer = () => {
    axios.post(`http://localhost:8081/api/verify`, {
        "auth_token": sessionStorage.getItem('token')
    })
        .then(response => {
            if (!response.data.isloggedIn) {
                this.logoutHandler()
            }
        })
        .catch(error => console.log(error)
        )
}



    
    logoutHandler = () => {
      console.log("logout");
      
      axios.put(`http://localhost:8081/api/logout`, {
        "auth_token": sessionStorage.getItem('token')
      })
        .then(response => {
          console.log(response);

          sessionStorage.removeItem('UUID');
          sessionStorage.removeItem('USERNAME');
          sessionStorage.removeItem('token');

          if (!response.data.isloggedIn) {
            this.setState({ redirect: true })
          }

        })
        .catch(error => console.log(error)
        )
    }

    

render() {


  return (
    
    <div className={this.state.styles.root}>

      {this.state.redirect ? <Redirect to="/" /> : null}

      {/* <Card1 users={this.state.showUsers} /> */}


      <div className="container-fluid">
               <div className="row">

               <div className="col-md-1"></div>
               <div className="col-md-5">
                    <TextCard 
                     color={'#CCCCFF'} 
                     textColor={'#fff'} 
                     fontSize={'30px'} 
                     text={"Total number of case"} 
                     fontWeight={'bold'}
                     count={18}
                     />
               </div>
               <div className="col-md-5">
                <TextCard 
                    color={'#9874ca'} 
                    textColor={'#fff'} 
                    fontSize={'30px'} 
                    text={"Number of cases solved"} 
                    fontWeight={'bold'}
                    count={12}
                     />
               </div>
               <div className="col-md-1"></div>
               </div>

               <div className="row">
               <div className="col-md-1"></div>

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

                   <div className="col-md-1"></div>
                </div>

           </div>

    </div>
  );
  }
}


export default BaseLayout;