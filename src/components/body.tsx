import * as React from 'react'
import '../style/body.less'

class Header extends React.Component {
  public render() {
    return (
      <div className="App-body">
        <div className="img-cover">
          {/* <h1 className="App-title">Welcome to React</h1> */}
          <img className="avatarImg" src="http://img2.niutuku.com/desk/1208/1312/ntk-1312-2905.jpg" alt=""/>
          {/* <div className="avatarImg"/> */}
        </div>
      </div>
    );
  }
}

export default Header;