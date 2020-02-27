
import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Grid, Typography,IconButton
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import Select from 'react-select';
import {Paper} from "@material-ui/core";
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import NoSsr from '@material-ui/core/NoSsr';
import PropTypes from 'prop-types';

import Snackbar from "@material-ui/core/Snackbar";

const DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 2,
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
      margin: 2,
      width:500,
      height:300,
      padding: theme.spacing.unit * 2,
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 2,
      padding: theme.spacing.unit *2,
    },
  }))(MuiDialogActions);

  
  const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 5,
    },
  });
  
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }

  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }

  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };


class FolderTransferDialog extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userDetails: {
                user_name: {},
                folderDetails: []
              },
              userNames :[],
              folders :[],
              login_user:'',
              open:false
        }
    };

    handleClose = () => {
      this.setState({ open: false },window.location.reload()  );
    };

    componentDidMount(){
        this.fetchUserNamesForTransfer();
        this.getLoginUser();
    }

    fetchUserNamesForTransfer =() => {
      const {userNamesState} = this;
        axios
      .get("http://localhost:8081/api/users-doctors")
      .then(response => {
        console.log(response.data.users,"response");

        userNamesState("userNames",response.data.users);
      })
      .catch(err => console.log(err));
    }

    userNamesState = (property, value) => {
        console.log(value);
      this.setState({ [property]: value })
    };

    getLoginUser = () =>{
      let updated_by = sessionStorage.getItem('USERNAME')
      console.log(updated_by,"user name");
      
      this.setState({
        login_user:updated_by
      })
    }


    handleFieldChange = (e, mode, property) => {
      this.setState({
        [mode]: {
          ...this.state[mode],
          [property]: e
        }
      });
    };

      onClickTransfer = (userDetails,login_user) => {
        const {userDetailsState} = this.props;
          axios.put(`http://localhost:8081/api/transfer-folder`, {userDetails: userDetails, updated_by:login_user})
          .then(response => {
            console.log(response.data,"response");

          this.props.toggleDialog2();
          

            axios
           .get("http://localhost:8081/api/users-folders")
          .then(response => {
            console.log(response.data,"response");
            userDetailsState(response.data.usersFolders);
            window.location.reload()
           
           })
             .catch(err => console.log(err));
               
          })
          .catch(err => console.log(err));
          this.setState({ open: true });
          
      };
    render() {

        console.log(this.props,"props");    
        let {userDetails,userNames, folders,login_user} = this.state;
        const {user_name, folderDetails} = userDetails;
         
        const {dialog2,userNameToTransfer,foldersToTransfer, classes,theme} =this.props;
        const {openDialog} = dialog2;
        const {handleFieldChange, onClickTransfer} = this;
        console.log(userDetails, userNames,folders,"user"); 
        console.log(this.state,"sssssssssssssssssssss");
               

         userNames=userNames.filter(user => user.user_name != userNameToTransfer);

         const selectStyles = {
          input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
              font: 'inherit',
            },
          }),
        };
        

        return (
          <div>
<Grid container>
      <Grid item md={12} classes={{ root: "displaying" }} style={{padding:'19px', margin: '40px'}}>
        <Dialog className = "dialogStyle"
        onClose={this.props.toggleDialog2}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
        >
    <DialogTitle id="customized-dialog-title" onClose={this.props.toggleDialog2}>Transfer Dialog</DialogTitle>
    <DialogContent>
        <h2> {userNameToTransfer}</h2>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={userNames.map((item)=>{
              return {
                ...item,
                label:item.user_name,
                value:item.uuid
              }
            })}
            components={components}
            value={user_name}
            onChange={e => {
              handleFieldChange(e, "userDetails", "user_name");
            }}
            textFieldProps={{
              label: 'Transfer to User Id',
              InputLabelProps: {
                shrink: true,
              },
            }}
            placeholder="Select User Id"
            isClearable
          />
          <div className={classes.divider} />
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Folder',
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={foldersToTransfer.map((item)=>{
              return {
                ...item,
                label:item,
                value:item
              }
            })}
            components={components}
            value={folderDetails}
            onChange={e => {
              handleFieldChange(e, "userDetails", "folderDetails");
            }}
            placeholder="Select folders"
            isMulti
          />
        </NoSsr>
         </DialogContent> 

 <DialogActions>
          <Button classes={{root:"buttonStyle"}}
            color="primary"
            variant="contained"
            onClick={() =>
              {onClickTransfer(userDetails,login_user)}
            }
          >
            Transfer
          </Button>
          </DialogActions> 
         
        </Dialog>
     </Grid>
     </Grid>

<Snackbar 
anchorOrigin={{
  vertical: "top",
  horizontal: "center"
}}
open={this.state.open}
autoHideDuration={6000}
onClose={this.handleClose}
ContentProps={{
  "aria-describedby": "message-id"
}}
message={<span id="message-id">Success</span>}
action={[
  <Button
    key="undo"
    color="secondary"
    size="small"
    onClick={this.handleClose}
  />,
  <IconButton
    key="close"
    aria-label="Close"
    color="inherit"
    onClick={this.handleClose}
  >
    <CloseIcon />
  </IconButton>
]}
/>

     </div>
        );
    }
};
FolderTransferDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(FolderTransferDialog);