import { mount } from '@vue/test-utils'
import DataTable from '@/components/DataTable/DataTable'

describe('DataTable component', () => {
  const wrapper = mount(DataTable)

  it('emit search event', () => {
    wrapper.vm.$emit('search', '123')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('emit changeStatus event', () => {
    wrapper.vm.$emit('changeStatus', 'processed')
    expect(wrapper.emitted('changeStatus')).toBeTruthy()
  })

  it('emit exportToXLS event', () => {
    wrapper.vm.$emit('exportToXLS')
    expect(wrapper.emitted('exportToXLS')).toBeTruthy()
  })

  it('filter elements', () => {
    expect(wrapper.findAll('.filter').length).toEqual(6)
  })

  it('select all payments', () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    const firstCheckBox = checkboxes.at(0)
    firstCheckBox.trigger('click')
    expect(wrapper.vm.isAllPaymentsChecked).toBe(true)
  })
})
