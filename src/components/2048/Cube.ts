class Cube {
  public value: number
  public class: string
  public static: string
  public prevPos: number[]
  public nowPos: number[]
  public dieCube: Cube
  public isShow: boolean
  constructor (value: number) {
    this.isShow = true
    this.static = 'alive'
    this.value = value
    this.class = 'cube-' + value + ' animation'
    setTimeout(() => {
      this.class = 'cube-' + this.value
    }, 150)
  }
  public combine () {
    this.value *= 2
    this.class = 'cube-' + this.value + ' animation'
    setTimeout(() => {
      this.class = 'cube-' + this.value
    }, 150)
  }
  public zero (posCube: Cube) {
    this.dieCube = posCube
    this.static = 'die'
    this.class = 'cube-' + this.value * 2
    this.value = 0
    setTimeout(() => {
      this.isShow = false
    }, 150)
  }
  public setPos (arr: number[]) {
    if (this.nowPos) {
      this.prevPos = [...this.nowPos]
    }
    this.nowPos = [...arr]
  }
}

export default Cube
