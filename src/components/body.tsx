import * as React from 'react'
import {Motion, spring, StaggeredMotion } from 'react-motion'
import '../style/body.less'
import ImgCover from './imgCover'

import { Link } from 'react-router-dom';

interface Idetail {
  title: string,
  content: string
}

interface Istate {
  tabBtn: string[],
  activeTab: number,
  tabDetail: Idetail[]
}

class Body extends React.Component {
  public state: Istate
  public timeID: any

  constructor (props: any) {
    super(props)
    this.state = {
      activeTab: 0,
      tabBtn: ['test', 'test', 'test'],
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

  public getStyles = (prevStyles: any) => {
    const endValue = prevStyles.map((item: any, i: number) => {
      return i === 0
        ? { marginLeft: spring(2, { stiffness: 300, damping: 20 }) }
        : { marginLeft: spring(prevStyles[i - 1].marginLeft, { stiffness: 300, damping: 20 }) }
    })
    return endValue;
  }

  public render() {
    function TabDetail (props: any) {
      const boxes = props.tabDetail.map(() => {
        return { marginLeft: 100 }
      })
      return (
        props.tabDetail.length > 0 ? (
          <Motion defaultStyle={{marginLeft: 100}} style={{marginLeft: spring(2, { stiffness: 300, damping: 20 })}}>
            {inStyle => {
              return (
                <div className="items" style={{marginLeft: `${inStyle.marginLeft}vw`}}>
                  <StaggeredMotion defaultStyles={boxes}
                    styles={props.getStyles}>
                    {(interpolatingStyles: any) =>
                      <ul>
                        {interpolatingStyles.map((item: any, i: number) => {
                          return (
                            <Link to="/2048" key={i}>
                              <li
                                style={{marginLeft: `${item.marginLeft}vw`}}>
                                <div className="title">{ props.tabDetail[i].title }</div>
                                <div className="content">{ props.tabDetail[i].content }</div>
                              </li>
                            </Link>
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
      )
    }
    return (
      <div className="App-body">
        <ImgCover/>
        <div className="method-items">
          <ul onClick={this.handleClickTab}>
            {this.state.tabBtn.map((tab, index) =>
              <li key={index} id={index.toString()} className={this.state.activeTab === index ? 'active' : ''}>{ tab }</li>
            )}
          </ul>
        </div>
          <TabDetail tabDetail={this.state.tabDetail} getStyles={this.getStyles}/>
      </div>
    );
  }
}

export default Body;