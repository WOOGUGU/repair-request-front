import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "./assets/css/all.css";

const store = createPinia();
let app = createApp(App);

app.use(ElementPlus, { locale });
app.use(store);
app.use(router);

app.mount("#app");
