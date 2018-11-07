import Cube from './Cube'
import Event from './Event'
import { ImatrixAttr, Ipos } from './interface'
import MatrixContainer from './MatrixContainer'
import Score from './Score'

const MIN_TOUCH_LENGTH = 30

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

const setCubeQueueToMatrix = (cubeQueue: Cube[], matrix: Cube[][]) => {
  matrix = matrix.map((item, index) => {
    const tmp = item.map((v, i) => {
      const newCube = new Cube(0)
      newCube.setPos([index, i])
      return newCube
    })
    return tmp
  })
  cubeQueue.forEach(item => {
    // console.log(item.value)
    const pos = item.nowPos
    matrix[pos[0]][pos[1]] = item
  })
  // console.log(matrix.map(item => item.map(v => v.value)), 'undo')
  return matrix
}

const checkIsEnd = (matrix: Cube[][], extraCubeNumber: number) => {
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

const test = (cubeQueue: Cube[], matrix: Cube[][]) => {

  cubeQueue.forEach(item => {
    const pos = item.nowPos
    if (item.value !== matrix[pos[0]][pos[1]].value) {
      console.log(pos, matrix[pos[0]][pos[1]], item, matrix)
      console.log(cubeQueue.map(ite => ite.value))
      console.log([...cubeQueue])
console.log(matrix.map(it => it.map(v => v.value)), 'undo')
      console.error('fail')
    }
  })
}

class Game {
  public initArr: number[]
  public cacheKey: string[]
  public isCathe: boolean
  public matrix: Cube[][] = []
  public matrixAttr: ImatrixAttr
  public cubeQueue: Cube[] = []
  public event: Event
  public score: Score
  public startPos: number[]
  public endPos: number[]
  public isRemove: boolean
  public canUndo: boolean
  public copyQueue: any[]
  public callback: (cubeQueue: Cube[], matrixAttr: ImatrixAttr, show: boolean) => void
  constructor (initArr: number[], callback: (cubeQueue: Cube[], matrixAttr: ImatrixAttr, show: boolean) => void) {
    this.initArr = initArr
    this.callback = callback
    this.matrixAttr = {
      highestScore: localStorage.getItem('highestScore') ? localStorage.getItem('highestScore') : 0,
      removeCubeNumber: 3,
      score: 0
    }
    this.callback(this.cubeQueue, this.matrixAttr, false)
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
    this.matrixAttr.score = 0
    this.matrixAttr.removeCubeNumber = 3
    this.addCube()
    this.cacheKey= []
    this.isCathe = false
    this.isRemove = false
    this.canUndo = false
    document.ontouchstart = (e) => {
      this.startPos = [e.touches[0].clientX, e.touches[0].clientY]
    }
    document.ontouchmove = (e) => {
      this.endPos = [e.touches[0].clientX, e.touches[0].clientY]
    }
    document.ontouchend = (e) => {
      if (!this.endPos || this.isRemove) {
        return
      }
      const x = this.endPos[0] - this.startPos[0]
      const y = this.endPos[1] - this.startPos[1]
      if (Math.abs(x) < MIN_TOUCH_LENGTH && Math.abs(y) < MIN_TOUCH_LENGTH) {
        return
      }
      let direction: string = ''
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
      this.canUndo = true
      this.copyQueue = this.cubeQueue.map((item) => item.getPrevStatus)
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
          // console.log(this.cubeQueue.map(item => item.value))
          // console.log(this.cubeQueue)
          // console.log(this.matrix.map(item => item.map(v => v.value)))
          test(this.cubeQueue, this.matrix)
        }
        this.cacheKey.shift()
        this.nextStep()
      }, 60)
    } else {
      this.isCathe = false
    }
  }

  public end = () => {
    const highestScore = localStorage.getItem('highestScore')
    if (Number(highestScore) < this.matrixAttr.score) {
      this.matrixAttr.highestScore = this.matrixAttr.score
      localStorage.setItem('highestScore', this.matrixAttr.score.toString())
    }
    this.callback(this.cubeQueue, this.matrixAttr, true)
    document.onkeydown = null
  }

  public addCube = () => {
    const value: number = Math.random() > 0.5 ? 4 : 2
    const newCube = new Cube(value)
    const matrix = this.matrix
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
    if (!this.matrixAttr.removeCubeNumber) {
      return
    }
    this.matrixAttr.removeCubeNumber--
    this.cubeQueue[index].zero(this.cubeQueue[index])
    setTimeout(() => {
      this.callback(this.cubeQueue, this.matrixAttr, false)
      this.continue()
    }, 60)
  }
  public continue = () => {
    this.isRemove = false
  }
  public pause = () => {
    this.isRemove = true
  }
  public undo = () => {
    if (!this.canUndo) {
      return
    }
    this.canUndo = false
    this.cubeQueue = []
    this.copyQueue.map((item: object, index: number) => {
      const newCube = new Cube(0)
      newCube.setNowStatus(item)
      this.cubeQueue[index] = newCube
    })
    this.matrix = setCubeQueueToMatrix(this.cubeQueue, this.matrix)
    this.callback(this.cubeQueue, this.matrixAttr, false)
    // console.log(this.copyQueue.map(item => item.value), 'undo')
    // console.log(this.cubeQueue.map(item => item.value), 'undo')
    // console.log(this.cubeQueue, 'undo')
    // console.log(this.matrix.map(item => item.map(v => v.value)), 'undo')
  }
}

export default Game
