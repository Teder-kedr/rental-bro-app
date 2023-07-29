<template>
  <form @submit.prevent="handleLogIn">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Log In</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogIn() {
      try {
        const email = this.email;
        const password = this.password;
        await this.$store.dispatch("logIn", { email, password });
        this.$router.push("projects");
      } catch (error) {
        console.error("👎🏻", error.message);
      }
    },
  },
};
</script>
