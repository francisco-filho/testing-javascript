import React from 'react'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import Tagger from '../src/components/Tagger'

describe('<Tagger/>', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(<Tagger />)
  })

  afterEach(() => {
    wrapper = null
  })

  it('Should Render a input', () => {
    expect(wrapper.find('input')).to.have.length(1)
  })

  it('Should add tag', () => {
    wrapper.instance().addTag('tags')

    expect(wrapper.state('tags')).to.be.eql(['tags'])
  })

  it('Should add more than one tag', () => {
    wrapper.instance().addTag('#hash')
    wrapper.instance().addTag('#react')

    expect(wrapper.state('tags')).to.be.eql(['#hash', '#react'])
  })


  it('Should not add duplicate tags', () => {
    wrapper.instance().addTag('#react')
    wrapper.instance().addTag('#react')

    expect(wrapper.state('tags')).to.be.eql(['#react'])
  })

  it('Should remove a tag', () => {
    wrapper.instance().addTag('#hash')
    wrapper.instance().addTag('#react')

    wrapper.instance().removeTag('#hash')

    expect(wrapper.state('tags')).to.be.eql(['#react'])
  })

  it('Should render tags as spans', () => {
    wrapper.instance().addTag('my tag')
    wrapper.instance().addTag('done')

    expect(wrapper.find('span')).to.have.length(4)
  })

  it('Should receive tags as props', () => {
    const wrapper = mount(<Tagger tags={['one', 'two']}/>)

    expect(wrapper.state('tags')).to.have.length(2)
  })

  it('Should add tag on press enter inside the input', ()=> {
    const input = wrapper.find('input')
    input.node.value = 'new'
    input.simulate('keyDown', { keyCode: 13 })

    input.node.value = 'wrong'
    input.simulate('keyDown', { keyCode: 27 })

    expect(wrapper.state('tags')).to.be.eql(['new'])
  })

  it('Should not add Empty values', () => {
    wrapper.instance().addTag(null)
    wrapper.instance().addTag(undefined)
    wrapper.instance().addTag("")
    wrapper.instance().addTag(" ")
    wrapper.instance().addTag("           ")

    expect(wrapper.state('tags')).to.be.eql([])
  })

  it('Should remove the tag on closing it', () => {
    const wrapper = mount(<Tagger tags={['new']}/>)

    const close = wrapper.find('span.tag').find('.close')
    close.simulate('click', { target: close})

    expect(wrapper.state('tags')).to.be.eql([])
  })

  it('Should clear input after add', ()=> {
    const input = wrapper.find('input')
    input.node.value = 'new'
    input.simulate('keyDown', { keyCode: 13 })

    expect(wrapper.state('tags')).to.be.eql(['new'])
    expect(input.node.value).to.be.equal('')
  })

  it('Should remove last tag with Backspace if input empty ', () => {
    const input = wrapper.find('input')
    input.node.value = 'new'
    input.simulate('keyDown', { keyCode: 13 })
    input.simulate('keyDown', { keyCode: 8 })

    expect(wrapper.state('tags')).to.be.eql([])
    expect(input.node.value).to.be.equal('')
  })

  it('Should NOT remove last tag with Backspace if input is NOT empty ', () => {
    const input = wrapper.find('input')
    input.node.value = 'new'
    input.simulate('keyDown', { keyCode: 13 })
    input.node.value = 'new2'
    input.simulate('keyDown', { keyCode: 8 })

    expect(wrapper.state('tags')).to.be.eql(['new'])
  })

  it('Should call OnChange when updating the state', () => {
    let state = null
    const wrapper = mount(<Tagger onChange={ (t) => state = t }/>)

    wrapper.instance().addTag('angular')

    expect(state).to.be.eql(['angular'])
  })
})
