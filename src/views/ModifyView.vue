<template>
  <div>
    <p>Name:</p>
    <input required v-model="todo.name" />
    <div>
      <div>
        <input required v-model="category" />
        <button @click="addCategory">Add Category</button>
      </div>
      categories:
      <ul>
        <!-- TODO: edit and remove category -->
        <li v-for="category in todo.categories" :key="category">
          {{ category }}
          <button @click="deleteCategory(category)">delete</button>
        </li>
      </ul>
      <!-- TODO: add category -->
    </div>

    <button v-if="edited" @click="cancel">cancel</button>
    <button @click="save">Save</button>
  </div>
</template>

<script>
import TodoDataService from "../services/TodoDataService";

export default {
  data() {
    return {
      category: "",
      todo: {
        name: "",
        categories: [],
        checked: false,
      },
      edited: false,
    };
  },

  beforeMount() {
    if (this.$route.name === "edit") {
      this.edited = true;
      (async () => {
        this.todo = await TodoDataService.get(this.$route.params.id);
      })();
    } else {
      this.edited = false;
    }
  },

  methods: {
    save() {
      this.$router.push("/");
      if (this.$route.name === "edit") {
        (async () => {
          await TodoDataService.update(this.$route.params.id, this.todo);
        })();
      } else {
        (async () => {
          await TodoDataService.create(this.todo);
        })();
      }
    },
    cancel() {
      this.$router.push("/");
    },
    addCategory() {
      this.todo.categories.push(this.category.toLowerCase());
      this.category = "";
    },
    deleteCategory(category) {
      this.todo.categories = this.todo.categories.filter((c) => c !== category);
    },
  },
};
</script>
