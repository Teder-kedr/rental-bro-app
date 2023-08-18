<template>
  <v-card flat height="100%" color="transparent" style="border-radius: 0">
    <v-container class="pa-0">
      <h1 class="mb-2">{{ title || "New project" }}</h1>
      <p class="mb-6 my-subtext">Step {{ currentStep }} of 4</p>
      <v-form>
        <v-window v-model="currentStep" :touch="{ left: null, right: null }">
          <v-window-item :value="1">
            <StepOne
              v-model:title="title"
              v-model:dates="dates"
              v-model:location="details.location"
            />
          </v-window-item>
          <v-window-item :value="2">
            <StepTwo
              v-model:engineer="details.engineer"
              v-model:helpers="details.helpers"
              v-model:contacts="details.contacts"
            />
          </v-window-item>
          <v-window-item :value="3">
            <StepThree v-model:gear-list="gearList" v-model:extras="extras" />
          </v-window-item>
          <v-window-item :value="4">
            <StepFour v-model:notes="details.notes" />
          </v-window-item>
        </v-window>
      </v-form>

      <v-divider class="mt-8 mb-4" />
    </v-container>
    <div class="d-flex justify-end">
      <v-card-actions style="position: sticky; bottom: 1rem">
        <v-btn
          v-if="currentStep > 1"
          size="large"
          prepend-icon="mdi-arrow-left"
          @click="currentStep--"
          >back</v-btn
        >
        <v-btn
          v-if="currentStep < 4"
          size="large"
          append-icon="mdi-arrow-right"
          @click="handleNext"
          >next</v-btn
        >
        <v-btn
          v-if="currentStep === 4"
          size="large"
          color="success"
          append-icon="mdi-check"
          variant="text"
          flat
          @click="console.log(form)"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import StepOne from "@/components/projects/form/StepOne.vue";
import StepTwo from "@/components/projects/form/StepTwo.vue";
import StepThree from "@/components/projects/form/StepThree.vue";
import StepFour from "@/components/projects/form/StepFour.vue";

export default {
  components: { StepOne, StepTwo, StepThree, StepFour },
  data() {
    return {
      title: null,
      dates: null,
      details: {
        notes: null,
        location: null,
        contacts: [{}],
        engineer: {},
        helpers: [],
      },
      gearList: [],
      extras: [],
      id: null,
      currentStep: 1,
    };
  },
  computed: {
    form() {
      //to be removed
      const details = this.details;
      return {
        title: this.title,
        dates: this.dates,
        details,
        gearList: this.gearList,
        extras: this.extras,
      };
    },
  },
  methods: {
    handleNext() {
      if (!this.title && this.currentStep === 1) {
        this.$store.dispatch("handleNewError", "Title is required!");
        return;
      }
      this.currentStep++;
    },
  },
};
</script>

<style scoped>
.my-subtext {
  color: grey;
  font-size: 1.1rem;
  font-weight: 500;
}
</style>

<style>
.my-label {
  font-size: 1.1rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
}
</style>
