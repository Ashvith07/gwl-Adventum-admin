import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import {
  Grid,
  Button,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from "@material-ui/core";
import "react-table/react-table.css";

import axios from 'axios';
import FolderAllocateDialog from './FolderAllocateDialog';
import FolderTransferDialog from './FolderTransferDialog';


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions  extends React.Component {

  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };
 
  render() {
    console.log(this.state);
    const { classes, count, page, rowsPerPage, theme } = this.props;  
    return (

        <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>      
    );
  }
}

TablePaginationActions .propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  }
});


class FolderManagement extends React.Component{
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    data:[],
    dialog1: {
      openDialog: false
    },dialog2: {
      openDialog: false
    },
     backendResponse: false,
    userNameToTransfer :'',
    foldersToTransfer: []
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  componentDidMount() {
    const {userDetailsState} =this;
    axios
      .get("http://localhost:8081/api/users_folders")
      .then(response => {
        console.log(response.data,"response");
        
        userDetailsState(response.data.usersFolders);
      })
      .catch(err => console.log(err));
    
  }

  userDetailsState = data => {
      console.log(data);
    this.setState({ data: data, backendResponse: true })
  };

  toggleDialog1 = () => {
    const {openDialog} = this.state.dialog1;
    this.setState({
      dialog1:{
        openDialog: !openDialog    
      }
    }) 
   }

  toggleDialog2 = () => {
    const {openDialog} = this.state.dialog2;
    this.setState({
      dialog2:{
        openDialog: !openDialog     
      }
     
    })
       }

       fun =(user_name, folders) =>{
         this.setState({
           userNameToTransfer: user_name,
           foldersToTransfer: folders
         })
         this.toggleDialog2()
       }

render() {
  const { classes } = this.props;
  const {data,dialog1,dialog2, userNameToTransfer,foldersToTransfer} = this.state;
  const {rowsPerPage, page, backendResponse } = this.state;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const {toggleDialog1, fun} = this;
  

  return (
<Grid container>
  <Grid item md ={12}>
        <Button style={{background:"#3f51b5",color:'#fff',margin:'1% 7% 0px 0px',float:'right'}} 
                onClick={() => {toggleDialog1()}} dialog1={dialog1}>Allocate Folder</Button></Grid>
     {backendResponse ? 
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>

        <TableHead>
          <TableRow>
            <TableCell align="left"><strong>User Id</strong></TableCell>
            <TableCell align="left"><strong>Full Name</strong></TableCell>
            <TableCell align="left" ><strong>Folders Allocated</strong></TableCell>
            <TableCell align="left"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(d => (
              <TableRow key={d.user_name} className = {classes.tableRow}>
                <TableCell component="th" scope="row">
                  {d.user_name}
                </TableCell>
                <TableCell align="left" >{d.name}</TableCell>
                <TableCell align="left"  style = {{ height: '80px', overflowY: 'scroll' ,display: 'block' }}>{d.folders.map( folder => <ul><li>{folder}</li></ul>)}</TableCell>
                <TableCell align="left"><Button color="primary" variant="outlined" onClick ={() => 
                  {fun(d.user_name,d.folders)}}>Transfer</Button></TableCell>
              </TableRow>            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>  :  <Loader
            type="Rings"
            color="#3F51B5"
            height={200}
            width={200}
            timeout={5000} style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
   
  /> }
      <FolderAllocateDialog dialog1 ={dialog1} toggleDialog1 = {this.toggleDialog1} data = {data}/> 
<FolderTransferDialog dialog2={dialog2} data={data}  userNameToTransfer = {userNameToTransfer} foldersToTransfer = {foldersToTransfer} 
toggleDialog2 = {this.toggleDialog2} userDetailsState = {this.userDetailsState}/>
    </Grid>
  );
}
}
FolderManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderManagement);


