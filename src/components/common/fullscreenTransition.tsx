import * as React from 'react'
import {Motion, spring } from 'react-motion'
// import '../style/body.less'

import {withRouter} from "react-router-dom";

interface Itarget {
  clientX: number
  clientY: number
}

interface Istate {
  itemStyle: any
  itemHeight: number
  isShowCopyDiv: boolean
  target: Itarget
}

interface Iprops {
  history: any
  children: any
  targetID: number | string
  to: string,
  styles: object
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
      target: {
        clientX: 0,
        clientY: 0
      }
    }
  }

  public itemClick = (e: any) => {
    e.persist()
    const targetID= this.props.targetID
    let target = e.target
    while (target.id !== targetID) {
      target = target.parentNode
      if (target === null) {
        return
      }
    }
    const pos = target.getBoundingClientRect()
    this.setState({
      isShowCopyDiv: true,
      itemHeight: 100,
      itemStyle: {
        position: 'fixed',
        zIndex: 1200
      },
      target: {
        clientX: pos.left,
        clientY: pos.top
      }
    })
  }

  public getItemStyle = (x: number, interval: number) => {
    const target = this.state.target
    const tmp = x / interval
    let height: number = 100
    let top: number = 0
    let left: number = 0
    let width: number = 100
    let selfObj = {}
    if (tmp <= 0.5) {
      height = height - interval * (1 - tmp * 2)
      top = target.clientY -  (target.clientY - 0) * (tmp * 2)
      selfObj =  {
        'height': height + 'vh',
        'top': top + 'px'
      }
    } else {
      left = target.clientX -  (target.clientX - 0) * ((tmp - 0.5) * 2)
      width = width - (width - 20.5) * (1 - (tmp - 0.5) * 2)
      if (x === interval) {
        setTimeout(() => {
          this.props.history.push(this.props.to)
        })
      }
      selfObj =  {
        'height': height + 'vh',
        'left': left + 'px',
        'marginLeft': 0,
        'top': top + 'px',
        'width': width + 'vw'
      }
    }
    const arr = Object.keys(this.props.styles)
    const attrObj = {}
    arr.forEach((item) => {
      const from = this.colorToNumber(this.props.styles[item].from)
      const to = this.colorToNumber(this.props.styles[item].to)
      const newColor = 'rga(' + from.map((i: number, index: number) => {
        const colorTmp = i - (i - to[index]) * tmp
        return colorTmp < 0 ? 256 + colorTmp : colorTmp
      }).join(', ') + ')'
      attrObj[item] = newColor
    })
    return Object.assign(selfObj, attrObj)
  }

  public colorToNumber =  (color: string) => {
    const numberArr = color.split('(')[1].split(')')[0].split(',')
    return numberArr.map((item: string) => Number(item))
  }

  public render() {
    const { children } = this.props
    return (
      <div>
        <Motion style={{height: spring(this.state.itemHeight, { stiffness: 65, damping: 15})}}>
          { inStyle =>
            <div
              onClick={this.itemClick}
              onTouchEnd={this.itemClick}
              className={this.state.isShowCopyDiv ? children.props.className : ''}
              style={this.state.isShowCopyDiv ? {...children.props.style, ...this.getItemStyle(inStyle.height - 15, 85), ...this.state.itemStyle } : {}}>
              {!this.state.isShowCopyDiv ? children : null}
            </div>
          }
        </Motion>
        { this.state.isShowCopyDiv ?
          <div>{children}</div>
          : ''
        }
      </div>
    );
  }
}

export default withRouter(TabDetailItem);