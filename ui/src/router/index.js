import Vue from 'vue'
import Router from 'vue-router'
import {frameRouter} from './frameRouter'
import httpConfig from '@/api/config/request'

// 遇到路由重读点击报错时，取消注释解决
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// 路由切换时取消请求
const cancelRequest = async() => {
    const allRequest = httpConfig.queue.get()
    const requestQueue = allRequest.filter(request => request.cancelWhenRouteChange)
    await httpConfig.cancel(requestQueue.map(request => request.requestId))
}

// frameRouter ：参数；框架路由；不需要的话就直接注释
const router = new Router({
    routes: frameRouter // 替换到这里
})

router.beforeEach(async(to, from, next) => {
    await cancelRequest()
    if (to.matched.length === 0) {
        from.path ? next({path: from.path}) : next('/')
    } else {
        next()
    }
})

export default router
