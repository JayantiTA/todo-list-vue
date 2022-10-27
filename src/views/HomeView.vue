<template>
  <div>
    <v-chip v-if="filter.status" @click="resetFilter">
      reset filter
      <v-icon>mdi-close</v-icon>
    </v-chip>
    <v-list
      v-for="todo in todos"
      :key="todo.id"
      class="d-flex justify-center mb-6"
    >
      <v-card width="600px">
        <v-row align="center" class="ml-20">
          <input
            style="width: 20px; height: 20px"
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
            <v-chip v-if="!filter.status" @click="filterCategory(category)">
              {{ category }}
            </v-chip>
            <v-chip v-else>
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
        <v-btn
          @click="confirmDeletion(todo.id)"
          color="error"
          class="mx-2 mb-3"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5 text-center font-weight-bold my-2">
              Confirm Deletion
            </v-card-title>
            <v-card-text>Are you sure to delete this task?</v-card-text>
            <v-card-actions class="mx-3 my-2">
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" color="grey"> Cancel </v-btn>
              <v-btn @click="deleteTodo" color="error"> Delete </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-list>
  </div>
</template>

<script>
import TodoDataService from "../services/TodoDataService";

export default {
  data() {
    return {
      todos: [],
      allTodos: [],
      filter: {},
      dialog: false,
      tempDeleteId: null,
    };
  },

  beforeMount() {
    console.log("before mount");
    (async () => {
      this.todos = await TodoDataService.getAll();
    })();
  },

  activated() {
    console.log("aactivated");
    (async () => {
      this.todos = await TodoDataService.getAll();
    })();
  },

  methods: {
    deleteTodo() {
      this.dialog = false;
      if (this.filter.status) {
        this.allTodos = this.allTodos.filter(
          (todo) => todo.id !== this.tempDeleteId
        );
      }
      this.todos = this.todos.filter((todo) => todo.id !== this.tempDeleteId);
      (async () => {
        await TodoDataService.delete(this.tempDeleteId);
      })();
    },
    filterCategory(category) {
      this.allTodos = this.todos;
      this.todos = this.todos.filter((todo) =>
        todo.categories.includes(category)
      );
      this.filter.status = true;
      this.filter.category = category;
    },
    resetFilter() {
      this.filter = {};
      this.todos = this.allTodos;
    },
    changeStatus(todo) {
      todo.checked = !todo.checked;
      (async () => {
        await TodoDataService.update(todo.id, todo);
      })();
    },
    confirmDeletion(id) {
      this.dialog = true;
      this.tempDeleteId = id;
    },
  },
};
</script>
