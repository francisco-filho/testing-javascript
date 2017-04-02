import {request} from './lib'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Tagger from './components/Tagger'
import Select from './components/Select'
import Noticia from './components/Noticia'

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
    return(
      <div>
        <Select items={['primeiro', 'segundo','terceiro']} onChange={ v => console.log(v) }/>
        <h1>&nbsp;</h1>
        <h1>&nbsp;</h1>


        <Noticia
          title={"Use this exercise to solve any Product Design Challenge"}
          image={"https://cdn-images-1.medium.com/max/2000/1*MP8GoUaama8i1eH7t90bug.jpeg"}
          summary={'You can solve pretty much anything with this cheeky little exercise'}
          author={author} />

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