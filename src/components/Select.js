import React from 'react'
import ReactDOM from 'react-dom'
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
    this.state = { isOpen: false, selected: null}
    this.close = this.close.bind(this)
  }

  componentDidMount(){
    window.addEventListener('click', this.close, true)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  toggleOpen(){
    this.setState({isOpen: !this.state.isOpen})
  }

  close(e){
    const area = ReactDOM.findDOMNode(this.el)

    if (!area.contains(e.target))
      this.setState({isOpen: false})
  }

  select(item){
    if (item !== this.state.selected){
      this.setState({selected: item, isOpen: false})
      this.props.onChange && this.props.onChange(item)
    }
  }

  render(){
    const {items, iconClass} = this.props
    const {isOpen, selected} = this.state
    return (
      <div className={`select ${isOpen ? 'active' : ''}`} onClick={ e => {
        this.toggleOpen();
        e.stopPropagation()
      }} ref={el => this.el = el}>
        <SelectedValue selected={selected}/>
        {
          isOpen && <ul className="dropdown">
            {
              items.map((t,i) => {
                return <li key={i} onClick={ e => {
                  this.select(t)
                } }>
                  <a>
                    {typeof t === 'object' && t.iconClass && <i className={t.iconClass}/> }
                    {typeof t === 'string' ? t : t.label}
                  </a>
                </li>
              })
            }
          </ul>
        }
      </div>
    )
  }
}

const SelectedValue = ({selected}) => {
  return (
    typeof selected === 'string' ?
      <div className="label"><span>{selected}</span><i className="dropdown fa fa-chevron-down"/></div>
      :
      (selected != null) ?
      <div className="label"><span>
        {selected && selected.iconClass && <i className={selected.iconClass} />}
        {selected && selected.label}</span>
        <i className="dropdown fa fa-chevron-down"/>
      </div> :
        <div className="label"><span>Selecione</span><i className="dropdown fa fa-chevron-down"/></div>
  )
}