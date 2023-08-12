<template>
  <v-expansion-panel class="my-2" :value="panelUniqueIndex">
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
            <v-table density="compact" class="my-card-table me-lg-2">
              <thead>
                <tr>
                  <th class="px-0">Item</th>
                  <th class="text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) of Object.entries(project.gearList)"
                  :key="idx"
                >
                  <td class="px-0">{{ item[0] }}</td>
                  <td class="text-right">{{ item[1] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            lg="6"
            class="my-card-text py-2 d-lg-flex align-center"
          >
            <project-card-details :project="project" />
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

<style scoped>
.my-card:hover {
  background: linear-gradient(90deg, hsl(286, 47%, 94%), hsl(192, 51%, 94%));
}
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

<script>
import ProjectCardDetails from "./ProjectCardDetails.vue";

export default {
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
  components: {
    ProjectCardDetails,
  },
};
</script>
