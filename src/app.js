import {request} from './lib'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Tagger from './components/Tagger'
import Select from './components/Select'
import Noticia from './components/Noticia'

import DataGrid from './components/DataGrid'
import {Column} from './components/DataGrid'

const author = {
  code: 'A9832BF',
  name: 'Francisco Filho',
  avatar: 'https://cdn-images-1.medium.com/fit/c/36/36/0*MVpOkSIb-r3yuF-K.jpg',
  date: new Date()
}

export const doIt = (url, data) => {
  return request(url, data).then(data => {
    return data;
  })
}

class App extends Component {
  render(){
    console.log(1)
    const newsCountArray = [0, 1, 2, 3, 4, 5]
    const records = [[1, 'First'],[2,'Second'],[3,'Third'],[4,'Forty']]
    return(
      <div>
        <DataGrid records={records}
          /*onRowClick={} onActionClick={ (action, row) => {}}*/
        >
          <Column title="id" sort={true}/>
          <Column title="name"/>
          {/*<ActionColumn title="..." actions={['add', 'remove']}/>*/}
        </DataGrid>

        <hr/>
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

      <Tagger tags={['one', 'two']} onChange={ (t) => console.log(t)}/>
      <Tagger tags={['one', 'two']} onChange={ (t) => console.log(t)}/>
      </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById("components"))