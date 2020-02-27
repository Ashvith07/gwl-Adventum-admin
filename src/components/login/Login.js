import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { mdiAccountBox,mdiKeyVariant } from '@mdi/js';
import Icon from '@mdi/react';
import BigLogo from "../../assets/logo.png";
import "./Login.css";
import { Redirect } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import 'font-awesome/css/font-awesome.min.css';


import axios from 'axios';



class Login extends Component{

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
    
        axios.post(`http://localhost:8081/api/admin_login`, {
          "user_name": username,
          "password": password
        })
          .then(response => {
            console.log(response);
            if (response.data.status === 'successfull') {

                console.log(response.data);
              this.setHandler(response.data.all[0], true, response.data.auth_token)
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

      setHandler = (details, flag, auth) => {
        sessionStorage.setItem('UUID', details.uuid);
        sessionStorage.setItem('USERNAME', details.user_name);
        sessionStorage.setItem('token', auth);
        this.setState({ serverDetails: details,redirect:flag, token: auth })
      }


    render(){
        const { serverError, serverErrorFlag } = this.state
        
        if (this.state.redirect === true) {
            return  <Redirect to="/dashboard" />
        }

        const enabled =
        this.state.username.length>3 &&
        this.state.password.length > 3;
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-3" style={{marginBottom:'-80px',marginLeft:'65px', zIndex:'5'}}>
                <p ><img src={BigLogo} /></p>
                </div>
                <div className="col-md-5"></div> 
                </div>
                <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Card style={{display:'flex', justifyContent:'center', width:"80%", backgroundColor:'#5050DE'}}>
                        <CardContent>
                            <br />
                            <br />
                            <Typography>
                                <FormControl>
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-2">
                                        <Icon path={mdiAccountBox}
                                            title="User Profile"
                                            size={1.5}
                                            color="red"
                                        />
                                        </div>
                                        <div className="col-md-8">
                                        <Input
                                        style={{backgroundColor:'white'}}
                                        fullWidth
                                        placeholder="username"
                                        variant="filled"

                                        name="username"
                                        autoComplete="username"
                                        value={this.state.username}
                                        onChange={this.handleUserInput}
                                        required />
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-2">
                                        <Icon path={mdiKeyVariant}
                                            title="Key"
                                            size={1.5}
                                            color="red"
                                        /> 
                                        </div>
                                        
                                        <div className="col-md-8">
                                        <Input
                                        style={{backgroundColor:'white'}}
                                        value={this.state.password}
                                        type="password"
                                        placeholder="password"
                                        variant="filled"
                                        name="password"
                                        autoComplete="username"
                                        value={this.state.password}
                                        onChange={this.handleUserInput}  />
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                    <br />
                                    <Button 
                                        style={(enabled==false)?{backgroundColor:'white', color:'grey', fontSize:'15px', fontWeight:'bold'}:{backgroundColor:'#F7402E', color:'white', fontSize:'15px', fontWeight:'bold'}} 
                                        type="submit"
                                        onClick={this.onSubmit}
                                        variant="contained"
                                        disabled={!enabled}
                                        >
                                            Login
                                    </Button>

                                    {serverErrorFlag ? <p style={{ color: 'red', margin: '0', padding: '0' }}>{serverError}</p> : null}

                                </FormControl>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-md-4"></div>
                </div>
            </div>
        
            )
        }

}


export default Login;