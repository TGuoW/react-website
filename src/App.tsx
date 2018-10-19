import * as React from 'react';
import Body from './components/body'
import Header from './components/header'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header/>
        <Body/>
      </div>
    );
  }
}

export default App;
