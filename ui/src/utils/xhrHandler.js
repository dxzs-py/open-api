import { bkMessage } from 'bk-magic-vue'

/** 成功消息提示  */
export const successMessage = (message, delay = 3000, limit = 3) => {
    bkMessage({ theme: 'success', message, delay, limit })
}

/** 失败消息提示 */
export const errorMessage = (message, delay = 3000, limit = 3) => {
    bkMessage({ theme: 'error', message, delay, limit })
}

/** 请求异常处理 */
export const xhrErrorHandler = error => {
    const { response } = error || {}
    const { status } = response || {}
    switch (status) {
        default:
            errorMessage('未知错误，请刷新重试')
    }
}
