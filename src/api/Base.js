import axios from 'axios'
import Store from '@/store/index.js'

export default (loading = true) => {
  /**
   * axios實利
   */
  var ajaxBase = axios.create({
    // `url` 用於請求的服務 URL
    // url: '',

    // `method` 用於請求的服務方法
    // method: 'get',

    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: process.env.VUE_APP_API_PROTOCOL + '://' + process.env.VUE_APP_API_DOMAIN + '/',

    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 "PUT", "POST" 和 "PATCH" 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data, headers) {
      return data
    }],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
      return data
    }],

    // `headers` 是即将被发送的自定义请求头
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'Accept-Language': process.env.VUE_APP_LANGUAGE,
      'X-Timezone': process.env.VUE_APP_TIMEZONE
    },

    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求花费了超过 `timeout` 的时间，请求将被中断
    timeout: 50000,

    // `withCredentials` 表示跨域请求时是否需要使用凭证
    // 判斷是否垮域,用來解決CORS
    withCredentials: false,

    // `responseType` 表示服务器响应的数据类型，可以是 "arraybuffer", "blob", "document", "json", "text", "stream"
    responseType: 'json',

    // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN',

    // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    xsrfHeaderName: 'X-XSRF-TOKEN'
  })

  // 請求，攔截器
  ajaxBase.interceptors.request.use(config => {
    // 呼叫前攔截
    if (loading) {
      Store.commit('apiCall', 'false', { root: true })
    }
    // console.log('config.url：', config.url)
    switch (config.url) {
      case 'api/v1/docking/platform':
        // console.log('請求，攔截器： api/v1/docking/platform')
        config.headers.Authorization = ''
        break
      default:
        // console.log('請求，攔截器： default')
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('AccessToken')
        break
    }
    return config
  }, error => {
    // 錯誤攔截
    if (loading) {
      Store.commit('apiOver', 'false', { root: true })
    }
    return Promise.reject(error)
  })

  // 回傳，攔截器
  ajaxBase.interceptors.response.use(response => {
    // 成功攔截
    if (loading) {
      Store.commit('apiOver', 'false', { root: true })
    }
    return response
  }, error => {
    // 錯誤攔截
    if (loading) {
      Store.commit('apiOver', 'false', { root: true })
    }
    return Promise.reject(error)
  })

  return ajaxBase
}
