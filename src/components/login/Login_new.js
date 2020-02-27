import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import BigLogo from "../../assets/logo.png";
import axios from 'axios';
import {withRouter} from 'react-router-dom'



const styles = {

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#ffffff',
    boxShadow: '0px 0px 17px -11px rgba(0,0,0,0.75)',
    marginTop:'40%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding:'20px'
  },

  divlogo: {
    textAlign: 'center'
},
logo: {
    height: '50%',
    width: '50%'
},
submit:{
    margin:' 19px 0px',
    padding:' 9px 0px'
}

};


class Login extends Component {
  
  constructor(props){
    super(props);
    this.state={
        username:'',
        password:'',
        redirect:false,
        serverErrorFlag:false
        }
    }

    componentDidMount() {
        this.verifyFromServer()
    }

    // verify wheather user already login
    
    verifyFromServer = () => {
        axios.post(`http://localhost:8081/api/verify`, {
            "auth_token": sessionStorage.getItem('token')
        })
            .then(response => {
                console.log(response.data.isloggedIn);
                if (response.data.isloggedIn == true) {
                    return this.setState({ redirect:true })
                } else {
                    console.log("Not logged in");
                }
            })
            .catch(error => console.log(error)
            )
    }

    //Capture the data from input forms

    handleUserInput = event => {
        this.setState({ [event.target.name]: event.target.value });
      };


    // On click of Sign in

      onSubmit = () => {
        const { username, password } = this.state
    console.log(this.props.history,"history");
    
        axios.post(`http://localhost:8081/api/admin_login`, {
          "user_name": username,
          "password": password
        })
          .then(response => {
            console.log(response);
            if (response.data.status === 'successfull') {

                console.log(response.data);
              this.setHandler(response.data.all[0], response.data.auth_token)
              this.props.history.push('/dashboard/home')
            }
            else {    
                console.log(response.data.status);  
                this.setState({ serverError: response.data.login_message, serverErrorFlag: true })    
            }
          })
          .catch(error => console.log(error)
          )
      }


    //   Calls this func from onSubmit func for sessionStorage

      setHandler = (details, auth) => {
        sessionStorage.setItem('UUID', details.uuid);
        sessionStorage.setItem('USERNAME', details.user_name);
        sessionStorage.setItem('token', auth);
        this.setState({ serverDetails: details, token: auth })
      }

      render(){
        const { classes } = this.props;
        const { serverError, serverErrorFlag } = this.state
        

        const enabled =
        this.state.username.length>3 &&
        this.state.password.length > 3;
      

  return (
    <Container component="main" maxWidth="xs">
   
      <div className={classes.paper}>
         <div className={classes.divlogo}>
             <img className={classes.logo} src={BigLogo} />
         </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            name="username"
            label="User Id"
            value={this.state.username}
            onChange={this.handleUserInput}
            autoFocus
            fullWidth
            required
          />

          <TextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleUserInput}
            required
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onSubmit}
            disabled={!enabled}
          >
            Sign In
          </Button>

          {serverErrorFlag ? <p style={{ color: 'red', margin: '0', padding: '0' }}>{serverError}</p> : null}

        </div>
      </div>

    </Container>
  );
  }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(withRouter(Login));
