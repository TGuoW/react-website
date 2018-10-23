import * as React from 'react'
import { Motion, spring } from 'react-motion'
import '../style/imgCover.less'

interface Istate {
  motionBarLength: number[]
}
class ImgCover extends React.Component {
  public state: Istate
  public timeID: any

  constructor (props: any) {
    super(props)
    this.state = {
      motionBarLength: [0, 0, 0, 0, 0]
    }
  }

  public componentWillMount() {
    this.timeID = setInterval(() => {
      const arr = this.state.motionBarLength.map((num: number) => {
        let length = Math.random()
        while (Math.abs(length - num) < 0.35) {
          length = Math.random()
        }
        return length
      })
      this.setState({
        motionBarLength: arr
      })
    }, 1000)
  }

  public componentWillUnmount() {
    clearInterval(this.timeID)
  }

  public render() {
    return (
      <div className="App-body">
        <div className="img-cover">
          <ul>
            {this.state.motionBarLength.map((width: number, i: number) =>
              <Motion style={{x: spring(width, { stiffness: 120, damping: 14 })}} key={i.toString()}>
                {inStyle => {
                  return (
                    <li className="motion-bar" style={{width: `${inStyle.x * 75 + 20}vw`}}/>
                  )}
                }
              </Motion>
            )}
          </ul>
          <img className="avatarImg" src="http://img2.niutuku.com/desk/1208/1312/ntk-1312-2905.jpg" alt=""/>
        </div>
      </div>
    );
  }
}

export default ImgCover;