import Vue from 'vue'

// 去重
Vue.prototype.$DupRem = function(list) {
    const newArr = []
    for (let i = 0; i < list.length; i++) {
        if (newArr.indexOf(list[i]) < 0) {
            newArr.push(list[i])
        }
    }
    return newArr
}
// 深拷贝
Vue.prototype.$Copy = function(data) {
    return JSON.parse(JSON.stringify(data))
}

// 时间格式转string
Vue.prototype.$TransTime = function(date) {
    const data = new Date(date)
    const sep = '-'
    const year = data.getFullYear()
    let month = data.getMonth() + 1
    let strDate = data.getDate()
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    return year + sep + month + sep + strDate
}

// 时间管理  days:时间间隔 startDate:初始时间 type:返回时间格式,默认返回string格式（string or time）
Vue.prototype.$DateDisplay = function(days, type, startDate) {
    const end = startDate ? new Date(startDate) : new Date()
    const start = startDate ? new Date(startDate) : new Date()
    end.setTime(start.getTime() + 24 * 60 * 60 * 1000)
    start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
    return {
        endTime: type === 'time' ? end : Vue.prototype.$TransTime(end),
        startTime: type === 'time' ? start : Vue.prototype.$TransTime(start)
    }
}

// 时间戳与时间互相转换
Vue.prototype.stampToTime = (timeStamp) => {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const clockTime = date.toString().split(' ')[4]
    return year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day) + ' ' + clockTime
}
export const deepClone = (obj, hash = new WeakMap()) => {
    if (Object(obj) !== obj) return obj
    if (obj instanceof Set) return new Set(obj)
    if (hash.has(obj)) return hash.get(obj)
    const result = obj instanceof Date ? new Date(obj)
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
        : obj.constructor ? new obj.constructor()
        : Object.create(null)
    hash.set(obj, result)
    if (obj instanceof Map) {
        Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)))
    }
    return Object.assign(result, ...Object.keys(obj).map(key => ({[key]: deepClone(obj[key], hash)})))
}
export const transformDataKey = (data = {}, flag = false) => {
    if (!['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(data))) return data
    const result = {}
    if (Array.isArray(data)) {
        return data.map(item => transformDataKey(item, flag))
    }
    Object.keys(data).forEach((key) => {
        const matchList = flag ? key.match(/([a-z][A-Z])/g) : key.match(/(_[a-zA-Z])/g)
        let newKey = key
        const item = data[key]
        if (matchList) {
            matchList.forEach((set) => {
                if (flag) {
                    newKey = newKey.replace(set, set.split('').join('_')
                        .toLocaleLowerCase())
                } else {
                    newKey = newKey.replace(set, set.replace('_', '').toLocaleUpperCase())
                }
            })
        }
        if (item && typeof item === 'object' && Object.keys(item).length) {
            result[newKey] = transformDataKey(item, flag)
        } else {
            result[newKey] = item
        }
    })

    return result
}
export const random = (n) => { // 生成n位长度的字符串
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789' // 可以作为常量放到random外面
    let result = ''
    for (let i = 0; i < n; i++) {
        result += str[parseInt(Math.random() * str.length)]
    }
    return result
}

export const isPostiveInt = val => /^[1-9][0-9]*$/.test(`${val}`)

Vue.prototype.GMTToStr = (time) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const clockTime = date.toString().split(' ')[4]
    return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + clockTime
}

// 暂时解决删除分页最后一页的唯一数据后，再次获取列表时因为当前页码数没有数据而返回404的问题
Vue.prototype.rollbackPageNum = (pageNum, pageSize, totalNum) => {
    if (totalNum === 0) {
        return pageNum
    } else {
        return totalNum % pageSize === 0 ? Math.floor(totalNum / pageSize) : pageNum
    }
}

Vue.prototype.formatDate = function(nowday) {
    const year = nowday.getFullYear()
    const month = nowday.getMonth() + 1
    const date = nowday.getDate()
    const hour = nowday.getHours()
    const minute = nowday.getMinutes()
    const second = nowday.getSeconds()
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) +
        ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' +
        (second < 10 ? '0' + second : second)
}
