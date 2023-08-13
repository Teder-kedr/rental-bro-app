<template>
  <div class="h-screen d-flex justify-center align-center">
    <v-card class="mx-auto mb-4 px-6 pt-8 pb-6" width="350">
      <h2 class="mb-4">{{ $t("login.title") }}</h2>
      <v-form @submit.prevent="handleLogIn">
        <v-text-field
          v-model="email"
          required
          :readonly="isLoading"
          :label="$t('login.email')"
          type="email"
        />
        <v-text-field
          v-model="password"
          required
          :readonly="isLoading"
          :label="$t('login.password')"
          type="password"
        />
        <v-btn
          color="primary"
          block
          :disabled="!form"
          :loading="isLoading"
          type="submit"
          >{{ $t("login.action") }}</v-btn
        >
      </v-form>

      <v-divider class="my-4" />

      <p class="text-center hint-text">
        {{ $t("login.donthave") }}
        <router-link to="signup">{{ $t("login.signuplink") }}</router-link>
      </p>

      <v-divider class="my-4" />
      <div class="d-flex justify-center">
        <lang-switcher />
      </div>
    </v-card>
  </div>
</template>

<script>
import { logIn } from "@/services/auth";
import LangSwitcher from "@/components/LangSwitcher.vue";

export default {
  components: {
    LangSwitcher,
  },
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
    };
  },
  computed: {
    form() {
      if (this.email && this.password) return true;
      return false;
    },
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
};
</script>

<style scoped>
.hint-text {
  font-size: 0.9rem;
}
</style>
