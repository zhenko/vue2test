<template>
  <div>
    <form @submit="onSubmit">
      <label>description</label>
      <div class="input-container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          v-model="username"
          required
          @input="validateName"
        />
        <p v-if="errorName" class="error-message">{{ errorName }}</p>
      </div>
      <div class="input-container">
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          v-model="phonenumber"
          required
          @input="validateNumber"
        />
        <p v-if="errorNumber" class="error-message">{{ errorNumber }}</p>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLoginForm",
  data() {
    return {
      username: "",
      phonenumber: "",
      inputText: "",
      errorName: "",
      errorNumber: "",
      users: "",
      user: null,
    };
  },
  methods: {
    getData() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
        const user = this.users.find(
          (item) =>
            item.phone === this.phonenumber && item.name === this.username
        );
        if (user) {
          this.$emit("loggedIn", user);
          this.$router.push({ path: "/user-view" });
        } else {
          console.log("erorr!!!!");
        }
      });
    },
    onSubmit(event) {
      event.preventDefault();
      this.getData();
    },
    validateName() {
      if (!/^[a-zA-Z ]+$/.test(this.username)) {
        this.errorName = "Дозволені лише букви.";
      } else {
        this.errorName = "";
      }
    },
    validateNumber() {
      if (!/[0-9 x()\-+]+$/i.test(this.phonenumber)) {
        this.errorNumber = "Дозволені лише цифри та символи (x,+,-, ,(,))";
      } else {
        this.errorNumber = "";
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 15px 25px 30px 25px;
  row-gap: 20px;
}
label {
  color: #5f5f5f;
  font-size: 15px;
  line-height: 21px;
}
input {
  color: #353535;
  font-size: 17px;
  line-height: 21px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: calc(100% - 20px);
}
input::-webkit-input-placeholder {
  color: #353535;
}
button {
  margin-top: 5px;
  background-color: #519945;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  line-height: 21px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
button:hover {
  background-color: #316628;
}
.input-container {
  position: relative;
}
.error-message {
  color: red;
  position: absolute;
  top: 35px;
  left: 10px;
  font-size: 12px;
}
</style>
