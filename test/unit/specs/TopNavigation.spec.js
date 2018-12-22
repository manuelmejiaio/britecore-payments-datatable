import { mount } from '@vue/test-utils'
import TopNavigation from '@/components/DataTable/TopNavigation'

describe('TopPanel component', () => {
  const wrapper = mount(TopNavigation)

  it('has a search', () => {
    expect(wrapper.contains('.search-container input')).toBe(true)
  })

  wrapper.setProps({ actionAvailable: true })
  it('has a select', () => {
    expect(wrapper.contains('option')).toBe(true)
  })

  it('has a download xls button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
