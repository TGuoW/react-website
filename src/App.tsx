import * as React from 'react';
import Header from './components/header'

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
