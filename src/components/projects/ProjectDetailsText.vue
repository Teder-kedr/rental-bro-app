<template>
  <div class="mt-4">
    <p v-if="project.details.engineer" class="mb-2">
      <span class="detail-title">Engineer:</span><br />
      {{ project.details.engineer.name }}
      <span v-if="project.details.engineer.tel" class="text-tel">{{
        project.details.engineer.tel
      }}</span>
    </p>

    <p v-if="project.details.helpers.length" class="mb-2">
      <span class="detail-title">Helpers: </span><br />
      <span v-for="(person, idx) of project.details.helpers" :key="idx">
        {{ person.name }}
        <span v-if="person.tel" class="text-tel">{{ person.tel }}</span
        ><span v-if="idx !== project.details.helpers.length - 1"><br /></span>
      </span>
    </p>

    <p v-if="project.details.contacts.length" class="mb-2">
      <span class="detail-title">Contacts: </span><br />
      <span v-for="(person, idx) of project.details.contacts" :key="idx">
        <span v-if="person.name"> {{ person.name + " " }} </span>
        <span v-if="person.tel" class="text-tel"> {{ person.tel }} </span>
        <span v-if="person.role"> ({{ person.role }}) </span
        ><span v-if="project.details.contacts.length > 1"><br /></span>
      </span>
    </p>

    <p v-if="project.details.location" class="mb-2">
      <span class="detail-title">Location: </span><br />
      <span class="text-loc">{{ project.details.location }}</span>
    </p>

    <p v-if="project.details.notes" class="my-notes">
      <span class="detail-title">Notes:</span><br />
      {{ project.details.notes }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["project"],
};
</script>

<style scoped>
.detail-title {
  font-weight: 500;
  color: grey;
}
.text-tel,
.text-loc {
  font-weight: 500;
}
.text-tel:hover,
.text-loc:hover {
  text-decoration: underline;
  cursor: pointer;
}

.my-notes {
  font-weight: bold;
  white-space: pre-line;
}
</style>
