import React from 'react'

export default class DataGrid extends React.Component {
  static get defaultProps(){
    return {
      records: []
    }
  }
  constructor(props){
    super(props)
    this.state = { records: [], sortedBy: 0, sortOrder: 'asc'}
  }

  componentDidMount(){
    this.setState({records: this.props.records})
  }

  render(){
    const { records, sortedBy, sortOrder } = this.state

    return (
      <table className="data-grid">
      <thead>
        <tr>
          {
            this.props.children && this.props.children.map((col, colIdx) => {
              return <th key={colIdx} onClick={ e => {
                if (!col.props.sort) return;
                const isSorted = sortedBy === colIdx

                const newOrder = sortOrder === 'asc' && isSorted ?
                  'desc' :
                  'asc'

                const result = [...records].sort((a,b) => {
                  return (sortedBy >= 0 && isSorted) ?
                    (newOrder == 'desc' ? a[colIdx] < b[colIdx] : a[colIdx] > b[colIdx]) :
                    a[colIdx] > b[colIdx]
                })
                //console.log(newOrder, sortedBy, colIdx)
                this.setState({records: result, sortedBy: parseInt(colIdx), sortOrder: newOrder})
              }}
              >{col}
              <SortIndicator sorted={sortedBy === colIdx} direction={sortOrder}/></th>
            })
          }
        </tr>
      </thead>
      <tbody>
      {
        records.map((r, ri) => {
          return <tr className="record" key={ri}>
            {
              this.props.children.map((c,i) => {
                return <td key={i}>{
                  c.props.children ?
                    c.props.children :
                    React.createElement(Column, {...c.props, title: null}, r[i])
                }</td>
              })
            }
          </tr>
        })
      }
      </tbody>
    </table>)
  }
}

class Column extends React.Component {
  static get propTypes(){
    return {
      title: React.PropTypes.string,
      type: React.PropTypes.string,
      sort: React.PropTypes.bool
    }
  }

  static get defaultProps(){
    return {
      sort: true
    }
  }

  render(){
    const {type, title} = this.props

    const color = {
      color: type && type === 'int' ? 'blue' : 'black',
      fontWeight: type && type === 'int' ? 'bold' : 'normal',
    }

    return (
      <span>{ title ? title : this.props.children }</span>
    )
  }
}

const SortIndicator = ({sorted, direction}) => {
  return (
    sorted && <i
      className={`sort-indicator fa ${direction === 'asc' ? 'fa-chevron-down' : 'fa-chevron-up'}`}/>
  )
}

export {Column}