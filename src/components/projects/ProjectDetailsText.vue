<template>
  <div>
    <v-container v-if="!allFieldsEmpty" class="pa-0 mt-4">
      <v-row>
        <v-col>
          <v-divider class="mb-6" />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col v-if="!rightSideEmpty" cols="12" md="6">
          <p
            v-if="project.details.engineer.name || project.details.engineer.tel"
            class="mb-2"
          >
            <span class="detail-title">{{ $t("projects.form.engineer") }}:</span
            ><br />
            {{ project.details.engineer.name }}
            <PhoneTooltip
              v-if="project.details.engineer.tel"
              :phone-number="project.details.engineer.tel"
            />
          </p>

          <p v-if="project.details.helpers.length" class="mb-2">
            <span class="detail-title">{{ $t("projects.form.helpers") }}: </span
            ><br />
            <span v-for="(person, idx) of project.details.helpers" :key="idx">
              {{ person.name }}
              <PhoneTooltip v-if="person.tel" :phone-number="person.tel" /><span
                v-if="idx !== project.details.helpers.length - 1"
                ><br
              /></span>
            </span>
          </p>

          <p v-if="project.details.contacts.length" class="mb-2">
            <span class="detail-title"
              >{{ $t("projects.form.contacts") }}: </span
            ><br />
            <span v-for="(person, idx) of project.details.contacts" :key="idx">
              <span v-if="person.name"> {{ person.name + " " }} </span>
              <PhoneTooltip v-if="person.tel" :phone-number="person.tel" />
              <span v-if="person.role"> ({{ person.role }}) </span
              ><span v-if="project.details.contacts.length > 1"><br /></span>
            </span>
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p v-if="project.details.location" class="mb-2">
            <span class="detail-title"
              >{{ $t("projects.form.location") }}: </span
            ><br />
            {{ project.details.location }}
          </p>

          <p v-if="project.details.notes" class="my-notes">
            <span class="detail-title">{{ $t("projects.form.notes") }}:</span
            ><br />
            {{ project.details.notes }}
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-divider class="mb-4" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PhoneTooltip from "@/components/PhoneTooltip.vue";

export default {
  components: { PhoneTooltip },
  props: ["project"],
  computed: {
    allFieldsEmpty() {
      return this.project.details.location ||
        this.project.details.notes ||
        this.project.details.engineer.name ||
        this.project.details.engineer.tel ||
        this.project.details.contacts.length ||
        this.project.details.helpers.length
        ? false
        : true;
    },
    rightSideEmpty() {
      return this.project.details.engineer.name ||
        this.project.details.engineer.tel ||
        this.project.details.contacts.length ||
        this.project.details.helpers.length
        ? false
        : true;
    },
  },
};
</script>

<style scoped>
.detail-title {
  font-weight: 500;
  color: grey;
}

.my-notes {
  font-weight: bold;
  white-space: pre-line;
}
</style>
