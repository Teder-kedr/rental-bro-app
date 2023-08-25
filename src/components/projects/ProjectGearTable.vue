<template>
  <v-container
    v-if="project.gearList.length || project.extras.length"
    class="py-4 ps-0 pe-0"
  >
    <v-row v-for="item of project.gearList" :key="item.id">
      <v-col cols="12" md="6" class="pb-2">
        <span
          style="font-weight: 500"
          :class="{
            'text-warning': availabilityMap[item.id] < item.qty,
            'text-error crossed-out': !checkItemStillExists(item),
          }"
        >
          {{ item.model }}
        </span>
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{ 'text-right': !isSmAndDown }"
      >
        {{ currencify(item.priceday, currency) }}
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{
          'text-right': !isSmAndDown,
          'text-center': isSmAndDown,
        }"
      >
        {{ item.qty }} pcs.
      </v-col>
      <v-col cols="4" md="2" class="text-right pt-0 pt-md-2">
        = {{ currencify(countTotal(item.priceday, item.qty), currency) }}
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-for="item of project.extras" :key="item.id">
      <v-col cols="12" md="6" class="pb-2">
        <span style="font-weight: 500">{{ item.name }}</span>
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{ 'text-right': !isSmAndDown }"
      >
        {{ item.price ? currencify(item.price, currency) : "-" }}
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{
          'text-right': !isSmAndDown,
          'text-center': isSmAndDown,
        }"
      >
        {{ item.qty ? "* " + item.qty : "-" }}
      </v-col>
      <v-col cols="4" md="2" class="text-right pt-0 pt-md-2">
        {{
          item.price
            ? "= " + currencify(countTotal(item.price, item.qty), currency)
            : "-"
        }}
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-if="allItemsTotal > 0" class="mb-2">
      <v-col cols="6">
        <p>Total:</p>
      </v-col>
      <v-col cols="6">
        <p class="text-right">{{ currencify(allItemsTotal, currency) }}</p>
      </v-col>
    </v-row>

    <ItemNotExistAlert v-if="itemNotExistAlertShown" />
    <ItemOverbookAlert v-if="overbookAlertShown" />
  </v-container>
</template>

<script>
import ItemNotExistAlert from "../ItemNotExistAlert.vue";
import ItemOverbookAlert from "../ItemOverbookAlert.vue";
import currencify from "@/services/currencify";

export default {
  components: { ItemNotExistAlert, ItemOverbookAlert },
  props: ["project", "availabilityMap", "myInventory"],
  computed: {
    allItemsTotal() {
      return (
        this.project.gearList.reduce(
          (acc, item) => item.priceday * item.qty + acc,
          0
        ) +
        this.project.extras.reduce(
          (acc, item) => (item.price || 0) * (item.qty || 1) + acc,
          0
        )
      );
    },
    currency() {
      return this.$store.state.userSettings.currency;
    },
    isSmAndDown() {
      return this.$vuetify.display.smAndDown;
    },
    overbookAlertShown() {
      let result = false;
      if (this.availabilityMap) {
        this.project.gearList.forEach((item) => {
          if (this.availabilityMap[item.id] < item.qty) {
            result = true;
            return;
          }
        });
      }
      return result;
    },
    itemNotExistAlertShown() {
      let result = false;
      if (this.myInventory.length) {
        this.project.gearList.forEach((item) => {
          if (!this.checkItemStillExists(item)) {
            result = true;
            return;
          }
        });
      }
      return result;
    },
  },
  methods: {
    countTotal(price, qty = 1) {
      return price * qty;
    },
    checkItemStillExists(item) {
      if (!this.myInventory.length) return true;
      return this.myInventory.find((i) => i.id === item.id);
    },
    currencify,
  },
};
</script>

<style scoped>
.crossed-out {
  text-decoration: line-through;
}
</style>
