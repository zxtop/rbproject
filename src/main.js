// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import "./assets/css/base.css"
import "./assets/css/index.css"
// import screenfull from "screenfull";
// import Element from 'element-ui'

// 插件
import PopUp from './plugin/PopUp' // 引入
// import Screenfull from './plugin/ScreenFull'
Vue.use(PopUp) // 添加
// Vue.use(Screenfull) // 添加

Vue.use(ViewUI);
// Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
