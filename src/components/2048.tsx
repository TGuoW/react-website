import * as React from 'react'
import '../style/2048.less'
import Game from './2048/Game'

interface Istate {
  Game: Game,
  cubeQueue: any[],
  matrixAttr: any,
  isShowEnd: boolean,
  isRemove: boolean
}

class My2048 extends React.Component {
  public state: Istate

  constructor (props: any) {
    super(props)
    this.state = {
      Game: new Game([4, 4], () => null),
      cubeQueue: [],
      isRemove: false,
      isShowEnd: false,
      matrixAttr: {}
    }
  }

  public componentDidMount () {
    document.addEventListener('touchmove', (e) => {e.preventDefault()}, false);

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

  public handleClick = (e: any) => {
    const index = e.target.getAttribute('data-index')
    if (index !== undefined && index !== null && this.state.isRemove) {
      this.state.Game.removeCube(index)
      this.setState({
        isRemove: false
      })
    }
  }
  public removeCube = () => {
    this.state.Game.pause()
    this.setState({
      isRemove: true
    })
  }
  public render() {
    return (
      <div className="bg">
        <div className="attr">
          <div className="btn-group">
            <div className="btn-bg" onClick={this.state.Game.start}>
              <div className="btn-bg1">start</div>
            </div>
            <div className="btn-bg" onClick={this.removeCube}>
              <div className="btn-bg1">remove</div>
            </div>
          </div>
          <div className="score">{this.state.matrixAttr.score}</div>
        </div>

        <div className="table">
          <div className="box" onClick={this.handleClick}>
            {[0, 1, 2, 3].map((item, i) => (
              <div key={i}>
                {[0, 1, 2, 3].map((ele, j) => (<div key={j} className={'cell position' + i + '-' + j}/>))}
              </div>
            ))}
            {this.state.cubeQueue.map((item, index) => {
              return (
                item.isShow
                  ? (<div key={index}
                      className={'cube position' + item.nowPos[0] + '-' + item.nowPos[1] + ' ' + item.class + (item.value ? ' top-index' : '')}>
                      <div data-index={index}>{item.value ? item.value : ''}</div>
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