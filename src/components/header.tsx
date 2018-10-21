import * as React from 'react'
import { Motion, spring } from 'react-motion'
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
          <Motion style={{x: spring(this.state.isShowMethod ? 1 : 0)}}>
            {inStyle => {
              return (
                <Items items={items} style={{display: 'block', transform: `scale(${inStyle.x})`, 'transform-origin': 'right top'}}/>
              )}
            }
          </Motion>
        </div>

      </header>
    );
  }
}

export default Header;