import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
Vue.config.productionTip = false

//配置element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 组件
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)


// 富文本组件
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


// 时间
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//导入弹框
import { Message } from 'element-ui'

Vue.prototype.$message = Message

import axios from 'axios'
import './plugins/element.js'
//配置请求得根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
})
Vue.prototype.$http = axios

//将富文本编辑器注册为全局可用组件
Vue.use(VueQuillEditor)


new Vue({
    router,
    render: function(h) { return h(App) }
}).$mount('#app')