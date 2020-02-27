import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import {Route,withRouter} from 'react-router-dom'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import UserStatistics from '../content/userStatistics/UserStatistics';
import Users from '../content/users/Users/Users';
import FolderManagement from '../content/folders/folderManagement/FolderManagement';
import Logo from '../../assets/smallLogo.png';
import { Button, Grid } from '@material-ui/core';
import Home from '../content/home/Home';


const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class BaseLayout extends React.Component {

  state = {
    open: false,
    casesCount: '',
    casesSolvedCount: 0
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  loginuser = () =>{
    let created_by = sessionStorage.getItem('USERNAME')
    console.log(created_by,"user name");
    
    this.setState({
      login_user:created_by
    })
  }

  componentDidMount() {
    this.verifyFromServer();
    this.loginuser();
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
  navigateToComponent =(path) => {
    const {history} = this.props;
    history.push(path);
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
        this.props.history.push('/');
      })
      .catch(error => console.log(error)
      )
  }



  render() {
    const { classes, theme} = this.props;
    const {open } = this.state;
    const {navigateToComponent} = this;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Grid item md = {10}>
            <Typography variant="h6" color="inherit" noWrap>
            <img src={Logo} />
          <Button  color="inherit" onClick = {() => {navigateToComponent('/dashboard/home')}}><strong>Ophtalma</strong></Button>
            </Typography>
            </Grid>
            <Grid item md={2}> <Typography variant="h6" color="inherit" noWrap>
              <Button style = {{fontFamily: 'cursive'}} color ="inherit">{this.state.login_user}</Button>
              <Button style = {{color: "black", background: "white", fontSize:15}} onClick = {this.logoutHandler}>Logout</Button>
              </Typography></Grid>
            
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
          <ListItem button  onClick = {() => {navigateToComponent("/dashboard/home")}}>
              <ListItemText primary='Home' />
            </ListItem>  
              <ListItem button  onClick = {() => {navigateToComponent("/dashboard/users")}}>
              <ListItemText primary='Users' />
            </ListItem>
            <ListItem button  onClick = {() => {navigateToComponent("/dashboard/user-statistics")}}>
            <ListItemText primary='User Statistics' />
          </ListItem>
          <ListItem button  onClick = {() => {navigateToComponent("/dashboard/folder-management")}}>
              <ListItemText primary='Folder Management' />
            </ListItem>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography >
          
            <Route exact path='/dashboard/home' component={Home} />
               <Route exact path="/dashboard/users" component={Users} />
               <Route exact path="/dashboard/user-statistics" component={UserStatistics} />
               <Route exact path="/dashboard/folder-management" component={FolderManagement} />
          </Typography>
        </main>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(BaseLayout));


