import React from 'react'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import Tagger from '../src/components/Tagger'

describe('<Tagger/>', () => {
  it('Should Render a input', () => {
    const wrapper = shallow(<Tagger/>)

    expect(wrapper.find('input')).to.have.length(1)
  })

  it('Should add tag', () => {
    const wrapper = mount(<Tagger/>)

    wrapper.instance().addTag('tags')

    expect(wrapper.state('tags')).to.be.eql(['tags'])
  })

  it('Should add more than one tag', () => {
    const wrapper = mount(<Tagger/>)

    wrapper.instance().addTag('#hash')
    wrapper.instance().addTag('#react')

    expect(wrapper.state('tags')).to.be.eql(['#hash', '#react'])
  })


  it('Should not add duplicate tags', () => {
    const wrapper = mount(<Tagger/>)

    wrapper.instance().addTag('#react')
    wrapper.instance().addTag('#react')

    expect(wrapper.state('tags')).to.be.eql(['#react'])
  })

  it('Should remove a tag', () => {
    const wrapper = mount(<Tagger/>)

    wrapper.instance().addTag('#hash')
    wrapper.instance().addTag('#react')

    wrapper.instance().removeTag('#hash')

    expect(wrapper.state('tags')).to.be.eql(['#react'])
  })

  it('Should render tags as spans', () => {
    const wrapper = shallow(<Tagger/>)

    wrapper.instance().addTag('my tag')
    wrapper.instance().addTag('done')

    expect(wrapper.find('span')).to.have.length(2)
  })

  it('Should receive tags as props', () => {
    const wrapper = mount(<Tagger tags={['one', 'two']}/>)

    expect(wrapper.state('tags')).to.have.length(2)
  })

  it('Should add tag on press enter inside the input', ()=> {
    const wrapper = mount(<Tagger/>)

    const input = wrapper.find('input')
    input.node.value = 'new'
    input.simulate('keyPress', { keyCode: 'Enter' })

    expect(wrapper.state('tags')).to.be.eql(['new'])
  })

  it('Should not add Empty values', () => {
    const wrapper = mount(<Tagger/>)

    wrapper.instance().addTag("")
    wrapper.instance().addTag(" ")

    expect(wrapper.state('tags')).to.be.eql([])
  })

})
