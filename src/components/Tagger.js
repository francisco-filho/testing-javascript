import React, {Component} from 'react'

export default class Tagger extends Component {
  static get propTypes(){
    return {
      tags: React.PropTypes.array
    }
  }

  static get defaultProps(){
    return {
      tags: []
    }
  }

  constructor(){
    super()
    this.state = {tags: []}
  }

  componentDidMount(){
    this.setState({tags: this.props.tags})
  }

  addTag(tag){
    if (this.isEmpty(tag) || this.tagExists(tag)) return
    this.setState({tags: [...this.state.tags, tag]})
  }

  removeTag(tag){
    const tags = this.state.tags.filter( t => t !== tag)
    this.setState({tags})
  }

  isEmpty(tag){
    return /^\s*$/.test(tag)
  }

  tagExists(tag){
    return this.state.tags.some(t => t === tag)
  }

  removeLastTag(){
    const tags = [...this.state.tags]
    tags.pop()
    this.setState({tags})
  }

  render(){
    const {tags} = this.state

    return (
      <div className="tagger">
        <div className="tags">
          {
            tags.map((tag, i) => (
              <span key={i} className="tag">{tag}
                <span className="close" onClick={ e => this.removeTag(tag) }>x</span>
              </span>
            ))
          }
        </div>
        <input type="text" onKeyDown={ e => {
          if (e.keyCode === 13) {
            this.addTag(e.target.value)
            e.target.value = ''
          } else if (e.keyCode === 8 && this.isEmpty(e.target.value)){
            this.removeLastTag()
            e.target.value = ''
          }
        }}/>
      </div>
    )
  }
}