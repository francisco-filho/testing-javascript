import React, {Component} from 'react'

export default class DataGrid extends Component {
  static get defaultProps(){
    return {
      columns: [],
      data: [],
      defaultSort: null
    }
  }

  constructor(){
    super()
    this.state = {data: [], sortedBy: -1, reversed: false}
  }

  componentDidMount(){
    const { defaultSort, data } = this.props
    if (defaultSort  != null){
      const sorted = this.sort(data, defaultSort)
      this.setState({data: sorted.data, sortedBy: sorted.sortedBy })
    }
    else
      this.setState({data})
  }

  sort(data, columnName){
    const {sortedBy, reversed } = this.state
    const colIndex = this.props.columns.findIndex((c)=> c.name === columnName)
    let isReversed = colIndex === sortedBy && reversed

    const sorted = data.sort((f, l) => {
      return sortedBy !== colIndex ?
        f[colIndex] > l[colIndex] :
        isReversed ? f[colIndex] > l[colIndex] : f[colIndex] < l[colIndex]
    })

    if (colIndex === sortedBy)
      isReversed = !isReversed

    return {data: sorted, sortedBy: colIndex, reversed: isReversed}
  }

  sortBy(columnName){
    const {data} = this.state
    const sorted = this.sort(data, columnName)
    this.setState({data: sorted.data, sortedBy: sorted.sortedBy, reversed: sorted.reversed})
  }

  render(){
    const { columns } = this.props
    const { data } = this.state
    return (
      <table>
        <thead>
        <tr>
        {
          columns.map((th, i) => {
            return <th key={i} onClick={ e => {
              this.sortBy(th.name)
              e.preventDefault()
              e.stopPropagation()
            }}>{ th.name }</th>
          })
        }</tr>
        </thead>
        <tbody>
        {
          data.map((tr,i) => {
            return <tr key={tr.id}>
              {
                columns.map((td,y) => {
                  return <td key={y}>{tr[y]}</td>
                })
              }
            </tr>
          })
        }
        </tbody>
      </table>
    )
  }
}