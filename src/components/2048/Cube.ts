class Cube {
  public value: number
  public class: string
  public static: string
  public prevPos: number[]
  public nowPos: number[]
  public dieCube: Cube
  public isShow: boolean
  public prevStatus: object
  constructor (value: number) {
    this.isShow = true
    this.static = 'alive'
    this.value = value
    this.class = 'cube-' + value + ' animation'
    setTimeout(() => {
      this.class = 'cube-' + this.value
    }, 150)
  }
  public combine = () => {
    this.value *= 2
    this.class = 'cube-' + this.value + ' animation'
    setTimeout(() => {
      this.class = 'cube-' + this.value
    }, 150)
  }
  public zero = (posCube: Cube) => {
    this.dieCube = posCube
    this.static = 'die'
    this.class = 'cube-' + this.value * 2
    this.value = 0
    setTimeout(() => {
      this.isShow = false
    }, 60)
  }
  public setPos = (arr: number[]) => {
    if (this.nowPos) {
      this.prevPos = [...this.nowPos]
    }
    this.nowPos = [...arr]
  }
  public deleteSelf = () => {
    this.isShow = false
  }
  public get getPrevStatus (): object {
    const obj = {
      isShow: this.isShow,
      nowPos: this.nowPos,
      prevPos: this.prevPos,
      static: this.static,
      value: this.value
    }
    let dieObj = {}
    if (this.dieCube) {
      dieObj = {
        dieCube: this.dieCube
      }
    }
    return Object.assign(obj, dieObj)
  }
  public setNowStatus (obj: any) {
    Object.keys(obj).map((item) => {
      this[item] = obj[item]
    })
    this.class = 'cube-' + this.value + ' animation'
  }
}

export default Cube
