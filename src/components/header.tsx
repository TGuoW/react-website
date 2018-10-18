import * as React from 'react';
import '../css/header.less';

class Header extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default Header;