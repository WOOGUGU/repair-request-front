import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "./assets/css/all.css";
import "@/router/permission.ts";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const store = createPinia();
let app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { locale });
app.use(store);
app.use(router);

app.mount("#app");
// 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