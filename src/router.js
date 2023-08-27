import Vue from "vue";
import VueRouter from "vue-router";
import UserView from "@/pages/UserView.vue";
import App from "./App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    children: [
      {
        name: "UserView",
        path: "/user-view",
        component: UserView,
      },
    ],
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
