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

  it('Should accept items in the format [value1, value2]', () => {
    const items = ['One', 'Two']
    const wrapper = mount(<Select items={items}/>)

    wrapper.simulate('click')

    expect(wrapper.find('a').first().text()).to.contains('One')
  })

  it('Should accept items in the format {label: "one", value: 1}', () => {
    const items = [{label: 'One', value: 1}, {label: 'Two', value: 2}]
    const wrapper = mount(<Select items={items}/>)

    wrapper.simulate('click')

    expect(wrapper.find('a').first().text()).to.contains('One')
  })

  it('Should render a icon if iconClass is passed as props', () => {
    const items = [
      {label: 'One', value: 1, iconClass: 'fa fa-check'},
      {label: 'Two', value: 2, iconClass: 'fa fa-calendar'}]
    const select = mount(<Select items={items}/>)

    select.simulate('click')

    expect(
      select.find('a').first().find('.fa-check').first()
    ).to.have.length(1)

    expect(
      select.find('a').at(1).find('i.fa-calendar')
    ).to.have.length(1)
  })

  it('Should show icon in selected value', () => {
    const items = [
      {label: 'One', value: 1, iconClass: 'fa fa-check'},
      {label: 'Two', value: 2, iconClass: 'fa fa-calendar'}]
    const select = mount(<Select items={items}/>)

    select.simulate('click')
    select.find('a').first().simulate('click')

    expect(
      select.find('.fa-check').first()
    ).to.have.length(1)
  })
})
