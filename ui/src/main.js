// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 按需全量引入 bk-magic-vue 样式
import 'bk-magic-vue/dist/bk-magic-vue.min.css'
import '@/assets/componentLibrary/demand-import'
// bk-magic-vue全引入
// import '@/assets/componentLibrary/fully-import';
// 几何图
import * as Echarts from 'echarts'
// 公共方法
import './utils/common.js'
// 统一样式引入
import './assets/index'
// 引入自定义方法
import Dire from './directive/index.js'
// 引入自定义组件
import Component from './components/index.js'
// vuex
import store from './store/index'
import 'jquery'
// 引用API文件
import api from './api/index'

Vue.use(Echarts)
Vue.use(Dire)
Vue.use(Component)
Vue.prototype.$api = api
Vue.prototype.$echarts = Echarts
const headTheme = 'light' // 选择 light 或 blue
Vue.prototype.headTheme = headTheme

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    data() {
        return {
            website: '我是全局变量'
        }
    },
    template: '<App/>'
})
