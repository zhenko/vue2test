<template>
  <div>
    <h2>Get data REST API</h2>
    <div class="add-container">
      <button @click="getData()">Get data</button>
      <button
        :class="{ 'close-button': this.createTodo }"
        @click="createItem()"
      >
        {{ !this.createTodo ? "Create todo" : "Close todo" }}
      </button>
      <div v-if="this.createTodo" class="create-item">
        <input type="text" placeholder="type title" v-model="newTitle" />
        <input type="text" placeholder="type userId" v-model="newUserId" />
        <button @click="AddTodos">AddTodos</button>
      </div>
    </div>
    <div class="wrap">
      <div v-if="todos.length" class="todo__title">
        <span class="title__id">ID</span>
        <span class="title__title">Title</span>
        <span class="title__completed">Status</span>
        <span class="title__userid">User Id</span>
        <span class="title__favorite">Favorite</span>
      </div>
      <div v-if="todos.length" class="todo__title">
        <span class="title__id"></span>
        <span class="title__title input__title">
          <input
            type="text"
            placeholder="type title or other..."
            v-model="titletext"
          />
          <div
            v-if="titletext.length"
            @click="removeTitle"
            class="title__remove"
          >
            X
          </div>
        </span>
        <span class="title__completed">
          <select v-model="selectedOption">
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Uncompleted">Uncompleted</option>
          </select>
        </span>
        <span class="title__userid">
          <select v-model="selectedUser">
            <option v-for="(id, i) in getUserId" :key="i" :value="id">
              {{ id }}
            </option>
          </select>
        </span>
        <span class="title__favorite">
          <input type="checkbox" v-model="selectedFavorite" />
          {{ selectedFavorite }}
        </span>
      </div>
      <div v-for="todo in filteredTodos" :key="todo.id" class="todo">
        <span class="todo__id">{{ todo.id }}</span>
        <span>{{ todo.title }}</span>
        <span class="todo__completed">{{ todo.completed }}</span>
        <span class="todo__userid">{{ todo.userId }}</span>
        <span class="title__favorite">
          <input
            type="checkbox"
            @click="addToLocalStorage(todo)"
            :checked="todo.favorite"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GetDataComponent",
  data() {
    return {
      todos: [],
      todo: {
        completed: false,
        id: 0,
        title: "",
        userId: 0,
        favorite: false,
      },
      selectedOption: "All",
      selectedUser: 1,
      titletext: "",
      createTodo: false,
      newTitle: "",
      newUserId: 1,
      selectedFavorite: false,
    };
  },
  methods: {
    getData() {
      axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
        this.todos = res.data;
      });
    },
    removeTitle() {
      this.titletext = "";
    },
    createItem() {
      this.createTodo = !this.createTodo;
    },
    AddTodos() {
      if (this.todos) {
        this.todos.push({
          userId: +this.newUserId,
          title: this.newTitle,
          id: +this.todos.length + 1,
          completed: false,
          favorite: false,
        });
        this.newUserId = null;
        this.newTitle = "";
        this.createTodo = !this.createTodo;
      }
    },
    addToLocalStorage(todo) {
      todo.favorite = true;
      let localStorageData = JSON.parse(localStorage.getItem("todos")) || [];
      localStorageData.push(todo);
      localStorage.setItem("todos", JSON.stringify(localStorageData));
    },
  },
  computed: {
    filteredTodos() {
      let filtered = this.todos;

      if (this.selectedOption === "Completed") {
        filtered = filtered.filter((item) => item.completed === true);
      } else if (this.selectedOption === "Uncompleted") {
        filtered = filtered.filter((item) => item.completed === false);
      }

      if (this.selectedUser !== "All user") {
        filtered = filtered.filter((item) => item.userId === this.selectedUser);
      }

      if (this.titletext) {
        filtered = filtered.filter((item) =>
          item.title.includes(this.titletext)
        );
      }

      if (this.selectedFavorite) {
        filtered = filtered.filter((item) => item.favorite === true);
      }

      return filtered;
    },
    getUserId() {
      return ["All user", ...new Set(this.todos.map((item) => item.userId))];
    },
  },
  mounted() {
    const localStore = localStorage.getItem("todos");
    if (localStore) {
      this.todos = JSON.parse(localStore);
    }
  },
};
</script>

<style scoped>
.wrap {
  background-color: pink;
  width: 900px;
  padding: 5px;
  border-radius: 5px;
  margin: 20px 0;
}

.wrap:empty {
  padding: 0;
}

.todo,
.todo__title {
  padding: 5px;
  display: flex;
}

.todo__title {
  font-weight: 600;
  color: gray;
}

.todo__id,
.title__id {
  flex-basis: 40px;
}
.todo__completed,
.title__completed {
  margin-right: 0;
  margin-left: auto;
}
.title__completed select {
  text-align: right;
}
.todo__userid,
.title__userid {
  flex-basis: 80px;
  text-align: center;
}

.title__userid select {
  text-align: center;
}

.input__title {
  display: flex;
}

.title__remove {
  cursor: pointer;
  margin-left: 10px;
  color: #000;
  font-weight: 400;
}

.add-container,
.create-item {
  display: flex;
  gap: 20px;
}

.title__favorite {
  flex-basis: 80px;
  text-align: center;
}

.close-button {
  background-color: pink;
}
</style>
