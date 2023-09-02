<template>
  <div class="ms-lg-2">
    <p v-if="info.engineer.name" class="mb-2">
      <span class="detail-title">{{ $t("projects.form.engineer") }}:</span>
      {{ info.engineer.name }}
      <span v-if="info.engineer.tel" class="text-tel"
        >+{{ info.engineer.tel }}</span
      >
    </p>

    <p v-if="info.helpers.length" class="mb-2">
      <span class="detail-title">{{ $t("projects.form.helpers") }}: </span>
      <span v-for="(person, idx) of info.helpers" :key="idx">
        {{ person.name }}
        <span v-if="person.tel" class="text-tel">+{{ person.tel }}</span
        ><span v-if="idx !== info.helpers.length - 1">, </span>
      </span>
    </p>

    <p v-if="info.contacts.length" class="mb-2">
      <span class="detail-title">{{ $t("projects.form.contacts") }}: </span>
      <span v-for="(person, idx) of info.contacts" :key="idx">
        <span v-if="person.name"> {{ person.name + " " }} </span>
        <span v-if="person.tel" class="text-tel"> +{{ person.tel }} </span>
        <span v-if="person.role"> ({{ person.role }}) </span
        ><span v-if="info.contacts.length > 1"><br /></span>
      </span>
    </p>

    <p v-if="info.location" class="mb-2">
      <span class="detail-title">{{ $t("projects.form.location") }}: </span>
      {{ info.location }}
    </p>

    <p v-if="info.notes" class="my-notes">{{ info.notes }}</p>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      required: true,
      type: Object,
    },
  },
  computed: {
    info() {
      return this.project.details;
    },
  },
};
</script>

<style scoped>
.detail-title {
  font-weight: 500;
  color: grey;
}
.text-tel {
  font-weight: 500;
  white-space: nowrap;
}
.my-notes {
  font-weight: bold;
  white-space: pre-line;
}
</style>
