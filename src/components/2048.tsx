import * as React from 'react'
import '../style/2048.less'
import Game from './2048/Game'

interface Istate {
  Game: Game,
  cubeQueue: any[],
  matrixAttr: any,
  isShowEnd: boolean
}

class My2048 extends React.Component {
  public state: Istate

  constructor (props: any) {
    super(props)
    this.state = {
      Game: new Game([4, 4], () => null),
      cubeQueue: [],
      isShowEnd: false,
      matrixAttr: {},
    }
  }

  public componentDidMount () {
    this.setState({
      Game: new Game([4, 4], (cubeQueue: any[], matrixAttr: any, isShowEnd: boolean): void => {
        this.setState({
          'cubeQueue': cubeQueue,
          'isShowEnd': isShowEnd,
          'matrixAttr': matrixAttr
        })
      })
    })
  }

  public render() {
    return (
      <div className="bg">
        <div className="method-items" onClick={this.state.Game.start}>
          start
        </div>
        <div className="table">
          <div className="box">
            {[0, 1, 2, 3].map((item, i) => (
              <div key={i}>
                {[0, 1, 2, 3].map((ele, j) => (<div key={j} className={'cell position' + i + '-' + j}/>))}
              </div>
            ))}
            {this.state.cubeQueue.map((item, index) => {
              return (
                item.isShow && item.value
                  ? (<div key={index}
                      className={'cube position' + item.nowPos[0] + '-' + item.nowPos[1] + ' ' + item.class + (item.value ? ' top-index' : '')}>
                      <div>{item.value}</div>
                    </div>)
                  : ''
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default My2048;