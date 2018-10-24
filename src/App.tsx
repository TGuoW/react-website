import * as React from 'react';
import My2048 from './components/2048'
import Body from './components/body'
import Header from './components/header'

import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Route path="/" exact={true} component={Body}/>
          <Route path="/Home" component={Body}/>
          <Route path="/2048" component={My2048}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
