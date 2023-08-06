<template>
  <v-snackbar
    class="my-snackbar"
    v-model="isOpen"
    :timeout="-1"
    color="error"
    multi-line
  >
    <p><b>An error occured:</b></p>
    {{ errorMessage }}
    <template v-slot:actions>
      <v-btn variant="text" icon="mdi-close" @click="handleClose"></v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.my-snackbar {
  word-break: break-all;
}
</style>

<script>
export default {
  TIMEOUT: 5000,

  data() {
    return {
      isOpen: false,
      timerId: null,
    };
  },
  computed: {
    errorMessage() {
      return this.$store.state.error;
    },
    errorCount() {
      return this.$store.state.errorCount;
    },
  },
  watch: {
    errorCount() {
      this.isOpen = true;
      this.startTimer();
    },
  },
  methods: {
    startTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        this.isOpen = false;
        this.timerId = null;
      }, this.$options.TIMEOUT);
    },

    handleClose() {
      this.isOpen = false;
    },
  },
};
</script>
