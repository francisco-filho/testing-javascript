import {request} from './lib'

export const doIt = (url, data) => {
  return request(url, data).then(data => {
    return data;
  })
}

