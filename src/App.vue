<template>
  <section class="todo-section">
    <div class="todo-box">
      <h3>Todo App</h3>
      <p>codewithepal</p>
      <form class="input" @submit.prevent="submitForm">
        <input
          type="text"
          required
          placeholder="Add your new todo"
          v-model="todoItem.title"
        />
        <button v-if="editMode" type="submit">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>
        <button v-else type="submit">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </form>
      <div class="todo-items">
        <ul>
          <li v-for="item in todoData" :key="item.id">
            <div>
              <p>
                {{ item.title }}
              </p>
            </div>
            <span>
              <button class="edit" @click="setEditValue(item)">Edit</button>
            </span>
            <span>
              <button class="delete" @click="handleDelete(item.id)">
                Delete
              </button>
            </span>
          </li>
        </ul>
      </div>
      <div class="footer-note">
        <p>You have 3 pending tasks</p>
        <div>
          <button>Clear All</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      todoData: [],
      editMode: false,
      todoItem: {},
    };
  },

  methods: {
    async fetchTodos() {
      const response = await this.axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      this.todoData = response.data.slice(0, 5);
    },
    submitForm() {
      if (this.editMode) {
        this.handleEdit();
      } else {
        this.addTodo();
      }
    },
    async addTodo() {
      const response = await this.axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        this.todoItem
      );
      if (response) {
        this.todoData.push(response.data);
        this.todoItem = {};
      }
    },
    async handleDelete(id) {
      const response = await this.axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      if (response) {
        const index = this.todoData.findIndex((item) => item.id === id);
        this.todoData.splice(index, 1);
      }
    },
    setEditValue(item) {
      const tempValue = { ...item };
      this.todoItem = tempValue;
      this.editMode = true;
    },
    async handleEdit() {
      const response = await this.axios.put(
        `https://jsonplaceholder.typicode.com/todos/${this.todoItem.id}`,
        this.todoItem
      );
      if (response) {
        const index = this.todoData.findIndex(
          (item) => item.id === this.todoItem.id
        );
        // update array data in vue 3
        this.todoData[index] = this.todoItem;

        //  update array data in vue 2
        // this.$set(this.todoData, index, this.todoItem)

        this.set;

        this.todoItem = {};

        this.editMode = false;
      }
    },
  },

  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
section.todo-section {
  display: flex;
  justify-content: center;
}

div.todo-box {
  width: 50%;
  border: 1px solid #333;
  padding: 50px;
}

.todo-box .input button {
  background-color: rgb(143, 36, 224);
  padding: 8px 13px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

div.todo-box input {
  padding: 5px 13px;
  margin-right: 5px;
}

.fa-plus {
  color: #fff;
}

section div.todo-items ul li {
  display: flex;
  column-gap: 5px;
  align-items: center;
}

p {
  margin: 0;
}

section div.todo-items ul li div {
  list-style: none;
  padding: 5px 13px;
  background-color: rgb(231, 231, 231);
  margin-bottom: 5px;
  border-radius: 3px;
  width: 50%;
}

section div.todo-items ul {
  padding-left: 0px;
}

div.todo-box .footer-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

div.todo-box .footer-note button {
  background-color: rgb(143, 36, 224);
  padding: 8px 13px;
  border: none;
  border-radius: 3px;
  color: #fff;
}

.edit {
  background-color: rgb(80, 156, 222);
  padding: 5px 13px;
  border: none;
  border-radius: 3px;
  color: #fff;
}

.delete {
  background-color: rgb(216, 60, 60);
  padding: 5px 13px;
  border: none;
  border-radius: 3px;
  color: #fff;
}
</style>
