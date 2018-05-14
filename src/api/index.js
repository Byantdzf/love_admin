import { Model } from 'iview';
import axios from 'axios';
import config from './config';
import router from '../router';

let uAxios = axios.create(config);

// http request 拦截器
uAxios.interceptors.request.use(config => {
    if (window.localStorage.ACCESS_TOKEN) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.ACCESS_TOKEN;
    }
    return config;
}, error => {
    this.$Modal.error({
        content: error
    });
});

// http response 拦截器
uAxios.interceptors.response.use(response => {
    if (response.status === 200 && response.data.code === 2) { // token过期
        window.localStorage.removeItem('ACCESS_TOKEN');
        alert(response.data.message);
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        });
    }
    return response;
}, error => {
    // this.$Modal.error({
    //     content: error
    // });
    console.log(error);
});

export default uAxios;
