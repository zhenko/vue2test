<template>
  <div id="app">
    <ModalUserLoginForm :showModal="showModal" v-if="$route.path === '/'">
      <template #header>description</template>
      <template #body>
        <UserLoginForm @loggedIn="updateUser" />
      </template>
    </ModalUserLoginForm>
    <UserView v-else :user="user" />
  </div>
</template>

<script>
import ModalUserLoginForm from "./components/ModalUserLoginForm.vue";
import UserLoginForm from "./components/UserLoginForm.vue";

import UserView from "./pages/UserView";

export default {
  name: "App",
  components: {
    UserLoginForm,
    ModalUserLoginForm,
    UserView,
  },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    updateUser(user) {
      this.user = user;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

* {
  font-family: "Roboto", sans-serif;
}
</style>
