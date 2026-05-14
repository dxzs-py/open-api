import container from './base/container'
import header from './base/header'
import leftNavigation from './base/left_navigation'

const components = [
    container,
    header,
    leftNavigation
]

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default install
