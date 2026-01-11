import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router/'

createApp(App).use(router).mount('#app')

// 初始化 AOS
AOS.init({
  // 可選設定
    duration: 800,
    easing: 'ease-in-out',
    once: true,  // 只動畫一次
})