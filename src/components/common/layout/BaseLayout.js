import React, { Component } from 'react';
import Logo from '../../../assets/smallLogo.png';
import "./BaseLayout.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Card1 from "../../content/card/Card";
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import FolderUpload from "../../content/upload/FolderUpload"

let field;
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
 
      
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={this.handleDrawerOpen} className={this.state.styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={this.state.styles.flex}>
             <div className={(this.state.drawerIsOpen==true)?"items-shift-right":"items-shift-left"}>{console.log(this.state.drawerIsOpen)
             } <strong>ADMIN </strong></div>
          </Typography>&emsp;
          <Button  color="inherit"><strong>Dashboard</strong></Button>
            {/* &emsp;
            &emsp;
            &emsp;
            &emsp; */}
            
          <span style={{width:"100%"}}></span>
          <div><bold>Admin</bold></div>
          <IconButton color="inherit" >
            <NotificationsIcon />
          </IconButton>
          <Button variant="contained"  color="" width="40px"  onClick={this.logoutHandler}>
            LOGOUT
          </Button>
          {/* <Button color="white" onClick={this.onSubmit}>LOG OUT</Button> */}
          {/* <div className="dropdown"  ref={this.dropdown}><ArrowDropDownIcon onClick={this.handleDropdown} />
          </div>
          {this.state.dropdownHidden && (
          <Paper className="dropdown-new">
            <Typography>
              <ul>
                <li>Settings</li>
                <li>Profile</li>
                <li onClick={this.onSubmit}>
                  
                    Sign out
                 
                </li>
              </ul>
              </Typography>
          </Paper>  
          )} */}
        </Toolbar>
      </AppBar>
      <Drawer
          width="50%"
          variant="persistent"
          open={this.state.drawerIsOpen}
        >
        <Grid container spacing={3}>
        <Grid item xs>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <span className="header">
          <img src={Logo} />
          </span>
        </Grid>
        <Grid item xs></Grid>
        </Grid>
        <strong><p className="companyName">Adventum</p></strong>
        <div className="items">
          <strong><p>ADMIN DASHBAORD</p></strong>
          <p><Link onClick={this.handleUsers}>Users</Link></p>
          <p><Link onClick={this.handleUpload}>Upload</Link></p>
          </div>
      </Drawer>
      {this.state.showUpload?
      <FolderUpload drawer={this.state.drawerIsOpen} />:      <Card1 drawer={this.state.drawerIsOpen} users={this.state.showUsers} />

    }
    </div>
  );
  }
}

export default BaseLayout;