import Vue from "vue";
import VueRouter from "vue-router";
import UserView from "@/pages/UserView.vue";
// import App from "./App.vue";
// import UserLoginForm from "./components/UserLoginForm.vue";

import ModalUserLoginForm from "./components/ModalUserLoginForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: UserView,
    // children: [
    //   {
    //     name: "UserView",
    //     path: "/user-view",
    //     component: UserView,
    //   },
    // ],
  },
  {
    name: "ModalUserLoginForm",
    path: "/user-login",
    component: ModalUserLoginForm,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
