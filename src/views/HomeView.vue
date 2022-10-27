<template>
  <div>
    <div v-if="!filter.status">
      <v-list
        v-for="todo in todos"
        :key="todo.id"
        class="d-flex justify-center mb-6"
      >
        <v-card width="600px">
          <v-row align="center" class="ml-20">
            <input
              type="checkbox"
              :checked="todo.checked"
              @change="
                (event) => {
                  changeStatus(todo, event.target.checked);
                }
              "
              class="ml-15 mt-5"
            />
            <v-col class="mx-2 mt-5">
              <v-row class="my-1">
                <p class="mx-3 text-left text-h5 font-weight-bold">
                  {{ todo.name }}
                </p>
                <v-chip color="green" v-if="todo.checked"> done </v-chip>
              </v-row>
              <p class="text-left">{{ todo.description }}</p>
            </v-col>
          </v-row>
          <v-row class="mx-3 my-1">
            <v-list
              v-for="category in todo.categories"
              :key="category"
              class="mx-1"
            >
              <v-chip @click="filterCategory(category)">
                {{ category }}
              </v-chip>
            </v-list>
          </v-row>
          <v-btn
            color="warning"
            @click="
              $router.push({
                name: 'edit',
                params: { id: todo.id },
              })
            "
            class="mx-2 mb-3"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="deleteTodo(todo.id)" color="error" class="mx-2 mb-3">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </v-list>
    </div>
    <div v-else>
      <v-chip @click="resetFilter">
        reset filter
        <v-icon>mdi-close</v-icon>
      </v-chip>
      <v-list
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="d-flex justify-center mb-6"
      >
        <v-card width="600px">
          <v-row align="center" class="ml-20">
            <input
              type="checkbox"
              :checked="todo.checked"
              @change="
                (event) => {
                  changeStatus(todo, event.target.checked);
                }
              "
              class="ml-15 mt-5"
            />
            <v-col class="mx-2 mt-5">
              <v-row class="my-1">
                <p class="mx-3 text-left text-h5 font-weight-bold">
                  {{ todo.name }}
                </p>
                <v-chip color="green" v-if="todo.checked"> done </v-chip>
              </v-row>
              <p class="text-left">{{ todo.description }}</p>
            </v-col>
          </v-row>
          <v-row class="mx-3 my-1">
            <v-list
              v-for="category in todo.categories"
              :key="category"
              class="mx-1"
            >
              <v-chip>
                {{ category }}
                <v-icon v-if="category === filter.category"
                  >mdi-filter-variant</v-icon
                >
              </v-chip>
            </v-list>
          </v-row>
          <v-btn
            color="warning"
            @click="
              $router.push({
                name: 'edit',
                params: { id: todo.id },
              })
            "
            class="mx-2 mb-3"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="deleteTodo(todo.id)" color="error" class="mx-2 mb-3">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </v-list>
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
      filter: {},
    };
  },

  beforeMount() {
    (async () => {
      this.todos = await TodoDataService.getAll();
    })();
  },

  activated() {
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
      this.filter.status = true;
      this.filter.category = category;
      this.filteredTodos = this.todos.filter((todo) =>
        todo.categories.includes(category)
      );
    },
    resetFilter() {
      this.filter = {};
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
