<template>
  <v-card flat height="100%" color="transparent" style="border-radius: 0">
    <v-container class="pa-0">
      <h1 class="mb-2">{{ project.title || "New project" }}</h1>
      <p class="mb-6 my-subtext">Step {{ currentStep }} of 4</p>
      <v-form v-model="isFormValid" ref="myForm">
        <v-window v-model="currentStep" :touch="{ left: null, right: null }">
          <v-window-item :value="1">
            <StepOne
              v-model:title="project.title"
              v-model:dates="project.dates"
              v-model:location="project.details.location"
            />
          </v-window-item>
          <v-window-item :value="2">
            <StepTwo
              v-model:engineer="project.details.engineer"
              v-model:helpers="project.details.helpers"
              v-model:contacts="project.details.contacts"
            />
          </v-window-item>
          <v-window-item :value="3">
            <StepThree
              v-model:gear-list="project.gearList"
              v-model:extras="project.extras"
            />
          </v-window-item>
          <v-window-item :value="4">
            <StepFour v-model:notes="project.details.notes" />
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
          :loading="isAwaitingSubmit"
          @click="handleSubmitClick"
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
import deepCopy from "@/services/deepCopy";
import { formatProjectDate } from "@/services/formatProjectDate";

export default {
  components: { StepOne, StepTwo, StepThree, StepFour },
  props: ["projectToEdit"],
  data() {
    return {
      project: {
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
      },
      projectId: null,
      currentStep: 1,
      isFormValid: false,
      isLoading: false,
      isAwaitingSubmit: false,
    };
  },
  computed: {
    form() {
      return {
        title: this.project.title,
        dates: formatProjectDate(this.project.dates),
        details: {
          notes: this.project.details.notes,
          location: this.project.details.location,
          engineer: this.project.details.engineer,
          helpers: this.removeUnusedFields(this.project.details.helpers),
          contacts: this.removeUnusedFields(this.project.details.contacts),
        },
        gearList: this.project.gearList,
        extras: this.removeUnusedFields(this.project.extras),
      };
    },
  },
  methods: {
    handleNext() {
      this.$refs.myForm.validate();
      if (!this.isFormValid) return;
      this.currentStep++;
    },
    handleSubmitClick() {
      this.isAwaitingSubmit = true;
      this.$emit("submit", this.form);
    },
    removeUnusedFields(arr) {
      return arr.filter((item) => item.name || item.tel || item.role);
    },
  },
  async created() {
    if (this.projectToEdit) {
      this.project = deepCopy(this.projectToEdit);
    }
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
