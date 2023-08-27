<template>
  <div>
    <h1>Personal data of user</h1>
    <div class="user-container">
      <div>Name</div>
      <div>{{ user.name }}</div>
      <div>Username</div>
      <div>{{ user.username }}</div>
      <div>Email</div>
      <div>{{ user.email }}</div>
      <div>Address</div>
      <div>
        {{ user.address.street }}, {{ user.address.suite }},
        {{ user.address.city }}, {{ user.address.zipcode }}
      </div>
      <div>Phone</div>
      <div>{{ user.phone }}</div>
      <div>Website</div>
      <div>{{ user.website }}</div>
      <div>Company</div>
      <div>{{ user.company.name }}</div>
    </div>
    <GetDataComponent />
  </div>
</template>

<script>
import GetDataComponent from "../components/GetDataComponent.vue";
export default {
  name: "UserView",
  components: {
    GetDataComponent,
  },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
};
</script>
<style>
.user-container {
  display: grid;
  grid-template-columns: 175px 1fr;
}

.user-container div {
  padding: 5px;
  border-bottom: 1px solid green;
  width: fit-content;
  background-color: #e9e9e9;
}
.user-container div:nth-child(odd) {
  font-weight: 600;
  color: gray;
  width: 100%;
}
</style>
