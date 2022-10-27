<template>
  <div>
    <div v-if="!filtered">
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.checked"
          @change="
            (event) => {
              changeStatus(todo, event.target.checked);
            }
          "
        />
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
        <input
          type="checkbox"
          :checked="todo.checked"
          @change="
            (event) => {
              changeStatus(todo, event.target.checked);
            }
          "
        />
        {{ todo.name }}
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
    })();
  },

  mounted() {
    (async () => {
      this.todos = await TodoDataService.getAll();
    })();
  },

  methods: {
    deleteTodo(id) {
      if (this.filtered) {
        this.filteredTodos = this.filteredTodos.filter(
          (todo) => todo.id !== id
        );
      }
      this.todos = this.todos.filter((todo) => todo.id !== id);
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
      this.filteredTodos = [];
    },
    changeStatus(todo) {
      todo.checked = !todo.checked;
      (async () => {
        await TodoDataService.update(todo.id, todo);
      })();
    },
  },
};
</script>
