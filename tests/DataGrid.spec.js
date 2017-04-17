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

class Button extends Component {
  render(){
    return <a onClick={ e => alert(this.props.name ) }>Save {this.props.id}</a>
  }
}

class Check extends Component {
  render(){
    return <span>{ this.props.teen && <i className="fa fa-check"/> }</span>
  }
}

describe('<DataGrid/>', () => {

  let columns = [], data = [], grid = null

  describe('Filter', () => {
    let filter = null

    beforeEach(() => {
      columns = [{name: 'id'}, {name: 'name'}]
      data = [[1, 'one'], [2, 'two1'], [3, 'three'], [4, 'four'],[5, 'five']]
      grid = mount(<DataGrid columns={columns} data={data} filter={['id', 'name']}/>)
      filter = grid.find('.filter')
    })

    it('Should render a input[text]', () => {
      expect(filter.find('input[type="text"]')).to.have.length(1)
    })

    it('Should filter by name when enter a text in the inputbox', () => {
      const input = filter.find('input')
      input.node.value = 'o'
      input.simulate('change', input)
      input.simulate('keyDown', { keyCode: 13, target: { value: 'o'}})

      expect(grid.find('tbody').find('tr')).to.have.length(3)
    })

    it('Should remove the filter when click "x"', () => {
      const x = filter.find('.close')
      x.simulate('click')
      expect(grid.find('tbody').find('tr')).to.have.length(5)
    })

    it('Should remove the filter when press ENTER on empty input', () => {
      const input = filter.find('input')
      input.node.value = 'o'
      input.simulate('change', input)
      input.simulate('keyDown', { keyCode: 13})

      input.node.value = ''
      input.simulate('change', input)
      input.simulate('keyDown', { keyCode: 13})

      expect(grid.find('tbody').find('tr')).to.have.length(5)
    })

    it('Should remove the filter when click on "filter" button', () => {
      const input = filter.find('input')
      input.node.value = 'o'
      input.simulate('change', input)

      filter.find('.apply-filter').simulate('click')

      expect(grid.find('tbody').find('tr')).to.have.length(3)
    })

    it('Should filter by the letter "o"', () => {
      const input = filter.find('input')
      input.node.value = 'o'
      input.simulate('change', input)
      input.simulate('keyDown', { keyCode: 13 })

      expect(grid.find('tbody').find('tr')).to.have.length(3)
      expect(grid.find('tbody').find('tr').find('td').first().text()).to.be.equal('1')
      expect(grid.find('tbody').find('tr').last().find('td').first().text()).to.be.equal('4')
    })
  })

  describe('Paginator', () => {
    let paginator = null

    beforeEach(() => {
      columns = [{name: 'id'}, {name: 'name'}]
      data = [[1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'],[5, 'five']]
      grid = mount(<DataGrid columns={columns} data={data} paginate pageSize={2}/>)
      paginator = grid.find('.paginator')
    })

    it('Should render only 2 rows in the first page', () => {
      expect(grid.find('tbody').find('tr')).to.have.length(2)
    })

    it('Should render only 2 rows in the second page', () => {
      grid.instance().setPage(2)
      expect(grid.find('tbody').find('tr')).to.have.length(2)
    })

    it('Should render only 1 row in the third page', () => {
      grid.instance().setPage(3)
      expect(grid.find('tbody').find('tr')).to.have.length(1)
    })

    it('Should render a paginator component', () => {
      expect(grid.find('.paginator')).to.have.length(1)
    })

    it('Should render previous/next indicators', () => {
      expect(paginator.find('span.first')).to.have.length(1)
      expect(paginator.find('span.previous')).to.have.length(1)
      expect(paginator.find('span.next')).to.have.length(1)
      expect(paginator.find('span.last')).to.have.length(1)
    })

    it('Should render text "1 de 3"', () => {
      expect(paginator.find('span.status').text()).to.be.equal('1 de 3')
    })

    it('Should mark page 3 as active', () => {
      grid.instance().setPage(3)
      expect(paginator.find('span.status').text()).to.be.equal('3 de 3')
    })

    it('Should change page on click the "next" indicator', () => {
      paginator.find('.next').simulate('click')
      expect(paginator.find('span.status').text()).to.be.equal('2 de 3')
    })

    it('Should change page on click the "last" indicator', () => {
      paginator.find('.last').simulate('click')
      expect(paginator.find('span.status').text()).to.be.equal('3 de 3')
    })

    it('Should change page on click the "previous" indicator', () => {
      paginator.find('.last').simulate('click')
      paginator.find('.previous').simulate('click')
      expect(paginator.find('span.status').text()).to.be.equal('2 de 3')
    })

    it('Should change page on click the "first" indicator', () => {
      paginator.find('.last').simulate('click')
      paginator.find('.first').simulate('click')
      expect(paginator.find('span.status').text()).to.be.equal('1 de 3')
    })

    it('Should disable first/previous indicator when in the first page', () => {
      expect(paginator.find(".first.disabled")).to.have.length(1)
      expect(paginator.find(".previous.disabled")).to.have.length(1)
    })

    it('Should disable last/next indicator when in the last page', () => {
      paginator.find('.last').simulate('click')
      expect(paginator.find(".next.disabled")).to.have.length(1)
      expect(paginator.find(".last.disabled")).to.have.length(1)
    })
  })

  describe('Sub-components', () => {
    beforeEach(() => {
      columns = [{name: 'id'}, {name: 'name'}, { name: 'teen', component: Check}, {name: 'actions', component: Button}]
      data = [[1, 'julia', false], [2, 'joao', false], [3, 'fernando', true]]
      grid = mount(<DataGrid columns={columns} data={data} defaultSort={'id'}/>)
    })

    it('Should render a button Component in column', () => {
      const tr = grid.find('tbody').find('tr').first()

      expect(tr.find('a')).to.have.length(1)
      expect(tr.find('a').text()).to.not.be.undefined
    })

    it('Should render button with the text "Save {id}"', () => {
      const btn = grid.find('tbody').find('a').first()

      expect(btn.text()).to.be.equal('Save 1')
    })

    it('Should render a icon if value of "teen" is true', () => {
      const spanFalse = grid.find('tbody').find('span').first()
      const spanTrue = grid.find('tbody').find('span').last()

      expect(spanTrue.html()).to.contains("fa fa-check")
      expect(spanFalse.html()).to.not.contains("fa fa-check")
    })
  })

  describe('Data & Sort', () => {
    beforeEach(()=> {
      columns = [{name: 'id'}, {name: 'name', label: 'My Name'}]
      data  = [[1,'julia'], [2,'joao'], [3, 'fernando']]
      grid = mount(<DataGrid columns={columns} data={data} defaultSort={'name'}/>)
    })

    it('Should render 2 th"s', () => {
      expect(grid.find('th')).to.have.length(2)
    })

    it('Should use "label" property when defined', () => {
      const th = grid.find('th')

      expect(th.first().text()).to.be.equal('id')
      expect(th.last().text()).to.be.equal('My Name')
    })

    it('Should render 2 th"s with text [id, name]', () => {
      const th = grid.find('th')

      expect(th.first().text()).to.be.equal('id')
      expect(th.last().text()).to.be.equal('My Name')
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

    it('Should sort in reverse order when click 3 times in "th"', () => {
      grid.find('th').first().simulate('click')
      grid.find('th').first().simulate('click')
      grid.find('th').first().simulate('click')

      columnIdContent(grid.find('tbody').find('tr'), '1', '3')
    })

    it('Should add class .sort if th is sorted', () => {
      grid.find('th').first().simulate('click')

      expect(grid.find('th').first().find('.sort')).to.have.length(1)
    })

    it('Should add class .desc if th is sorted descendent', () => {
      grid.find('th').first().simulate('click')
      grid.find('th').first().simulate('click')

      expect(grid.find('th').first().find('.sort.desc')).to.have.length(1)
    })


  })
})