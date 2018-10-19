import * as React from 'react'
import { spring, TransitionMotion } from 'react-motion';
import logo from '../logo.svg'
import '../style/header.less'

const items = ['博学', '慎思', '明辨', '笃行']

interface Istate {
  isShowMethod: boolean
}

class Header extends React.Component {
  public state: Istate

  constructor (props: any) {
    super(props)
    this.state = { isShowMethod: false }
  }

  public showMethod = () => {
    this.setState({
      isShowMethod: !this.state.isShowMethod
    })
  }

  public willEnter() {
    return { scale: 0}
  }

  public willLeave () {
    return { scale: spring(0)}
  }

  public render() {
    function Items (props: any) {
      const methodList = (
        <ul style={props.style}>
          {
            props.items.map((item: string, index: number) =>
              <li key={ index } className="pointer">{ item }</li>
            )
          }
        </ul>
      )
      return methodList
    }
    return (
      <header className="App-header">
        <div className="title">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="text">Welcome to React</h1>
        </div>
        <div className="method f-16 l-36">
          <i className="f-20 method-btn iconfont icon-menu" onClick={ this.showMethod }/>
          <TransitionMotion styles={this.state.isShowMethod ? [{
            key: 'items',
            style: { scale: spring(1) }
          }] : []}
            willEnter={this.willEnter}
            willLeave={this.willLeave}>
            {(inStyles) => (
              inStyles[0] ? (
                <Items items={items} key={inStyles[0].key} style={{
                  transform: `scale(${inStyles[0].style.scale},${inStyles[0].style.scale})`,
                  
                }}/>
              ) : (<Items items={items} style={ this.state.isShowMethod ? {display: 'block'} : {display: 'none'} }/>)
            )}
          </TransitionMotion>
        </div>

      </header>
    );
  }
}

export default Header;