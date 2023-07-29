<template>
  <div class="d-flex align-center px-4 my-3">
    <v-avatar class="circle gradient-background mr-3">
      <v-icon icon="mdi-account" color="black"></v-icon>
    </v-avatar>
    <span class="name-text">{{ email }}</span>
  </div>
</template>

<style scoped>
.circle {
  width: 48px;
  height: 48px;
  border: 1px solid #ebebeb;
}
.name-text {
  font-size: 0.9rem;

  flex: 1;
  word-wrap: break-word;
}
</style>

<script>
export default {
  computed: {
    email() {
      return this.$store.state.user.email;
    },
  },
};
</script>
