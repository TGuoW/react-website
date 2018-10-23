import MatrixContainer from './MatrixContainer'

class Event {
  public left (matrix: any) {
    return new MatrixContainer(matrix).reverseArr().push().add().push().reverseArr().end()
  }
  public right (matrix: any) {
    return new MatrixContainer(matrix).push().add().push().end()
  }
  public up (matrix: any) {
    return new MatrixContainer(matrix).reverseMatrix().reverseArr().push().add().push().reverseArr().reverseMatrix().end()
  }
  public down (matrix: any) {
    return new MatrixContainer(matrix).reverseMatrix().push().add().push().reverseMatrix().end()
  }
}

export default Event
