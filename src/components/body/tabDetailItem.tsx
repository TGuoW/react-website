import * as React from 'react'
import {Motion, spring } from 'react-motion'
// import '../style/body.less'
import FullscreenTransition from '../common/fullscreenTransition'

import {withRouter} from "react-router-dom";

interface Idetail {
  title: string,
  content: string
}

interface Istate {
  tabDetail: Idetail[],
  itemHeight: number
}

interface Iprops {
  tabDetailItem: any,
  marginLeft: number,
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
      itemHeight: 15,
      tabDetail: []
    }
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
      <Motion defaultStyle={{height: 30}} style={{height: spring(this.state.itemHeight, { stiffness: 150, damping: 15})}}>
        { (inStyle) => {
          return (
            <li>
              <FullscreenTransition targetID="key" to='/2048' styles={{background: { from: 'rgb(206, 192, 0)', to: 'rgb(51, 51, 51)'}}}>
                <div className="item" id="key"
                  style={{marginLeft: `${this.props.marginLeft}vw`, height: inStyle.height + 'vh'}}>
                    <div className="title">{ this.props.tabDetailItem.title }</div>
                    <div className="content">{ this.props.tabDetailItem.content }</div>
                </div>
              </FullscreenTransition>
            </li>
          )
        }
      }
      </Motion>
    );
  }
}

export default withRouter(TabDetailItem);
