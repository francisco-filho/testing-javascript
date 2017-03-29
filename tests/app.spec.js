import chai, { expect } from'chai'
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
import {fakePostRequest} from '../src/mocks'

fakePostRequest({
  '/home/findAll': [1,2,3,4],
  '/home/findOne': 1
})

import {doIt} from '../src/app'

describe('my test', () => {
  it('test one', () => {
    return expect(doIt('/home/findOne')).to.become(1)
  })

  it('test all', () => {
    return doIt('/home/findAll').then((res) => {
      expect(res).to.be.eql([1,2,3,4])
    }).catch()
  })

  it('not done yet!!!')
})