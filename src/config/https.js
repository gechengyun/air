import Vue from 'vue';
import axios from 'axios';
import router from '../router';
import qs from 'qs'
import config from '../config'
//关于axios配置
axios.defaults.timeout = 10000;
//配置请求的根路径
axios.defaults.baseURL = config.baseUrl;
// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; //设置post头部信息
// http request 拦截器
axios.interceptors.request.use(config => {
    // 发送请求
    config.headers.UUID = 123;
    return config;
}, error => {
    return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    // if (response.data.result === 2000) {
    //     // token失效或者不存在 清除token信息并跳转到登录页面
    //     store.commit(types.LOGOUT);
    //     router.push({ path: '/login' });
    // }
    return response.data;
}, err => {
    console.log(err)
        // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误';
                break;

            case 401:
                err.message = '未授权，请登录';
                break;

            case 403:
                err.message = '拒绝访问';
                break;

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`;
                break;

            case 408:
                err.message = '请求超时';
                break;

            case 500:
                err.message = '服务器内部错误';
                break;

            case 501:
                err.message = '服务未实现';
                break;

            case 502:
                err.message = '网关错误';
                break;

            case 503:
                err.message = '服务不可用';
                break;

            case 504:
                err.message = '网关超时';
                break;

            case 505:
                err.message = 'HTTP版本不受支持';
                break;

            default:
                err.message = err.response.message
                break;
        }
    }
    Vue.prototype.$alert(err.toString(), '提示', { type: 'error' }).then(() => {}).catch(() => {});
    return Promise.reject(err);
});



//Vue.prototype.$http = axios; //把axios对象挂到Vue原型上
// http://blog.csdn.net/sjn0503/article/details/74729300
// axios.install = (Vue) => {
//   Vue.prototype.$axios = axios;
// }

export default axios;