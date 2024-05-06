import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions/user.actions";
import { Button } from "@material-ui/core";
import "../../App.css";
import styled from "styled-components";
import '../../styles.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import history from '../../helpers/history';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from "material-ui-search-bar";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import "../../App.css";
import { FiCamera } from "react-icons/fi";
import ReactFileReader from "react-file-reader";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 86px;
    height: 86px;
    object-fit: cover;
    border-radius: 50%;
  }
  .circle {
    width: 86px;
    height: 86px;
    border-radius: 50%;
  }
  label {
    right: 23em !important;
    position: absolute;
    width: 48px;
    height: 48px;
    background: #312e38;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #f4ede8;
    }
    &:hover {
      background: blue;
    }
  }
`;



class Index extends Component {
  constructor() {
    super();
    this.state =
    {
     
      photo: "https://i.imgur.com/ndu6pfe.png",
      firstName:"",
      lastName:"",
      subject:"",
      address:"",
      rollNo:"",
      gender:"",
      search: "",
      activePage: 1,
      limit: 50,
      usersList:[],
      open :false,
      id: null,
      editModal:false,
    };
    this.getUsersList = this.getUsersList.bind(this);
    this.handleEditClose =this.handleEditClose.bind(this);
    this.getSingleUser = this.getSingleUser.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }
getSerachByList (){
  console.log(this.state.search);
  this.props.dispatch(userActions.searchUserName(this.state.search));
}
  getUsersList() {
    this.props.dispatch(userActions.getUsersList());
}
deleteUsersList = () => {
  this.props.dispatch(userActions.delete(this.state.id));
  this.handleClose();
  this.getUsersList();
}
handleUpdate =()=> {
  this.props.dispatch(userActions.updateUser({
    id:this.state.id,
    firstName:this.state.firstName,
    lastName:this.state.lastName,
    subject:this.state.subject,
    address:this.state.address,
    rollNo:this.state.rollNo,
    gender:this.state.gender,
    photo:this.state.photo,
  }),()=>{
    
  this.getUsersList();
  });
 
}

  handleFiles = (files) => {
    this.setState({
      photo: files.base64,
    })

  };

  handleChange (e){
    this.setState({
      gender:e
    })
  }
  handleRollNO (e){
    this.setState({
      rollNo:e
    })

  }
  handlefirstName(e){
    this.setState({
      firstName:e
    })

  }
  handleLastName (e){
    this.setState({
      lastName:e
    })

  }
  handleAddress (e){
    this.setState({
      address:e
    })

  }
  handleSubject (e){
    this.setState({
      subject:e
    })

  }
  handleSearch =(e) => {
    this.setState({
        search: e
    },()=>{
      this.getSerachByList();
    });
}
  componentDidMount(){
    this.getUsersList();
    // this.getSerachByList();
}

setUserList (data){
 this.setState({
  usersList:data,
 })
}

setSearchList (serachList){
  this.setState({
   usersList:serachList,
  })
 }
openDeleteModal = (id) => {
  this.setState( {open: true, id} );
}
handleClose = () => {
  this.setState( {open: false } );
}
getSingleUser(id) {
  this.setState({
    id:id,
      editModal: true,
      editOpenCount: 0
  }, () => {
      this.props.dispatch(userActions.getById(id));
  });

}
handleEditClose (){
  this.setState({
    editModal:false
  })
}

UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log("nextProps",nextProps);
    if(nextProps.usersList) {
      this.setUserList(nextProps.usersList);
    }
    if (nextProps.editModal === true && this.state.editOpenCount === 0) {
      this.setEditUser(nextProps.user);

  }
  if(nextProps.successMsg){
    this.setState({
    editModal:false

    },()=>{
      this.getUsersList();
    })

  }
  if(nextProps.deleteModal=== false){
    this.getUsersList();
  }
  if(nextProps.SearchList) {
    this.setSearchList(nextProps.SearchList);
  }
}
setEditUser (data){
  this.setState({
    id:data.id,
   firstName:data.firstName,
   lastName:data.lastName,
   subject:data.subject,
   photo:data.photo,
   address:data.address,
   gender:data.gender,
   rollNo:data.rollNo,
  })
}
render() {
    return (
      <>

<SearchBar
    value={this.state.value}
    type="text"
    onChange={(e) =>this.handleSearch(e)}
    style={{
      margin: '0 auto',
      maxWidth: 800
    }}
    // onRequestSearch={() => doSomethingWith(this.state.value)}
  />
       <Table className="data-table" aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell align="left">Roll No</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
        <TableBody>
          {this.state.usersList && this.state.usersList.map((row,id) => 
            <TableRow key={row.id}>
                <TableCell align="left" component="th" scope="row">
                {row.rollNo}
              </TableCell>
              <TableCell align="center">{row.firstName ? row.firstName :"" }</TableCell>
              <TableCell align="center">{row.lastName ? row.lastName :""}</TableCell>
              <TableCell align="center">{row.gender ? row.gender :""}</TableCell>
              <TableCell align="center">{row.subject ? row.subject:""}</TableCell>
              <TableCell align="center">{row.address ? row.address :""}</TableCell>
             
              
              <TableCell align="center">
              <IconButton aria-label="edit" onClick={() =>this.getSingleUser(row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => { this.openDeleteModal(row.id) }}>
            <DeleteIcon />
          </IconButton>
          </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog  aria-labelledby="simple-dialog-title" open={this.state.editModal}  onClose={this.handleEditClose} >
          <DialogTitle id="simple-dialog-title">User Edit</DialogTitle>
          <DialogContent>
          
              <TextField fullWidth id="outlined-basic" label="Roll No"
              type="text" variant="outlined" 
              value ={this.state.rollNo}
               onChange={(e) => this.handleRollNO(e.target.value)}/>
              <TextField fullWidth id="outlined-basic" label="First Name" variant="outlined"
              value ={this.state.firstName}
               onChange={(e) => this.handlefirstName(e.target.value)} />
              <TextField fullWidth id="outlined-basic" label="Last Name" variant="outlined"
               onChange={(e) => this.handleLastName(e.target.value)}
               value ={this.state.lastName} />
              <TextField fullWidth id="outlined-basic" label="Address" variant="outlined" 
               onChange={(e)=>this.handleAddress(e.target.value )} 
               value ={this.state.address}/>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.gender}
                  label="Gender"
                  onChange={(e) => this.handleChange(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                 
                </Select>
              </FormControl>
              <TextField fullWidth id="outlined-basic" label="Subject" variant="outlined"
                onChange={(e) => this.handleSubject(e.target.value)}
                value ={this.state.subject} />
              <AvatarInput>
                <img src={this.state.photo} alt="Avatar Placeholder" />
              </AvatarInput>

              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                handleFiles={this.handleFiles}
              >
                <FiCamera style={{ width: 30, height: 20 }} as={Button} />
              </ReactFileReader>
        
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
            <Button onClick={this.handleEditClose} color="secondary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      <Dialog  aria-labelledby="simple-dialog-title" open={this.state.open}  onClose={this.handleClose} >
          <DialogTitle id="simple-dialog-title">User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteUsersList} color="secondary">
              Delete
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div className="fab-bottom-right-container">
          <Fab color="primary" aria-label="add" onClick={() => history.push('/adduser')}  >
            <AddIcon />
          </Fab>
        </div>
     
      </>
    );
  }

}


function mapStateToProps(state) {
    const { usersList ,editModal,user,successMsg,deleteModal,SearchList} = state.rootReducer.users;
    const { error } = state.rootReducer.users;
 console.log("usersList",usersList);
    return {
        usersList,
        error,
        editModal,
        user,
        successMsg,
        deleteModal,
        SearchList
       
    };
}

export default connect(mapStateToProps)(Index);
