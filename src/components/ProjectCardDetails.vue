<template>
  <div class="ms-lg-2">
    <p class="mb-2">
      <span class="detail-title">Engineer:</span>
      {{ project.engineer.name }} {{ project.engineer.tel }}
    </p>

    <p v-if="project.helpers.length" class="mb-2">
      <span class="detail-title">Helpers: </span>
      <span v-for="(person, idx) of project.helpers" :key="person.tel">
        {{ person.name }} {{ person.tel
        }}<span v-if="idx !== project.helpers.length - 1">, </span>
      </span>
    </p>

    <p v-if="project.contacts.length" class="mb-2">
      <span class="detail-title">Contacts: </span>
      <span v-for="person of project.contacts" :key="person.tel">
        {{ person.name }} {{ person.tel }} ({{ person.role }})<span
          v-if="project.contacts.length > 1"
          ><br
        /></span>
      </span>
    </p>

    <p v-if="project.location" class="mb-2">
      <span class="detail-title">Location: </span>
      {{ project.location }}
    </p>

    <p v-if="project.notes" class="my-notes">{{ project.notes }}</p>
  </div>
</template>

<style>
.detail-title {
  font-weight: 500;
  color: grey;
}
.my-notes {
  font-weight: bold;
  white-space: pre-line;
}
</style>

<script>
export default {
  props: {
    project: {
      required: true,
      type: Object,
    },
  },
};
</script>
