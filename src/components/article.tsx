import * as React from 'react'
import '../style/article.less'

class Article extends React.Component {

  constructor (props: any) {
    super(props)
  }

  public render() {
    return (
      <section className="article-body">
        <header>
          我的文章
        </header>
        <ul>
          <li>
            <p className="title">高级组件</p>
            <p className="date">2018-11-15</p>
          </li>
        </ul>
      </section>
    );
  }
}

export default Article;