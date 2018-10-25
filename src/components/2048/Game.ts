import Cube from './Cube'
import Event from './Event'
import MatrixContainer from './MatrixContainer'
import Score from './Score'

interface Ipos {
  x: number,
  y: number
}

// const MIN_TOUCH_LENGTh = 30

const deepClone = (matrix: Cube[][]): number[][] => matrix.map((ele: Cube[]) => ele.map((i) => i.value))

const compareMatrix = (matrix1: number[][], matrix2: Cube[][]): boolean => {
  let flag = true
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[i].length; j++) {
      if (matrix2[i][j] === undefined) {
        continue
      }
      if (matrix1[i][j] !== matrix2[i][j].value) {
        flag = false
      }
    }
  }
  return flag
}

const setCubePos = (matrix: Cube[][], queue: Cube[]) => {
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

const checkMatrix = (matrix: Cube[][]): boolean => {
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
  public initArr: number[]
  public cacheKey: string[]
  public isCathe: boolean
  public matrix: any[][] = []
  public matrixAttr: any = {
    score: 0
  }
  public cubeQueue: Cube[] = []
  public event: Event
  public score: Score
  public startPos: number[]
  public endPos: number[]
  public callback: (cubeQueue: Cube[], matrixAttr: any, show: boolean) => void
  constructor (initArr: number[], callback: (cubeQueue: Cube[], matrixAttr: any, show: boolean) => void) {
    this.initArr = initArr
    this.callback = callback
  }
  public start = () => {
    this.event = new Event()
    this.score = new Score(this.matrixAttr)

    this.matrix = [0, 1, 2, 3].map((items) =>
      [0, 1, 2, 3].map((item) =>
        new Cube(0)
      )
    )

    this.cubeQueue = []
    this.callback(this.cubeQueue, this.matrixAttr, false)
    this.addCube()
    this.cacheKey= []
    this.isCathe = false
    document.ontouchstart = (e) => {
      this.startPos = [e.touches[0].clientX, e.touches[0].clientY]
    }
    document.ontouchmove = (e) => {
      this.endPos = [e.touches[0].clientX, e.touches[0].clientY]
    }
    document.ontouchend = (e) => {
      const x = this.endPos[0] - this.startPos[0]
      const y = this.endPos[1] - this.startPos[1]
      let direction = ''
      if (Math.abs(x) > Math.abs(y) && x < 0) {
        direction = 'ArrowLeft'
      } else if (Math.abs(x) > Math.abs(y) && x > 0) {
        direction = 'ArrowRight'
      } else if (Math.abs(x) < Math.abs(y) && y < 0) {
        direction = 'ArrowUp'
      } else if (Math.abs(x) < Math.abs(y) && y > 0) {
        direction = 'ArrowDown'
      } else {
        return
      }
      this.cacheKey.push(direction)
      if (!this.isCathe) {
        this.nextStep()
      }
    }
    document.onkeydown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
          this.cacheKey.push(e.key)
          console.log(this.cacheKey)
          if (!this.isCathe) {
            this.nextStep()
          }
          break
      }
    }
  }

  public nextStep = () => {
    if (this.cacheKey[0]) {
      this.isCathe = true
      const key = this.cacheKey[0]
      const matrix = deepClone(this.matrix)
      switch (key) {
        case 'ArrowLeft':
          this.matrix = this.event.left(this.matrix)
          break
        case 'ArrowUp':
          this.matrix = this.event.up(this.matrix)
          break
        case 'ArrowRight':
          this.matrix = this.event.right(this.matrix)
          break
        case 'ArrowDown':
          this.matrix = this.event.down(this.matrix)
          break
      }
      setCubePos(this.matrix, this.cubeQueue)
      const newScore = this.score.render(matrix, this.matrix)
      this.matrixAttr = Object.assign({}, this.matrixAttr, newScore)
      this.callback(this.cubeQueue, this.matrixAttr, false)
      setTimeout(() => {
        this.callback(this.cubeQueue, this.matrixAttr, false)
        if (!compareMatrix(matrix, this.matrix)) {
          this.addCube()
        }
        this.cacheKey.shift()
        this.nextStep()
      }, 60)
    } else {
      this.isCathe = false
    }
  }

  public end = () => {
    this.callback(this.cubeQueue, this.matrixAttr, true)
    console.log('end')
    document.onkeydown = null
  }

  public addCube = () => {
    // console.log('add')
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

    const index = Math.floor(Math.random() * tmp.length)
    this.matrix[tmp[index].x][tmp[index].y] = newCube

    this.cubeQueue.forEach((element) => {
      if (element.static === 'die') {
        const pos: number[] = [tmp[index].x, tmp[index].y]
        element = new Cube(0)
        element.setPos(pos)
      }
    })

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
    this.callback(this.cubeQueue, this.matrixAttr, false)
    if (!checkIsEnd(this.matrix, tmp.length)) {
      this.end()
    }
    return
  }
  public removeCube = (index: number) => {
    this.cubeQueue[index].zero(this.cubeQueue[index])
  }
}

export default Game
