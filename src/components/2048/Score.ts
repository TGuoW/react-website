import Cube from './Cube'
import { ImatrixAttr } from './interface'

const diffObj = (oldObj: any, newObj: any) => {
  let score = 0
  for (let i = 17; i > 1; i--) {
    const value = Math.pow(2, i)
    if (newObj[value]) {
      const old = oldObj[value] ? oldObj[value] : 0
      const tmp = newObj[value] - old
      score += tmp * value
      const next = Math.pow(2, i - 1)
      if (oldObj[next]) {
        oldObj[next] += old * 2
      } else {
        oldObj[next] = old * 2
      }
      if (newObj[next]) {
        newObj[next] += newObj[value] * 2
      } else {
        newObj[next] = newObj[value] * 2
      }
    }
  }
  return score
}

class Score {
  public score: number
  public matrixAttr: ImatrixAttr
  constructor (matrixAttr: ImatrixAttr) {
    this.score = 0
    this.matrixAttr = matrixAttr
  }
  public render = (oldMatrix: any, newMatrix: any) => {
    const oldObj = {}
    const newObj = {}
    oldMatrix.forEach((element: number[]) => {
      element.forEach((item) => {
        if (oldObj[item]) {
          oldObj[item]++
        } else {
          oldObj[item] = 1
        }
      })
    })
    newMatrix.forEach((element: Cube[]) => {
      element.forEach((item) => {
        if (item.value && item.static !== 'die') {
          if (newObj[item.value]) {
            newObj[item.value]++
          } else {
            newObj[item.value] = 1
          }
        }
      })
    })
    this.score += diffObj(oldObj, newObj)
    this.matrixAttr = Object.assign({}, this.matrixAttr, { score: this.score })
    return this.matrixAttr
  }
}

export default Score
