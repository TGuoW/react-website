import * as React from 'react'
import {Motion, spring } from 'react-motion'
// import '../style/body.less'

// import { Link } from 'react-router-dom';

interface Idetail {
  title: string,
  content: string
}

interface Itarget {
  clientX: number,
  clientY: number
}

interface Istate {
  tabDetail: Idetail[],
  itemStyle: any,
  itemHeight: number,
  isShowCopyDiv: boolean,
  target: Itarget
}

interface Iprops {
  tabDetailItem: any,
  marginLeft: number
}

class TabDetailItem extends React.Component {
  public state: Istate
  public timeID: any
  public props: Iprops

  constructor (props: Iprops) {
    super(props)
    this.props = props
    this.state = {
      isShowCopyDiv: false,
      itemHeight: 15,
      itemStyle: {},
      tabDetail: [],
      target: {
        clientX: 0,
        clientY: 0
      }
    }
  }

  public itemClick = (e: any) => {
    e.persist()
    this.setState({
      isShowCopyDiv: true,
      itemHeight: 100,
      itemStyle: {
        position: 'fixed',
        zIndex: 1200
      },
      target: {
        clientX: e.clientX,
        clientY: e.clientY
      }
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

  public getItemStyle = (x: number, interval: number) => {
    const target = this.state.target
    if (target.clientX) {
      const tmp = x / interval
      console.log(tmp)
      const top: number = target.clientY -  (target.clientY - 0) / tmp
      return {
        'top': top + 'px',
        'width': x + 15 + 'vw'
      }
    }
    return {}
  }

  public render() {
    return (
      <Motion defaultStyle={{height: 30}} style={{height: spring(this.state.itemHeight)}}>
        { (inStyle) => {
          return (
            <li>
              <div className="item"
                onClick={this.itemClick}
                style={{marginLeft: `${this.props.marginLeft}vw`, height: inStyle.height + 'vh', ...this.getItemStyle(inStyle.height - 15, 85), ...this.state.itemStyle}}>
                <div className="title">{ this.props.tabDetailItem.title }</div>
                <div className="content">{ this.props.tabDetailItem.content }</div>
              </div>
              { this.state.isShowCopyDiv ?
                  <div className="item">
                    <div className="title">{ this.props.tabDetailItem.title }</div>
                    <div className="content">{ this.props.tabDetailItem.content }</div>
                  </div> : ''
              }
            </li>
          )
        }
      }
      </Motion>
    );
  }
}

export default TabDetailItem;