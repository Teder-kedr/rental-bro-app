<template>
  <div>
    <div>
      <v-btn-toggle v-model="selOption" mandatory density="compact">
        <v-btn flat value="$">$</v-btn>

        <v-btn flat value="€">€</v-btn>

        <v-btn flat value="₽">₽</v-btn>

        <v-btn flat value="custom">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <div v-if="selOption === 'custom'" class="mt-2">
      <v-text-field
        v-model="customText"
        flat
        hide-details
        density="compact"
        variant="solo"
        maxlength="6"
        placeholder="custom"
        spellcheck="false"
      >
        <template #append>
          <v-btn
            :disabled="buttonRule()"
            variant="tonal"
            append-icon="mdi-check"
            color="success"
            flat
            height="100%"
            @click="handleSaveCustomText"
          >
            save
          </v-btn>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script>
import { updateUserSettings } from "@/services/firestore";

export default {
  data() {
    return {
      selOption: null,
      customText: "",
    };
  },
  computed: {
    storedCurrency() {
      return this.$store.state.userSettings.currency;
    },
  },
  watch: {
    async selOption(newValue) {
      if (["$", "€", "₽"].includes(newValue)) {
        this.$store.dispatch("addUserSettings", { currency: newValue });
        await updateUserSettings(this.$store.state.user.uid, {
          currency: newValue,
        });
      }
    },
  },
  methods: {
    handleSaveCustomText() {
      this.$store.dispatch("addUserSettings", { currency: this.customText });
      updateUserSettings(this.$store.state.user.uid, {
        currency: this.customText,
      });
    },
    buttonRule() {
      return (
        this.customText === this.storedCurrency || this.customText.trim() === ""
      );
    },
  },
  mounted() {
    if (["$", "€", "₽"].includes(this.storedCurrency)) {
      this.selOption = this.storedCurrency;
    } else {
      this.selOption = "custom";
      this.customText = this.storedCurrency;
    }
  },
};
</script>

<style scoped>
.my-currency-field {
  width: 100px;
  max-width: 100px;
}
</style>
