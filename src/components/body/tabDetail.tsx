import * as React from 'react'
import {Motion, spring, StaggeredMotion } from 'react-motion'
import TabDetailItem from './tabDetailItem'
// import '../style/body.less'

// import { Link } from 'react-router-dom';

interface Idetail {
  title: string,
  content: string
}

interface Istate {
  tabDetail: Idetail[],
  itemStyle: any
}

interface Iprops {
  tabDetail: any[],
  tab: number
}

class Body extends React.Component {
  public state: Istate
  public timeID: any
  public props: Iprops

  constructor (props: Iprops) {
    super(props)
    this.props = props
    this.state = {
      itemStyle: {height: 20},
      tabDetail: []
    }
  }

  public componentWillReceiveProps = (props: any) => {
    console.log(props)
    this.setState({})
  }

  public itemClick = () => {
    this.setState({
      itemStyle: {
        height: 30
      }
    })
  }

  public getStyles = (prevStyles: any) => {
    const endValue = prevStyles.map((item: any, i: number) => {
      return i === 0
        ? { marginLeft: spring(2, { stiffness: 300, damping: 20 }) }
        : { marginLeft: spring(prevStyles[i - 1].marginLeft, { stiffness: 300, damping: 20 }) }
    })
    return endValue;
  }

  public render() {
    const boxes = this.props.tabDetail.map(() => {
      return { marginLeft: 100 }
    })
    const TabDetail = (props: any) => {
      return (
        props.tabDetail.length > 0 ? (
          <Motion defaultStyle={{marginLeft: 100}} style={{marginLeft: spring(2, { stiffness: 300, damping: 20 })}}>
            {inStyle => {
              return (
                <div className="items" style={{marginLeft: `${inStyle.marginLeft}vw`}}>
                  <StaggeredMotion defaultStyles={boxes}
                    styles={props.getStyles}>
                    {(interpolatingStyles: any) =>
                      <ul>
                        {interpolatingStyles.map((item: any, i: number) => {
                          return (
                            <TabDetailItem key={i} tabDetailItem={props.tabDetail[i]} marginLeft={item.marginLeft}/>
                          )
                        })}
                      </ul>
                    }
                  </StaggeredMotion>
                </div>
              )
            }}
          </Motion>
        ) : null
      )
    }
    return (
        // this.props.tabDetail.length > 0 ? (
        //   <Motion defaultStyle={{marginLeft: 100}} style={{marginLeft: spring(2, { stiffness: 300, damping: 20 })}}>
        //     {inStyle => {
        //       return (
        //         <div className="items" style={{marginLeft: `${inStyle.marginLeft}vw`}}>
        //           <StaggeredMotion defaultStyles={boxes}
        //             styles={this.getStyles}>
        //             {(interpolatingStyles: any) =>
        //               <ul>
        //                 {interpolatingStyles.map((item: any, i: number) => {
        //                   return (
        //                     <TabDetailItem key={i} tabDetailItem={this.props.tabDetail[i]} marginLeft={item.marginLeft}/>
        //                     // <Link to="/2048" key={i}>
        //                       // <Motion key={i} defaultStyle={{height: 60}} style={{height: spring(this.state.itemStyle.height)}}>
        //                       //   { (itemStyle) => {
        //                       //     return (
        //                       //       <li
        //                       //         onClick={this.itemClick}
        //                       //         style={{marginLeft: `${item.marginLeft}vw`, height: itemStyle.height + 'vw'}}>
        //                       //         <div className="title">{ this.props.tabDetail[i].title }</div>
        //                       //         <div className="content">{ this.props.tabDetail[i].content }</div>
        //                       //       </li>
        //                       //     )
        //                       //   }
        //                       // }
        //                       // </Motion>
        //                     // </Link>
        //                   )
        //                 })}
        //               </ul>
        //             }
        //           </StaggeredMotion>
        //         </div>
        //       )
        //     }}
        //   </Motion>
        // ) : null
      <TabDetail tabDetail={this.props.tabDetail} getStyles={this.getStyles} itemStyle={this.state.itemStyle} itemClick={this.itemClick}/>
    );
  }
}

export default Body;