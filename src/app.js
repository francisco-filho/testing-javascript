import {request} from './lib'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Tagger from './components/Tagger'

export const doIt = (url, data) => {
  return request(url, data).then(data => {
    return data;
  })
}

class App extends Component {
  render(){
    return <Tagger tags={['one', 'two']}/>
  }
}

ReactDOM.render(<App/>, document.getElementById("components"))