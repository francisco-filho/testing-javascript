import {request} from './lib'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Tagger from './components/Tagger'
import Select from './components/Select'
import Noticia from './components/Noticia'

import DataGrid from './components/DataGrid'

class Button extends Component {
  render(){
    return <a onClick={ e => alert(this.props.name ) }>Save {this.props.id}</a>
  }
}

class Check extends Component {
  render(){
    return <span>{ this.props.teen && <i className="fa fa-check"/> }</span>
  }
}


class App extends Component {
  render(){
    let data = null, columns = null
    const newsCountArray = [0, 1, 2, 3, 4, 5]
    const records = [[1, 'First'],[2,'Second'],[3,'Third'],[4,'Forty']]

    data = [[1, 'julia', false], [2, 'joao', false], [3, 'fernando', true], [4, 'vany', true], [5, 'francisco', true]]
    columns = [
      { name: 'id', className: 'integer', label: 'Id'},
      { name: 'name', label: 'My Name', className: 'text'},
      { name: 'teen', label: 'Teenager', component: Check, className: 'icon'},
      { name: 'actions', label: 'Actions', component: Button, className: 'action', sort: false }]
    return(
      <div className="content">
        <DataGrid
          columns={columns}
          data={data}
          filter={['id', 'name']}
          paginate pageSize={4}
          defaultSort={'name'}/>
        {/*<DataGrid records={records}

        >
          <Column title="id" sort={true}/>
          <Column title="name"/>
          <ActionColumn title="..." actions={['add', 'remove']}/>
        </DataGrid>*/}
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        <Select items={[{label: 'One', value: 1, iconClass: 'fa fa-check'},
          {label: 'Two', value: 2, iconClass: 'fa fa-calendar'},'terceiro','quarto', 'quinto']} onChange={ v => console.log(v) }/>
        <h1>&nbsp;</h1>
        <h1>&nbsp;</h1>
        <Select items={[
        {label: 'One', value: 1, iconClass: 'fa fa-close'},
        {label: 'Two', value: 2, iconClass: 'fa fa-calendar'}]}
        />

        {/*<div className="f">
          <Noticia
                   title={"Use this exercise to solve any Product Design Challenge"}
                   image={"https://cdn-images-1.medium.com/max/2000/1*MP8GoUaama8i1eH7t90bug.jpeg"}
                   summary={'You can solve pretty much anything with this cheeky little exercise'}
                   author={author} />
          {

            newsCountArray.map((n, i) => {
              return <Noticia key={i}
                title={"Use this exercise to solve any Product Design Challenge"}
                image={"https://cdn-images-1.medium.com/max/2000/1*MP8GoUaama8i1eH7t90bug.jpeg"}
                author={author} />
            })
          }

        </div>*/}

        <h1>&nbsp;</h1>
        <h1>&nbsp;</h1>
        <h1> Taggers </h1>

      <Tagger tags={'one, two'} onChange={ (t) => console.log(t)}/>
      </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById("components"))