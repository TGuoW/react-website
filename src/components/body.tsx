import * as React from 'react'
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
  tabDetail: Idetail[]
}

class Body extends React.Component {
  public state: Istate
  public timeID: any

  constructor (props: any) {
    super(props)
    this.state = {
      activeTab: 0,
      tabBtn: ['test', 'test', 'test', 'test'],
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
      tabDetail: [obj, obj, obj, obj]
    })
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
        <TabDetail tabDetail={this.state.tabDetail} tab={this.state.activeTab}/>
      </div>
    );
  }
}

export default Body;