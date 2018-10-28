import * as React from 'react'
import {Motion, spring, StaggeredMotion } from 'react-motion'
// import '../style/body.less'

// import { Link } from 'react-router-dom';

interface Idetail {
  title: string,
  content: string
}

interface Istate {
  tabDetail: Idetail[],
  itemStyle: any
}

interface Iprops {
  tabDetail: any[],
  itemClick: any,
  getStyles: any,
  itemStyle: any
}

class Body extends React.Component {
  public state: Istate
  public timeID: any
  public props: Iprops

  constructor (props: Iprops) {
    super(props)
    this.props = props
    this.state = {
      itemStyle: {height: 60},
      tabDetail: []
    }
  }

  public handleClickTab = (e: any) => {
    e.persist()
    const obj: object = {
      content: '一个2048小游戏',
      title: '2048'
    }
    this.setState({
      activeTab: Number(e.target.id),
      tabDetail: [obj, obj, obj]
    })
  }

  public itemClick = () => {
    this.setState({
      height: 100
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
    const boxes = this.props.tabDetail.map(() => {
      return { marginLeft: 100 }
    })
    return (
        this.props.tabDetail.length > 0 ? (
            <Motion defaultStyle={{marginLeft: 100}} style={{marginLeft: spring(2, { stiffness: 300, damping: 20 })}}>
              {inStyle => {
                return (
                  <div className="items" style={{marginLeft: `${inStyle.marginLeft}vw`}}>
                    <StaggeredMotion defaultStyles={boxes}
                      styles={this.props.getStyles}>
                      {(interpolatingStyles: any) =>
                        <ul>
                          {interpolatingStyles.map((item: any, i: number) => {
                            return (
                              // <Link to="/2048" key={i}>
                                <Motion key={i} defaultStyle={{height: 60}} style={{height: spring(this.props.itemStyle.height)}}>
                                  { (itemStyle) => {
                                    return (
                                      <li
                                        onClick={this.props.itemClick}
                                        style={{marginLeft: `${item.marginLeft}vw`, height: itemStyle.height + 'vw'}}>
                                        <div className="title">{ this.props.tabDetail[i].title }</div>
                                        <div className="content">{ this.props.tabDetail[i].content }</div>
                                      </li>
                                    )
                                  }
                                }
                                </Motion>
                              // </Link>
                            )
                          })}
                        </ul>
                      }
                    </StaggeredMotion>
                  </div>
                )
              }}
            </Motion>
          ) : null
    );
  }
}

export default Body;