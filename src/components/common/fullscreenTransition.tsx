import * as React from 'react'
// import {Motion, spring } from 'react-motion'
// import '../style/body.less'

import {withRouter} from "react-router-dom";

interface Itarget {
  clientX: number,
  clientY: number,
}

interface Istate {
  itemStyle: any,
  itemHeight: number,
  isShowCopyDiv: boolean,
  target: Itarget
}

interface Iprops {
  history: any
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
    const target = e.target.getBoundingClientRect()
    this.setState({
      isShowCopyDiv: true,
      itemHeight: 100,
      itemStyle: {
        position: 'fixed',
        zIndex: 1200
      },
      target: {
        clientX: target.x,
        clientY: target.y
      }
    })
  }

//   public getStyles = (prevStyles: any) => {
//     const endValue = prevStyles.map((item: any, i: number) => {
//       return i === 0
//         ? { marginLeft: spring(2, { stiffness: 300, damping: 20 }) }
//         : { marginLeft: spring(prevStyles[i - 1].marginLeft, { stiffness: 300, damping: 20 }) }
//     })
//     return endValue;
//   }

  public getItemStyle = (x: number, interval: number) => {
    const target = this.state.target
    if (!target.clientX) {
      return
    }
    const tmp = x / interval
    let height: number = 100
    let top: number = 0
    let left: number = 0
    let width: number = 100
    if (tmp <= 0.5) {
      height = height - interval * (1 - tmp * 2)
      top = target.clientY -  (target.clientY - 0) * (tmp * 2)
      return {
        'height': height + 'vh',
        'top': top + 'px'
      }
    } else {
      left = target.clientX -  (target.clientX - 0) * ((tmp - 0.5) * 2)
      width = width - (width - 20.5) * (1 - (tmp - 0.5) * 2)
      if (x === interval) {
        setTimeout(() => {
          this.props.history.push("/2048")
        })

      }
      return {
        'height': height + 'vh',
        'left': left + 'px',
        'marginLeft': 0,
        'top': top + 'px',
        'width': width + 'vw'
      }
    }
  }

  public render() {
    return (
        <div/>
    //   <Motion defaultStyle={{height: 30}} style={{height: spring(this.state.itemHeight, { stiffness: 53, damping: 40})}}>
    //     { (inStyle) => {
    //       return (
    //         <li>
    //           <div className="item"
    //             onClick={this.itemClick}
    //             style={{...this.getItemStyle(inStyle.height - 15, 85), ...this.state.itemStyle}}>
    //             { !this.state.isShowCopyDiv ?
    //               <div>
    //                 <div className="title">{ this.props.tabDetailItem.title }</div>
    //                 <div className="content">{ this.props.tabDetailItem.content }</div>
    //               </div> : ''
    //             }
    //           </div>
    //           { this.state.isShowCopyDiv ?
    //               <div className="item">
    //                 <div className="title">{ this.props.tabDetailItem.title }</div>
    //                 <div className="content">{ this.props.tabDetailItem.content }</div>
    //               </div> : ''
    //           }
    //         </li>
    //       )
    //     }
    //   }
    //   </Motion>
    );
  }
}

export default withRouter(TabDetailItem);