import React from 'react'
import './Select.css'

export default class Select extends React.Component {
  static get defaultProps(){
    return {
      items: []
    }
  }

  static get propTypes(){
    return {
      items: React.PropTypes.array,
      onChange: React.PropTypes.func
    }
  }

  constructor(props){
    super(props)
    this.state = { open: false, selected: null}
  }

  toggleOpen(){
    this.setState({open: !this.state.open})
  }

  select(item){
    if (item !== this.state.selected){
      this.setState({selected: item})
      this.props.onChange && this.props.onChange(item)
    }
  }

  render(){
    const {items} = this.props
    const {selected} = this.state

    return (
      <div className="select" onClick={ e => { this.toggleOpen() }}>
        <div className="label">{ selected ? selected : 'Selecione' }
          <i className="dropdown fa fa-chevron-down"/>
        </div>
        {
          this.state.open && <ul className="dropdown">
            {
              items.map((t,i) => {
                return <li key={i} onClick={ e => this.select(t) }><a>{t}</a></li>
              })
            }
          </ul>
        }
      </div>
    )
  }
}