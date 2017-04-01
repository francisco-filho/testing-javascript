import React from 'react'

export default class Select extends React.Component {
  static get defaultProps(){
    return {
      items: []
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
    this.setState({selected: item})
  }

  render(){
    const { items } = this.props

    return (
      <div className="select" onClick={ e => {
        this.toggleOpen()
      }}>
        <div className="label">{
          this.state.selected ? this.state.selected : 'Selecione...'
        }
          <i className="dropdown fa fa-dropdown"/>&#x25BC;</div>

        {
          this.state.open && <ul className="dropdown">
            {
              items.map((t,i) => {
                return <li key={i} onClick={ e => this.select(t) }>{t}</li>
              })
            }
          </ul>
        }
      </div>
    )
  }
}