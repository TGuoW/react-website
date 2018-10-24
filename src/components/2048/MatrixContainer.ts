import Cube from './Cube'

const deepClone = (matrix: Cube[][]) => matrix.map((ele: Cube[]) => ele.slice(0))

class MatrixContainer {
  public matrix: any
  constructor (matrix: any) {
    this.matrix = deepClone(matrix)
    return this
  }
  public push = () => {
    this.matrix = this.matrix.map((ele: Cube[]) =>
      ele.filter((item) =>
        !item.value
      ).concat(
        ele.filter((item) =>
          item && item.value
        )
      )
    )
    return this
  }
  public add = () => {
    this.matrix = this.matrix.map((arr: Cube[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i].value === arr[i - 1].value) {
          arr[i].combine()
          arr[i - 1].zero(arr[i])
          i--
        }
      }
      return arr
    })
    return this
  }
  public reverseArr = () => {
    this.matrix = this.matrix.map((ele: Cube[]) => ele.reverse())
    return this
  }
  public reverseMatrix = () => {
    const newMartrix = deepClone(this.matrix)
    for (let i = 0; i < newMartrix.length; i++) {
      for (let j = 0; j < newMartrix[i].length; j++) {
        this.matrix[j][i] = newMartrix[i][j]
      }
    }
    return this
  }
  public end = () => {
    return this.matrix
  }
}

export default MatrixContainer
