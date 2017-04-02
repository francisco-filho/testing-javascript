import React from 'react'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import Noticia from '../src/components/Noticia'

describe('<Noticia/>', () => {
  let author,
    wrapper

  beforeEach(() => {
    author = {
      code: 'A9832BF',
      name: 'Francisco Filho',
      avatar: 'http://',
      date: new Date()
    }
    wrapper = mount(<Noticia
      title={"My First News"}
      image={"http://"}
      author={author} />)
  })

  afterEach(() => {
    author = null
    wrapper = null
  })

  it('Should render img, h2, div', () => {
    expect(wrapper.find('img.main')).to.have.length(1)
    expect(wrapper.find('h2')).to.have.length(1)
    expect(wrapper.find('div.author')).to.have.length(1)
  })

  it('Should render a title "My First News"', () => {
    expect(wrapper.find('h2').first().text()).to.contains("First News")
  })

  it('Should render the author name', () => {
    expect(wrapper.find('.author .name').first().text()).to.contains("Francisco Filho")
  })

  it('Should render the author avatar', () => {
    expect(wrapper.find('.author img').first().node.src).to.be.equal("http://")
  })

  it('Should render the author avatar', () => {
    expect(wrapper.find('.author img').first().node.src).to.be.equal("http://")
  })

  it('Should render the news date', ()=> {
    expect(wrapper.find(".author .date")).to.have.length(1)
  })

  it('Should render summary if passed as props', () => {
    wrapper = mount(<Noticia
      title={"My First News"}
      image={"http://"}
      summary={'My first summary news'}
      author={author} />)

    expect(wrapper.find('p')).to.have.length(1)
  })

  it('Should NOT render summary if NOT passed as props', () => {
    wrapper = mount(<Noticia
      title={"My First News"}
      image={"http://"}
      author={author} />)

    expect(wrapper.find('p')).to.have.length(0)
  })
})
