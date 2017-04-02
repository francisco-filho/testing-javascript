import React from 'react'
import './Noticia.css'

export default class Noticia extends React.Component {

  static get propTypes(){
    return {
      img: React.PropTypes.string,
      title: React.PropTypes.string,
      summary: React.PropTypes.string,
      author: React.PropTypes.shape({
        code: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
      })
    }
  }

  render(){
    const { image, title, author, summary} = this.props

    return (
      <div className="news">
        <img className="main" src={image}/>
        <h2>{ title }</h2>
        {
          summary && <p>{summary}</p>
        }
        <div className="author">
          <img src={author.avatar} className="avatar"/>
          <div className="author-info">
            <div className="name">{author.name}</div>
            <div className="name">{author.code}</div>
          </div>
          <span className="date">{author.date.toLocaleDateString()}</span>
        </div>
      </div>
    )
  }
}
