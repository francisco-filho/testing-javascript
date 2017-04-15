import React from 'react'
import {expect} from 'chai'
import {mount, shallow} from "enzyme";

import DataGrid from '../src/components/DataGrid'
import { Column } from '../src/components/DataGrid'

describe('DataGrid', () => {

  describe('Grid', () => {
    it('Should render a empty table', () => {
      const grid = shallow(<DataGrid/>)

      expect(grid.find('table.data-grid')).to.have.length(1)
    })

    it('Should render a empty <thead/>', () => {
      const grid = shallow(<DataGrid />)

      expect(grid.find('thead')).to.have.length(1)
    })

    it('Should render 2 th"s', () => {
      const grid = mount(<DataGrid>
        <Column title="id"/>
        <Column title="name"/>
      </DataGrid>)

      expect(grid.find('.data-grid th')).to.have.length(2)
    })

    describe('Records', ()=> {
      let grid,
          records
      beforeEach(()=> {
        records = [[1, 'first'], [2, 'second'], [3, 'third'], [4,'fourty']]
        grid = mount(<DataGrid records={records}>
          <Column title="id"/>
          <Column title="name"/>
        </DataGrid>)
      })

      it('Should render tds when passing records as props', () => {
        const tr = grid.find('tbody').find('tr')
        const tds = tr.first().find('td')

        expect(tr).to.have.length(4)
        expect(tds).to.have.length(2)
      })

      it('Should render record [1, first] as the first data row', () => {
        const firstTr = grid.find('.record').first()

        expect(
          firstTr.find('td').last().text().toLowerCase()
        ).to.be.equal('first')
      })

      it('Should sort when click on thead', () => {
        const th = grid.find('thead').first().find('th').last()
        th.simulate('click')

        expect(
          grid.find('tbody').childAt(1).find('td').first().text()
        ).to.be.equal('4')
      })

      it('Should come sorted ascending with the first column by default', () => {
        expect(grid.state('sortedBy')).to.be.equal(0)
        expect(grid.state('sortOrder')).to.be.equal('asc')
      })

      it('Should reverse the order of the first column', () => {
        grid.find('thead').first().find('th').first().simulate('click')

        expect(
          grid.find('tbody').childAt(0).find('td').first().text()
        ).to.be.equal('4')
      })

      it('Should return to initial state when clicked two times', () => {
        grid.find('thead').first().find('th').first()
          .simulate('click')
          .simulate('click')

        expect(
          grid.find('tbody').childAt(0).find('td').first().text()
        ).to.be.equal('1')
      })

      it('Should sort ascending when select other column', () => {
        grid.find('thead').first().find('th').last().simulate('click')
        grid.find('thead').first().find('th').first().simulate('click')

        expect(
          grid.find('tbody').childAt(1).find('td').first().text()
        ).to.be.equal('2')
      })

      it('Should not sort by first column if Column.props.sort=false', () => {
        grid = mount(<DataGrid records={records}>
          <Column title="id" sort={false}/>
          <Column title="name"/>
        </DataGrid>)

        grid.find('thead').first().find('th').first().simulate('click')

        expect(
          grid.find('tbody').childAt(0).find('td').first().text()
        ).to.be.equal('1')
      })
    })
  })

  describe('Column', () => {
    it('Should render a <span>', ()=> {
      const col = shallow(<Column />)

      expect(col.find('span')).to.have.length(1)
    })

    it('Should render its children <numeric>', () => {
      const col = mount(<Column>1</Column>)

      expect(col.find('span').first().text()).to.contains(1)
    })

    it('Should render its children <string>', () => {
      const col = shallow(<Column>name</Column>)

      expect(col.find('span').first().text()).to.contains('name')
    })

    it('Should render its title if has not children', ()=> {
      const col = shallow(<Column title="my-title">1</Column>)

      expect(col.find('span').first().text()).to.contains('my-title')
    })
  })
})
