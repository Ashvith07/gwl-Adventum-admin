import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './UserStatistics.css';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import {
  Grid
} from "@material-ui/core";
import axios from 'axios';

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
  },
});

class UserStatistics extends React.Component {


  state = {
    time: '',
    rows: [],
    page: 0,
    rowsPerPage: 5,
    data:[],
    dialog: {
      openDialog: false
    } ,
    backendResponse: false
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  componentDidMount() {
    this.userDetails();
  }

  userDetails = () => {
    const {userDetailsState} =this
    axios
      .get("http://localhost:8081/api/user_stats")
      .then(response => {
        console.log(response.data,"response");
        
        userDetailsState(response.data.res);
    
      })
      .catch(err => console.log(err));
  }

  userDetailsState = (data) => {
    debugger
    console.log(data,"data");
    debugger
  this.setState({ data: data, backendResponse: true })
};


  render(){
   console.log(this.state.data,"data");
   console.log(this.state,"state");
   
    const { classes } = this.props;
    const {data,backendResponse} = this.state;
    const {rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  return (
    <Grid container>
    {backendResponse ?
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>

        <TableHead>
          <TableRow className = 'tableData'>
            <TableCell align="left"><strong>User Id</strong></TableCell>
            <TableCell align="left"><strong>Name</strong></TableCell>
            <TableCell align="left"><strong>No of Folders</strong></TableCell>
            <TableCell align="left"><strong>No of Images Labelled</strong></TableCell>
            <TableCell align="left"><strong>No of Pending Images</strong></TableCell>
            <TableCell align="left"><strong>Sessions</strong></TableCell>
            <TableCell align="left"><strong>No of Hours</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(d => (
            <TableRow key={d.user_name}>
              <TableCell component="th" scope="row">
                {d.user_name}
              </TableCell>
              <TableCell align="left">{d.name}</TableCell>
          <TableCell align="left">{d.folders}</TableCell>
              <TableCell align="left">{d.labelled_image}</TableCell>
          <TableCell align="left">{d.pending_images}</TableCell>
          <TableCell align="left">{d.no_of_sessions}</TableCell>
              <TableCell align="left">{d.time}</TableCell>
            </TableRow>
          ))}
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
    </Paper> :  <Loader
            type="Rings"
            color="#3F51B5"
            height={200}
            width={200}
            timeout={5000} style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
   
  /> }
    </Grid>

  );
}
}

UserStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserStatistics);