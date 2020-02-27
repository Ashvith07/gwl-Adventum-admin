import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Grid, Typography,IconButton
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";


const DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500],
    },
  }))(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      margin: 0,
      width:400,
      padding: theme.spacing.unit * 2,
      textAlign:'center'
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 2,
      padding: theme.spacing.unit,
    },
  }))(MuiDialogActions);


class AddUser extends Component {
    constructor(props){
        super(props);
        this.state={
            userDetails: {
                user_name: "",
                name : "",
                phone: "",
                email: "",
                gender: "",
                password: "",
                user_type: "doctor"
              },
            userTypes: ['doctor','admin']
        }
    }
    onSubmit = (userDetails) => {
        const {userDetailsNewState} = this
        let created_by = sessionStorage.getItem('USERNAME')
        console.log(created_by,'user name');
        
        axios
          .post(`http://localhost:8081/api/users`, {
            user_name: userDetails.user_name,
            password: userDetails.password,
            user_type:userDetails.user_type,
            email: userDetails.email,
            name: userDetails.name,
            phone: userDetails.phone,
            gender: userDetails.gender,
            created_by: created_by
          })
          .then(response => {
    
            userDetailsNewState(response.data.userDetails);
            
            console.log(response.data.userDetails,"userDetails");
    
            this.setState({
              gender:"male",
              user_name:'',
              password:'',
              name:'',
              phone:'',
              email:'',
              user_type:'doctor'
            })
            this.props.toggleDialog();
            window.location.reload();
            
          })
          .catch(err => console.log(err));
      }

    userDetailsNewState = data => {
        console.log(data);
        this.setState({ data: data })
    };


    handleFieldChange = (e, mode = "userDetails", property) => {
      console.log(e.target.value);
      this.setState({
        [mode]: {
          ...this.state[mode],
          [property]: e.target.value
        }
      });
    };


    render() {
      console.log(this.props,"props");    
        const {userDetails} = this.state;
        const { user_name,name,email,phone,gender,user_type,password } = userDetails; 
        const {dialog} =this.props;
        const {openDialog} = dialog;
        const {handleFieldChange} = this;
        console.log(userDetails,"details");
        
        const enabled =
        user_name.length>0 && password.length > 0 && name.length>0 && 
        phone.length > 0 && email.length>0 && gender.length > 0;
        
        return (
            <Grid container>
      <Grid item md={12} classes={{ root: "displaying" }}>
        <Dialog className = "dialogStyle"
        onClose={this.props.toggleDialog}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.props.toggleDialog}>Create User</DialogTitle>
          <DialogContent>
          
            <Typography>
          <TextField fullWidth
            id="outlined-name"
            label="User Id"
            value={user_name}
            onChange={e =>
              handleFieldChange(e,"userDetails","user_name")
            }
            margin="normal"
            variant="outlined"
          />
           </Typography>

           <Typography>
          <TextField fullWidth
            id="outlined-name"
            label=" Full Name"
            value={name}
            onChange={e =>
              handleFieldChange(e,"userDetails","name")
            }
            margin="normal"
            variant="outlined"
          /> </Typography>
          <Typography style={{textAlign: 'center'}}>
            <RadioGroup 
            aria-label="Gender"
            name="gender"
            value={gender}
            onChange={e =>
              handleFieldChange(e,"userDetails","gender")}
          >
            <FormControlLabel value="Female" control={<Radio />} label="Female"/>
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
            </Typography>

            <Typography>
          <TextField
          fullWidth
            id="outlined-name"
            label="Phone"
            value={phone}
            onChange={e =>
              handleFieldChange(e,"userDetails","phone")
            }
            margin="normal"
            variant="outlined"
          /> </Typography>
           <Typography>
          <TextField
          fullWidth
            id="outlined-name"
            label="Email"
            value={email}
            onChange={e =>
              handleFieldChange(e,"userDetails","email")
            }
            margin="normal"
            variant="outlined"
          /> </Typography>

<Typography>
          <TextField 
          fullWidth
            id="outlined-name"
            label="Password"
            type="Password"
            value={password}
            onChange={e =>
              handleFieldChange(e,"userDetails","password")
            }
            margin="normal"
            variant="outlined"
          />
 </Typography>
 <Typography>

 <TextField fullWidth
          id="outlined-select-currency-native"
          select
          label="User Type"
          value={user_type}
          onChange={e => {
            handleFieldChange(e,"userDetails","user_type");
          }}
          SelectProps={{
            native: true,
          }}
          helperText="Select the user type"
          margin="normal"
          variant="outlined"
        >
          {this.state.userTypes.map((user,index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </TextField>
          </Typography>
          
          </DialogContent>
<DialogActions>
          <Button classes={{root:"buttonStyle"}}
            color="primary"
            variant="contained"
            disabled={!enabled}
            onClick={() =>
              {this.onSubmit(userDetails)}
            }
          >
            Submit
          </Button>
          </DialogActions>
         
        </Dialog>
     </Grid>
     </Grid>
        );
    }
}

export default AddUser;
