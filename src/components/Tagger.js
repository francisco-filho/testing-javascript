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
    if (this.isTagEmpty(tag) || this.tagExists(tag)) return
    this.setState({tags: [...this.state.tags, tag]})
  }

  removeTag(tag){
    const tags = this.state.tags.filter( t => t !== tag)
    this.setState({tags})
  }

  isTagEmpty(tag){
    return /^\s*$/.test(tag)
  }

  tagExists(tag){
    return this.state.tags.some(t => t === tag)
  }

  render(){
    const {tags} = this.state

    return (
      <div className="tagger">
        <div className="tags">
          {
            tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))
          }
        </div>
        <input type="text" onKeyPress={ e => this.addTag(e.target.value) }/>
      </div>
    )
  }
}