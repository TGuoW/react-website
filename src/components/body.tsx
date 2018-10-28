import * as React from 'react'
import { spring } from 'react-motion'
import '../style/body.less'
import ImgCover from './imgCover'

import TabDetail from './body/tabDetail'

// import { Link } from 'react-router-dom';

interface Idetail {
  title: string,
  content: string
}

interface Istate {
  tabBtn: string[],
  activeTab: number,
  tabDetail: Idetail[],
  itemStyle: any
}

class Body extends React.Component {
  public state: Istate
  public timeID: any

  constructor (props: any) {
    super(props)
    this.state = {
      activeTab: 0,
      itemStyle: {height: 10},
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
      tabDetail: [obj]
    })
  }

  public itemClick = () => {
    this.setState({
      itemStyle: { height: 100 },
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
      <div className="App-body">
        <ImgCover/>
        <div className="method-items">
          <ul onClick={this.handleClickTab}>
            {this.state.tabBtn.map((tab, index) =>
              <li key={index} id={index.toString()} className={this.state.activeTab === index ? 'active' : ''}>{ tab }</li>
            )}
          </ul>
        </div>
        <TabDetail tabDetail={this.state.tabDetail} getStyles={this.getStyles} itemStyle={this.state.itemStyle} itemClick={this.itemClick}/>
      </div>
    );
  }
}

export default Body;