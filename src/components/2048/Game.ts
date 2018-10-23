import Cube from './Cube'
import Event from './Event'
import MatrixContainer from './MatrixContainer'
import Score from './Score'

interface Ipos {
  x: number,
  y: number
}

const deepClone = (matrix: any) => matrix.map((ele: Cube[]) => ele.map((i) => i.value))

const compareMatrix = (matrix1: any, matrix2: any) => {
  let flag = true
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[i].length; j++) {
      if (matrix1[i][j] !== matrix2[i][j].value) {
        flag = false
      }
    }
  }
  return flag
}

const setCubePos = (matrix: any, queue: Cube[]) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j].setPos([i, j])
    }
  }
  queue.forEach((element) => {
    if (element.static === 'die') {
      const pos = element.dieCube.nowPos
      element.setPos([...pos])
    }
  })
}

const checkMatrix = (matrix: any) => {
  let flag = false
  matrix.forEach((item: Cube[], i: number) => {
    for (let j = 0; j < matrix[i].length - 1; j++) {
      if (matrix[i][j].value === matrix[i][j + 1].value && matrix[i][j].value !== 0) {
        flag = true
      }
    }
  })
  return flag
}

const checkIsEnd = (matrix: any, extraCubeNumber: number) => {
  try {
    if (extraCubeNumber > 1) {
      return true
    }
    const matrix1 = new MatrixContainer(matrix).push().end()
    const matrix2 = new MatrixContainer(matrix).reverseMatrix().push().end()
    return checkMatrix(matrix1) || checkMatrix(matrix2)
  } catch (e) {
    throw new Error(e)
  }
}

class Game {
  public matrix: any[][] = []
  public matrixAttr: any = {
    score: 0
  }
  public cubeQueue: Cube[] = []
  public event: Event
  public score: Score
  public callback: (cubeQueue: Cube[], matrixAttr: any, show: boolean) => void
  constructor (obj: any, callback: () => void) {
    for (let i = 0; i < obj[0]; i++) {
      this.matrix.push(new Array(4))
      for (let j = 0; j < obj[1]; j++) {
        this.matrix[i][j] = new Cube(0)
      }
    }
    this.event = new Event()
    this.score = new Score(this.matrixAttr)
    this.callback = callback
    this.callback(this.cubeQueue, this.matrixAttr, false)
  }
  public start () {
    const self = this
    this.addCube()
    document.onkeydown = (e) => {
      const matrix = deepClone(self.matrix)
      switch (e.key) {
        case 'ArrowLeft':
          self.matrix = self.event.left(self.matrix)
          break
        case 'ArrowUp':
          self.matrix = self.event.up(self.matrix)
          break
        case 'ArrowRight':
          self.matrix = self.event.right(self.matrix)
          break
        case 'ArrowDown':
          self.matrix = self.event.down(self.matrix)
          break
      }
      if (!compareMatrix(matrix, self.matrix)) {
        const newScore = self.score.render(matrix, self.matrix)
        setCubePos(self.matrix, self.cubeQueue)
        self.matrixAttr = Object.assign({}, self.matrixAttr, newScore)
        self.callback(self.cubeQueue, self.matrixAttr, false)
        setTimeout(() => {
          self.addCube()
        }, 150)
      }
    }
  }
  public end () {
    this.callback(this.cubeQueue, this.matrixAttr, true)
    console.log('end')
    document.onkeydown = null
  }
  public addCube () {
    console.log('add')
    const value: number = Math.random() > 0.5 ? 4 : 2
    const newCube = new Cube(value)
    const matrix = [...this.matrix]
    const tmp: Ipos[] = []
    matrix.forEach((element, i) => {
      element.forEach((item, idx) => {
        if (item.value === 0) {
          tmp.push({ x: i, y: idx })
        }
      })
    })
    this.cubeQueue.forEach((element) => {
      if (element.static === 'die') {
        const pos: number[] = element.nowPos
        element = new Cube(0)
        element.setPos(pos)
      }
    })
    const index = Math.floor(Math.random() * tmp.length)
    this.matrix[tmp[index].x][tmp[index].y] = newCube

    let flag = false
    for (let i = 0; i < this.cubeQueue.length; i++) {
      if (this.cubeQueue[i].static === 'die') {
        this.cubeQueue[i].setPos([tmp[index].x, tmp[index].y])
        this.cubeQueue.splice(i, 1, newCube)
        flag = true
        break
      }
      if (this.cubeQueue[i].nowPos[0] === tmp[index].x && this.cubeQueue[i].nowPos[1] === tmp[index].y) {
        console.log('success')
        this.cubeQueue.splice(i, 1, newCube)
        flag = true
        break
      }
    }
    if (!flag) {
      this.cubeQueue.push(newCube)
    }

    newCube.setPos([tmp[index].x, tmp[index].y])
    this.matrix.splice(tmp[index].x, 1, this.matrix[tmp[index].x])
    this.callback(this.cubeQueue, this.matrixAttr, false)
    if (!checkIsEnd(this.matrix, tmp.length)) {
      this.end()
    }
    return
  }
  public removeCube (index: number) {
    this.cubeQueue[index].zero(this.cubeQueue[index])
  }
}

export default Game
