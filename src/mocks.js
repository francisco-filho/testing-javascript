import td from 'testdouble'
import * as lib from './lib'

const fakePost = function fakePost( module, fn, data){
  td.replace(module, fn, (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data[url])
      }, 0)
    })
  })
}

const fakePostRequest = (data) => {
  td.replace(lib, 'request', (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data[url])
      }, 0)
    })
  })
}


const fireClick = (node) => {
  const clickevent=document.createEvent("MouseEvents");
  clickevent.initEvent("click", true, true);
  node.dispatchEvent(clickevent)
}

export { fireClick, fakePost, fakePostRequest }