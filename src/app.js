import {request} from './lib'

export const doIt = (url, data) => {
  return request(url, data).then(data => {
    return data;
  })
}

get('/comunicados/index').then(usuario => {

});

Object index(Request req){
  return req.usuario;
}

