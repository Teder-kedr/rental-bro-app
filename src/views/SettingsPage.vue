<template>
  <div>
    <h1>Settings</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum deleniti
      laboriosam sunt, voluptas rerum, possimus iste dolorum ipsa excepturi
      itaque dolor sint veniam error in dolores voluptatum sequi quisquam alias?
    </p>
    <v-btn flat prepend-icon="mdi-logout" @click="handleLogOut">LOG OUT</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async handleLogOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/login");
    },
  },
};
</script>
