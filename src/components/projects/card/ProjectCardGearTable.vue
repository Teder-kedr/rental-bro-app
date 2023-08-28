<template>
  <v-table
    v-if="project.gearList.length || project.extras.length"
    density="compact"
    class="my-card-table me-lg-2"
  >
    <thead>
      <tr>
        <th class="px-0">{{ $t("projects.form.item") }}</th>
        <th class="text-right">{{ $t("projects.form.qty") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of project.gearList" :key="item.id">
        <td class="px-0">{{ item.model }}</td>
        <td class="text-right">{{ item.qty }}</td>
      </tr>

      <tr v-for="(item, idx) of project.extras" :key="idx">
        <td class="px-0">{{ item.name }}</td>
        <td class="text-right">{{ item.qty || "-" }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>
