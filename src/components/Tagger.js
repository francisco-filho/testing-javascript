import React, {Component} from 'react'
import './Tagger.css'

export default class Tagger extends Component {
  static get propTypes(){
    return {
      tags: React.PropTypes.string,
      onChange: React.PropTypes.func
    }
  }

  static get defaultProps(){
    return {
      tags: '',
      separator: ','
    }
  }

  constructor(){
    super()
    this.state = {tags: []}
  }

  componentWillReceiveProps(newProps){
    this.setState({tags: this.tagStringToArray(newProps.tags)});
  }

  tagStringToArray(tags){
    return tags.split(this.props.separator)
      .filter( t => t != '')
      .map( t => t.trim());
  }

  componentDidMount(){
    const { tags } = this.props
    this.setState({tags: this.tagStringToArray(tags)})
  }

  addTag(tag){
    if (this.isEmpty(tag) || this.tagExists(tag)) return

    const newState = [...this.state.tags, tag]
    this.props.onChange && this.props.onChange(newState.join(this.props.separator))
    this.setState({tags: newState})
  }

  removeTag(tag){
    const tags = this.state.tags.filter( t => t !== tag)
    this.setState({tags})
    this.props.onChange && this.props.onChange(tags)
  }

  isEmpty(tag){
    return typeof tag === 'undefined' || tag === null || /^\s*$/.test(tag)
  }

  tagExists(tag){
    return this.state.tags.some(t => t === tag)
  }

  removeLastTag(){
    const tags = [...this.state.tags]
    tags.pop()
    this.setState({tags})
    this.props.onChange && this.props.onChange(tags.join(this.props.separator))
  }

  render(){
    const {tags} = this.state

    return (
      <div className="tagger">
        <div className="tags">
          {
            tags.map((tag, i) => (
              <span key={i} className="tag">{tag}
                <span className="close" onClick={ e => this.removeTag(tag) }>&times;</span>
              </span>
            ))
          }
          <input type="text" onKeyDown={ e => {
            if (e.keyCode === 13 || e.keyCode === 9) {
              this.addTag(e.target.value)
              e.target.value = ''

            } else if (e.keyCode === 8 && this.isEmpty(e.target.value)){
              this.removeLastTag()
              e.target.value = ''
            }
          }}/>
        </div>

      </div>
    )
  }
}