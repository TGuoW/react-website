import * as React from 'react';
import Body from './components/body'
import Header from './components/header'

import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Header/>
        <Route path="/" component={Body}/>
        <Route path="/Home" component={Body}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
