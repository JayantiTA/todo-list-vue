<template>
  <div>
    <v-row justify="center">
      <v-card width="550px">
        <v-card-title primary-title> Remember Something To Do? </v-card-title>
        <form @submit.prevent="save">
          <v-text-field
            v-model="todo.name"
            label="Name"
            required
            class="ml-10 mr-10"
          ></v-text-field>
          <v-textarea
            v-model="todo.description"
            class="ml-10 mr-10"
            name="description"
            label="Description"
          ></v-textarea>
          <form @submit.prevent="addCategory">
            <v-row>
              <v-text-field
                v-model="category"
                label="Category"
                required
                class="ml-13"
              ></v-text-field>
              <v-btn type="submit" class="ml-2 mr-13 mt-3">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </form>
          <v-row class="mx-7">
            <v-list v-for="category in todo.categories" :key="category">
              <v-chip @click="deleteCategory(category)">
                {{ category }}
                <v-icon>mdi-close</v-icon>
              </v-chip>
            </v-list>
          </v-row>
          <v-btn v-if="edited" @click="cancel" class="mx-3">cancel</v-btn>
          <v-btn
            type="submit"
            color="primary"
            class="my-5"
            :disabled="v$.todo.$invalid"
            >Save</v-btn
          >
        </form>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import TodoDataService from "../services/TodoDataService";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      category: "",
      todo: {
        name: "",
        description: "",
        categories: [],
        checked: false,
      },
      edited: false,
    };
  },

  validations() {
    return {
      todo: {
        name: {
          required,
        },
        categories: {
          required,
          min: minLength(1),
        },
      },
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
      (async () => {
        if (this.$route.name === "edit") {
          await TodoDataService.update(this.$route.params.id, this.todo);
        } else {
          await TodoDataService.create(this.todo);
        }
        this.$router.push("/");
      })();
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
