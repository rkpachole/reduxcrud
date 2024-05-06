import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions/user.actions";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import "../../App.css";
import { FiCamera } from "react-icons/fi";
import ReactFileReader from "react-file-reader";
import { Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'
import Card from '@material-ui/core/Card';
import styled from "styled-components";
import CardContent from '@material-ui/core/CardContent';
import history from '../../helpers/history';
export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 86px;
    height: 86px;
    object-fit: cover;
    border-radius: 40%;
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
      this.state =  { 
        name:"",
        photo: "https://i.imgur.com/ndu6pfe.png",
        search: "",
        activePage: 1,
        limit: 50,
        usersList:[],
        open :false,
          firstName:"",
          lastName:"",
          subject:"",
          address:"",
          rollNo:"",
          gender:"",
           id:null
  
    };
    }
    handleFiles = (files) => {
        this.setState({
            photo:files.base64,
         
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
      addUserSubmit =() =>{
           if (this.state.firstName && this.state.lastName && this.state.rollNo){
        this.props.dispatch(userActions.addUser({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            subject:this.state.subject,
            address:this.state.address,
            rollNo:this.state.rollNo,
            gender:this.state.gender,
            photo:this.state.photo,
           
        }))
      }
     
    else 
    alert('You must enter a all field');
    
}


UNSAFE_componentWillReceiveProps(nextProps) {
  console.log("nextProps",nextProps);
    if (nextProps.refreshList) {
        history.push("/");
    }
}

render (){
return (
    <>
      <form className="container">
        <Card className="card">
          <CardContent>
            <div>
              <TextField fullWidth id="outlined-basic" label="Roll No" variant="outlined" 
               onChange={(e) => this.handleRollNO(e.target.value)}/>
              <TextField fullWidth id="outlined-basic" label="First Name" variant="outlined"
              
               onChange={(e) => this.handlefirstName(e.target.value)} />
              <TextField fullWidth id="outlined-basic" label="Last Name" variant="outlined"
               onChange={(e) => this.handleLastName(e.target.value)} />
              <TextField fullWidth id="outlined-basic" label="Address" variant="outlined" 
               onChange={(e)=>this.handleAddress(e.target.value )} />
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
                onChange={(e) => this.handleSubject(e.target.value)} />
              <AvatarInput>
                <img src={this.state.photo} alt="Avatar Placeholder" />
              </AvatarInput>

              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                handleFiles={this.handleFiles}
              >
                <FiCamera style={{ width: 38, height: 20 }} as={Button} />
              </ReactFileReader>
   
              <Button style={{ width: "100%" }} className="button" color="primary" onClick={this.addUserSubmit}  >
                submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      
  
  
    </>
)
}
}
function mapStateToProps(state) {
        const { refreshList } = state.rootReducer.users;
        const { error } = state.rootReducer.users;
        
          return {
            refreshList,
            error,
           
        };
    }
    
    export default connect(mapStateToProps)(Index);