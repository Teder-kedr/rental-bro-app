<template>
  <div class="h-screen d-flex justify-center align-center">
    <v-card class="mx-auto mb-4 px-6 pt-8 pb-6" width="350">
      <h2 class="mb-4">{{ $t("signup.title") }}</h2>
      <v-form @submit.prevent="handleSignUp">
        <v-text-field
          v-model="firstName"
          required
          :readonly="isLoading"
          :label="$t('signup.first')"
          type="text"
        />
        <v-text-field
          v-model="lastName"
          required
          :readonly="isLoading"
          :label="$t('signup.last')"
          type="text"
        />
        <v-text-field
          v-model="email"
          required
          :readonly="isLoading"
          :label="$t('signup.email')"
          type="email"
        />
        <v-text-field
          v-model="password"
          required
          :readonly="isLoading"
          :label="$t('signup.password')"
          type="password"
        />
        <v-btn
          color="primary"
          block
          :disabled="!form"
          :loading="isLoading"
          type="submit"
          >{{ $t("signup.action") }}</v-btn
        >
      </v-form>

      <v-divider class="my-4" />

      <p class="text-center hint-text">
        {{ $t("signup.already") }}
        <router-link to="login">{{ $t("signup.loginlink") }}</router-link>
      </p>

      <v-divider class="my-4" />

      <div class="d-flex justify-center">
        <lang-switcher />
      </div>
    </v-card>
  </div>
</template>

<script>
import LangSwitcher from "@/components/LangSwitcher.vue";
import { signUp } from "@/services/auth";

export default {
  components: { LangSwitcher },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      isLoading: false,
    };
  },
  computed: {
    fullName() {
      return this.firstName.trim() + " " + this.lastName.trim();
    },
    form() {
      if (this.firstName && this.lastName && this.email && this.password)
        return true;
      return false;
    },
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
};
</script>

<style scoped>
.hint-text {
  font-size: 0.9rem;
}
</style>
