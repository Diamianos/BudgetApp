import './App.css';
import logo from './logo.svg'
import {Component} from "react";

class App extends Component {
  state = {
    folders: []
  };

  async componentDidMount(){
    const response = await fetch('/folder');
    const body = await response.json();
    this.setState({folders: body});
  }

  render(){
    const {folders} = this.state;
    return(
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <div className="App-intro">
              <h2>Folders</h2>
              {folders.map(folder =>
              <div key={folder.id}>
                {folder.name} ({folder.amount} {folder.balance})
              </div>
                )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;
