import Vue from "vue";
import App from "./App.vue";
import "@/scss/index.scss";
import router from "./router";
import store from "./store";
import { registerMicroApps, start, initGlobalState ,loadMicroApp} from "qiankun";
import microApps from "./microApps.js";
import url, { minioUrl, mqttUrl } from "@/axios/url";
const { adminUrl } = url();
import plugins from './plugins' // plugins
import './assets/icons' // icon
// 安装插件
import "@/plugins";

// 注册全局组件
import "@/components/gobalComponents.js";

// icons图标
import "@/icons/iconfont.css";

// 自定义指令
import "@/directives";

// 注册国际化
import i18n from "@/lang";

// 动态表格高度指令
import "@/directives/zn-en.js";
import request from '@/axios/request';

Vue.use(plugins)
Vue.config.productionTip = false;

export default new Vue({
  ...App,
  router,
  store,
  i18n,
  async beforeCreate() {
    const res = await request({
      url: `${adminUrl}expose/middleware/url`,
      method: 'GET',
    });
    minioUrl['minioUrl'] = res?.data?.result?.minioViewUrl || process.env.VUE_APP_MINIO_URL;
    mqttUrl['mqttUrl'] = res?.data?.result?.mqttUrl || process.env.VUE_APP_MQTT_URL;
  },
  render: (h) => h(App),
  mounted() {
    registerMicroApps(microApps);
    start({
      prefetch: false,
    });
  }
}).$mount("#app");
