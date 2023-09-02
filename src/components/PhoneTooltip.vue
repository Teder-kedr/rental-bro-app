<template>
  <span>
    +{{ phoneNumber }}
    <a :href="tgLink" target="_blank" rel="noopener">
      <v-icon>
        <img src="@/assets/tg.svg" height="18" width="18" alt="telegram logo" />
      </v-icon>
    </a>
    <a :href="waLink" target="_blank" rel="noopener">
      <v-icon class="ms-1">
        <img src="@/assets/wa.svg" height="18" width="18" alt="whatsapp logo" />
      </v-icon>
    </a>
  </span>
</template>

<script>
import formatPhoneNumber from "@/services/phoneNumberFormatter";

export default {
  props: {
    phoneNumber: String,
  },
  computed: {
    formattedNumber() {
      return formatPhoneNumber(this.phoneNumber);
    },
    tgLink() {
      return `https://t.me/+${this.formattedNumber}`;
    },
    waLink() {
      return `https://wa.me/${this.formattedNumber}`;
    },
  },
};
</script>

<style scoped>
span {
  font-weight: 500;
  white-space: nowrap;
}
</style>
