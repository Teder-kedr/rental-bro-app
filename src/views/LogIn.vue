<template>
  <div class="h-screen d-flex justify-center align-center">
    <v-card class="mx-auto mb-4 px-6 py-8" width="350">
      <h2 class="mb-4">Log In</h2>
      <v-form @submit.prevent="handleLogIn">
        <v-text-field
          required
          :readonly="isLoading"
          label="Email"
          type="email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          required
          :readonly="isLoading"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <v-btn
          color="primary"
          block
          :disabled="!form"
          :loading="isLoading"
          type="submit"
          >Log in</v-btn
        >
      </v-form>

      <v-divider class="my-4"></v-divider>

      <p class="text-center hint-text">
        Don't have an account? <router-link to="signup">Sign up!</router-link>
      </p>
    </v-card>
  </div>
</template>

<style scoped>
.hint-text {
  font-size: 0.9rem;
}
</style>

<script>
import { logIn } from "@/services/auth";

export default {
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
    };
  },
  methods: {
    async handleLogIn() {
      try {
        this.isLoading = true;
        const email = this.email;
        const password = this.password;
        await logIn(email, password);
        this.$router.push("projects");
      } catch (error) {
        this.isLoading = false;
        this.$store.dispatch("handleNewError", error.message);
      }
    },
  },
  computed: {
    form() {
      if (this.email && this.password) return true;
      return false;
    },
  },
};
</script>
