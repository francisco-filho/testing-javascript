import React from 'react'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import td from 'testdouble'

import Select from '../src/components/Select'
import {fireClick} from '../src/mocks'

describe('<Select/>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<Select/>)
  })

  it('Should Render a <div/>', () => {
    expect(wrapper.find('div.select')).to.have.length(1)
  })

  it('Should contain a label/div', () => {
    expect(wrapper.find('div.label')).to.have.length(1)
  })

  it('Should render a dropdown icon', () => {
    expect(wrapper.find('i.dropdown')).to.have.length(1)
  })

  it('Should toggle open state on click <open>', () => {
    const div = wrapper.find('div.select')
    div.simulate('click')

    expect(wrapper.state('isOpen')).to.be.true
  })

  it('Should toggle open state on click <off>', () => {
    const div = wrapper.find('div.select')
    div.simulate('click')
    div.simulate('click')

    expect(wrapper.state('isOpen')).to.be.false
  })

  it('Should show a dropdown when opened', () => {
    const div = wrapper.find('div.select')
    div.simulate('click')

    expect(div.find('ul.dropdown')).to.have.length(1)
  })

  it('Should list options passed as parameters', () => {
    const subject = mount(<Select items={['um', 'dois']}/>)
    const select = subject.find('div.select')

    select.simulate('click')

    expect(select.find('li')).to.have.length(2)
  })

  it('Should set the state with the selected item', () => {
    const subject = mount(<Select items={['primeiro', 'segundo']}/>)
    const select = subject.find('div.select')

    select.simulate('click')
    select.find('li').first().simulate('click')

    expect(subject.state('selected')).to.be.equal('primeiro')
  })

  it('Should show the selected item', () => {
    const subject = mount(<Select items={['primeiro', 'segundo']}/>)

    subject.find('div.select').simulate('click')
    subject.find('li').first().simulate('click')

    expect(subject.find('div.label').text()).to.contains('primeiro')
  })

  it('Should call a method onChange', () => {
    const calledOnChange = td.function()
    const subject = mount(<Select items={['primeiro', 'segundo']} onChange={ v => calledOnChange(v)} />)

    subject.find('div.select').simulate('click')
    subject.find('li').first().simulate('click')

    td.verify(calledOnChange('primeiro'))
  })

  it('Should close menu when click outside', () => {
    const subject = mount(<Select items={['primeiro', 'segundo']} onChange={ v => calledOnChange(v)} />)
    subject.find('div.select').simulate('click')

    fireClick(window)

    expect(subject.state('isOpen')).to.be.false
  })

  it('Should mark .select as active', () => {
    wrapper.find('div.select').simulate('click')

    expect(wrapper.find('div.select.active')).to.have.length(1)
  })
})
