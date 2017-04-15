import React, { Component } from 'react'
import {shallow, mount} from 'enzyme'
import {expect} from 'chai'
import DataGrid from '../src/components/DataGrid'

function columnIdContent(tr, first, last){
  expect(tr.first().find('td').first().text()).to.be.equal(first)
  expect(tr.last().find('td').first().text()).to.be.equal(last)
}

function columnNameContent(tr, first, last){
  expect(tr.first().find('td').last().text()).to.be.equal(first)
  expect(tr.last().find('td').last().text()).to.be.equal(last)
}

describe('<DataGrid/>', () => {

  let columns = [], data = [], grid = null

  beforeEach(()=> {
    columns = [{name: 'id'}, {name: 'name'}]
    data  = [[1,'julia'], [2,'joao'], [3, 'fernando']]
    grid = mount(<DataGrid columns={columns} data={data} defaultSort={'name'}/>)
  })

  it('Should render two th"s', () => {
    expect(grid.find('th')).to.have.length(2)
  })

  it('Should render two th"s with text [id, name]', () => {
    const th = grid.find('th')

    expect(th.first().text()).to.be.equal('id')
    expect(th.last().text()).to.be.equal('name')
  })

  it('Should render a tbody with rows', () => {
    const tbody = grid.find('tbody')

    expect(tbody.find('tr')).to.have.length(3)
  })

  it('Should sort data by the column "name"', () => {
    grid = mount(<DataGrid columns={columns} data={data}/>)

    grid.instance().sortBy('name')
    const tr = grid.find('tbody').find('tr')

    columnIdContent(tr, '3', '1')
  })

  it('Should sort in reverse order if columns is already sorted', () => {
    grid = mount(<DataGrid columns={columns} data={data}/>)
    grid.instance().sortBy('name')
    grid.instance().sortBy('name')

    const tr = grid.find('tbody').find('tr')

    columnIdContent(tr, '1', '3')
  })

  it('Should sort ascending when sorted by another column before', () => {
    grid.instance().sortBy('name')
    grid.instance().sortBy('id')

    const tr = grid.find('tbody').find('tr')

    columnIdContent(tr, '1', '3')
  })

  it('Should be sorted by default by "name"', ()=> {
    const tr = grid.find('tbody').find('tr')

    columnIdContent(tr, '3', '1')
    columnNameContent(tr, 'fernando', 'julia')
  })

  it('Should sort when click in "th"', ()=> {
    grid.find('th').first().simulate('click')

    columnIdContent(grid.find('tbody').find('tr'), '1', '3')
  })

  it('Should sort in reverse order when click three times in "th"', () => {
    grid.find('th').first().simulate('click')
    grid.find('th').first().simulate('click')
    grid.find('th').first().simulate('click')

    columnIdContent(grid.find('tbody').find('tr'), '1', '3')
  })
})