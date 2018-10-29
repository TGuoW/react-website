import * as React from 'react'
import {Motion, spring } from 'react-motion'
// import '../style/body.less'

// import { Link } from 'react-router-dom';

interface Idetail {
  title: string,
  content: string
}

interface Istate {
  tabDetail: Idetail[],
  itemStyle: any,
  itemHeight: number
}

interface Iprops {
  tabDetailItem: any,
  marginLeft: number
}

class Body extends React.Component {
  public state: Istate
  public timeID: any
  public props: Iprops

  constructor (props: Iprops) {
    super(props)
    this.props = props
    this.state = {
      itemHeight: 30,
      itemStyle: {},
      tabDetail: []
    }
  }

  public itemClick = () => {
    this.setState({
      itemHeight: 40,
      itemStyle: {
        position: 'fixed',
        top: 0
      },
    })
  }

  public getStyles = (prevStyles: any) => {
    const endValue = prevStyles.map((item: any, i: number) => {
      return i === 0
        ? { marginLeft: spring(2, { stiffness: 300, damping: 20 }) }
        : { marginLeft: spring(prevStyles[i - 1].marginLeft, { stiffness: 300, damping: 20 }) }
    })
    return endValue;
  }

  public render() {
    return (
      <Motion defaultStyle={{height: 60}} style={{height: spring(this.state.itemHeight)}}>
        { (inStyle) => {
          return (
            <li
              onClick={this.itemClick}
              style={{marginLeft: `${this.props.marginLeft}vw`, height: inStyle.height + 'vw', ...this.state.itemStyle}}>
              <div className="title">{ this.props.tabDetailItem.title }</div>
              <div className="content">{ this.props.tabDetailItem.content }</div>
            </li>
          )
        }
      }
      </Motion>
    );
  }
}

export default Body;