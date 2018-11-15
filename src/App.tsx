import * as React from 'react';
import My2048 from './components/2048'
import Article from './components/article'
import Body from './components/body'
import Header from './components/header'
// import Test from './components/test'

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
          <Route path="/Article" component={Article}/>
          {/* <Route path="/Test" component={Test}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
