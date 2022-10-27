<template>
  <div>
    <div v-if="!filtered">
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" id="checkbox" v-model="checked" />
        {{ todo.name }}
        <p v-if="todo.checked">(selesai)</p>
        <ul>
          <!-- TODO: add onclick filter task by category -->
          <li v-for="category in todo.categories" :key="category">
            <button @click="filterCategory(category)">
              {{ category }}
            </button>
          </li>
        </ul>

        <button
          @click="
            $router.push({
              name: 'edit',
              params: { id: todo.id },
            })
          "
        >
          edit
        </button>
        <button @click="deleteTodo(todo.id)">delete</button>
      </li>
    </div>
    <div v-else>
      <button @click="resetFilter">reset filter</button>
      <li v-for="todo in filteredTodos" :key="todo.id">
        {{ todo.name }}
      </li>
    </div>
  </div>
</template>

<script>
import TodoDataService from "../services/TodoDataService";

export default {
  data() {
    return {
      todos: [],
      filteredTodos: [],
      filtered: false,
    };
  },

  beforeMount() {
    (async () => {
      this.todos = await TodoDataService.getAll();
      console.log(this.todos);
    })();
  },

  updated() {
    (async () => {
      this.todos = await TodoDataService.getAll();
    })();
  },

  methods: {
    deleteTodo(id) {
      // TODO: delete todo from view
      (async () => {
        await TodoDataService.delete(id);
      })();
    },
    filterCategory(category) {
      this.filtered = true;
      this.filteredTodos = this.todos.filter((todo) =>
        todo.categories.includes(category)
      );
    },
    resetFilter() {
      this.filtered = false;
    },
  },
};
</script>
