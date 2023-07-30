<template>
  <div class="h-screen d-flex justify-center align-center">
    <v-card class="mx-auto mb-4 px-6 py-8" width="350">
      <h2 class="mb-4">Create account</h2>
      <v-form @submit.prevent="handleSignUp">
        <v-text-field
          placeholder="Firstname Lastname"
          required
          :readonly="isLoading"
          label="Full name"
          type="text"
          v-model="fullName"
        ></v-text-field>
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
          >Sign up</v-btn
        >
      </v-form>

      <v-divider class="my-4"></v-divider>

      <p class="text-center hint-text">
        Already have an account? <router-link to="login">Log in!</router-link>
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
import { signUp } from "@/services/auth";

export default {
  data() {
    return {
      fullName: null,
      email: null,
      password: null,
      isLoading: false,
    };
  },
  methods: {
    async handleSignUp() {
      try {
        this.isLoading = true;
        const name = this.fullName;
        const email = this.email;
        const password = this.password;
        await signUp(name, email, password);
        this.$router.push("projects");
      } catch (error) {
        this.isLoading = false;
        this.$store.dispatch("handleNewError", error.message);
      }
    },
  },
  computed: {
    form() {
      if (this.fullName && this.email && this.password) return true;
      return false;
    },
  },
};
</script>
