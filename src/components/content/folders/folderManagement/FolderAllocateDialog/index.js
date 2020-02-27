
import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Select from 'react-select';
import {Grid, Typography,IconButton, Paper
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
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
      width: 500,
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

class FolderAllocateDialog extends React.Component{

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
      this.fetchUserNames();
      this.fetchFolders();
      this.getLoginUser();
      
    }

    fetchUserNames =() => {
        const {userDetailsState} = this;
        debugger
        axios
      .get("http://localhost:8081/api/users-doctors")
      .then(response => {
        console.log(response.data,"response");
        debugger
        userDetailsState("userNames",response.data.users);
   console.log(this.state.userNames,"userNames");
   
        debugger
      })
      .catch(err => console.log(err));
    };

    fetchFolders =() => {
        const {userDetailsState} = this;
        const foldersNotAssigned =[];
        let tempArr =[]
        debugger
        axios
      .get("http://localhost:8081/api/folder-ids")
      .then(response => {
        console.log(response.data.folders,"responsefolders");

      response.data.folders.forEach( f=> {
        tempArr.push(f.folder_id);
      })
      console.log(tempArr, "tempArr");
       axios
       .get("http://localhost:8081/api/s3bucket")
       .then(response => {
         console.log(response.data.Array,"responseFrom s3");       
         response.data.Array.filter(a => {
           console.log(a, "a");
           
             if(!(tempArr.includes(a))){
                 foldersNotAssigned.push(a);        
          } })
          console.log(foldersNotAssigned,"foldersnotassigned");
          
         userDetailsState("folders",foldersNotAssigned);
         debugger
       })
       .catch(err => console.log(err));      
      })
      .catch(err => console.log(err));
    }

    userDetailsState = (property, value) => {
        debugger
        console.log(value,"value");
        debugger
      this.setState({ [property]: value })
    };

    getLoginUser = () =>{
      let created_by = sessionStorage.getItem('USERNAME')
      console.log(created_by,"user name");
      
      this.setState({
        login_user:created_by
      })
    }

    handleFieldChange = (e, mode, property) => {
        debugger
        this.setState({
          [mode]: {
            ...this.state[mode],
            [property]: e
          }
        });debugger
      };

      onClickAllocate = () => {
        const {handleClick} =this;
       const {userDetails ={},login_user =''} = this.state;
       debugger
       let foldersWithSlash = [];
       let tempArr =[];


       console.log(userDetails,"uuuupiiiiiiii");
        userDetails.folderDetails.forEach( folder => {
          foldersWithSlash.push(folder.value+'/');
        })
        console.log(foldersWithSlash,"foldersWithSlash");
        let arr =[];
        let arrWithJSON =[];

        axios
      .post(`http://localhost:8081/api/s3bucketARRAY`,{folder_ids: foldersWithSlash})
      .then(response => {
        console.log(response.data,"response2");
               let resp=response.data||{}
               let obj=resp.response||{}
         debugger
               arr=Object.keys(obj).map(id=>{
                return{id:id.replace('/',''),keys:obj[id].Contents.map(x=>x.Key)}})
                console.log(arr,"array");

              debugger
             console.log(userDetails,"userDetailsLatest");
               arr.map(a => {
                     a.keys.map( k => {
                         if(k.includes('.json')){
                          arrWithJSON.push(a);
                         }
                     })
               })
               console.log(arrWithJSON,"arrWithJSON");
               
            if(arrWithJSON.length>0){
             axios.post(`http://localhost:8081/api/allocate-folder/new`, {userDetails: userDetails, folderInfo :arrWithJSON,
             created_by:login_user})
             .then(response => {
               console.log(response.data,"response1");
               window.location.reload();
              
             }).catch(err => console.log(err));

               }
             
          }).catch(err => console.log(err));    
        
          this.setState({ open: true });
          
      };

    render() {
      
        console.log(this.props,"props");    
        const {userDetails={},userNames=[], folders=[]} = this.state;
        const {user_name, folderDetails} = userDetails;
         
        const {dialog1, classes,theme} =this.props;
        const {openDialog} = dialog1;
        const {handleFieldChange, onClickAllocate} = this;
        console.log(userDetails, userNames,folders,"user"); 

      
        
        const selectStyles = {
          input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
              font: 'inherit',
            },
          }),
        };

        // const enabled = user_name.length>0// && folderDetails.length() > 0;

        return (
          <div>
<Grid container>
      <Grid item md={12} classes={{ root: "displaying" }} style={{padding:'19px', margin: '40px'}}>
        <Dialog className = "dialogStyle"
        onClose={this.props.toggleDialog1}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
        >
    <DialogTitle id="customized-dialog-title" onClose={this.props.toggleDialog1}>Allocate Folder</DialogTitle>
    <DialogContent>

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
              label: 'User Id',
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
            options={folders.map((item)=>{
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
              {this.onClickAllocate()}
            }
          >
            Allocate
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
FolderAllocateDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FolderAllocateDialog);