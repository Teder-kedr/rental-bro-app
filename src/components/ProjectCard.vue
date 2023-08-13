<template>
  <v-expansion-panel class="my-2 rounded-lg" :value="panelUniqueIndex">
    <v-expansion-panel-title>
      <v-card-title class="my-card-title pa-0">
        <v-icon size="x-small" class="me-1">mdi-movie-open</v-icon>
        {{ project.title }}
      </v-card-title>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" lg="6">
            <ProjectCardGearTable :project="project" />
          </v-col>
          <v-col
            cols="12"
            sm="8"
            lg="6"
            class="my-card-text py-5 d-lg-flex align-center"
          >
            <ProjectCardDetails :project="project" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="mt-4 mt-lg-0">
        <v-btn
          variant="text"
          color="primary"
          class="ms-auto"
          :to="'project/' + project.id"
        >
          Details
        </v-btn>
      </v-card-actions>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
import ProjectCardDetails from "./ProjectCardDetails.vue";
import ProjectCardGearTable from "./ProjectCardGearTable.vue";

export default {
  components: {
    ProjectCardDetails,
    ProjectCardGearTable,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
    panelUniqueIndex: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.my-card-title {
  font-size: 1.25rem;
  font-weight: 400;

  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.my-card-table {
  background-color: transparent;
  font-size: 0.9rem;
}
.my-card-text {
  font-size: 1rem;
  font-weight: 400;
}
</style>
