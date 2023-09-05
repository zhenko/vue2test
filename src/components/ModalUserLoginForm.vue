<template>
  <transition name="modal">
    <div class="modal-mask" v-show="showModal" @click="close">
      <div class="modal-wrapper" @click.stop>
        <div class="modal-header">
          <slot name="header"> description </slot>
        </div>

        <div class="modal-body">
          <slot name="body"> <UserLoginForm @loggedIn="updateUser" /> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import UserLoginForm from "@/components/UserLoginForm.vue";
export default {
  name: "ModalUserLoginForm",
  components: { UserLoginForm },
  props: {
    // showModal: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updateUser(user) {
      this.user = user;
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #474747;
  display: grid;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  max-width: 450px;
  width: 100%;
  background-color: #c3c3c3;
  margin: auto;
  z-index: 100;
  border-radius: 5px;
}

.modal-header {
  background-color: #a5a5a5;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #5f5f5f;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  padding: 15px 0;
  text-align: center;
}
</style>
