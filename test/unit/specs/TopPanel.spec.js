import { mount } from '@vue/test-utils'
import TopPanel from '@/components/Shared/TopPanel'

describe('TopPanel component', () => {
  const wrapper = mount(TopPanel)

  it('anchor elements', () => {
    expect(wrapper.findAll('a').length).toEqual(5)
  })

  it('img source', () => {
    expect(wrapper.find('img').attributes('src')).toEqual('/static/logo.png')
  })

  it('click links', () => {
    window.alert = jest.fn()
    const links = wrapper.find('.links')
    links.trigger('click')
    expect(window.alert).toBeCalled()
  })
})
