import 'whatwg-fetch'

function request(url, data){
  return fetch(url).then(data => {
    return data;
  })
}

export { request }