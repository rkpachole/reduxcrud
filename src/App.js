import React,{Component} from 'react';
import { alertActions } from "./actions/alert.actions";
import history from './helpers/history';
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import UserList from "./components/UserList/Index";
import AddUser from "./components/AddUser/Index";

class App extends Component {
  constructor(props) {
      super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          console.log(location, action);
          dispatch(alertActions.clear());
      });
  }

  render() {
    //const login = localStorage.getItem("isLoggedIn");
    return (
        <div>
            <Router history={history}>
                <div>
          <Route path="/" exact component={UserList} />
          <Route path="/adduser" exact component={AddUser} />
      
          </div>
                </Router>
            </div>
        );
    }
}

export default connect()(App);
