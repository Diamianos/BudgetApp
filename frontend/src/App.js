import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FolderList from "./FolderList";
import FolderEdit from "./FolderEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={FolderList}/>
            <Route path='/folder/:id' component={FolderEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
