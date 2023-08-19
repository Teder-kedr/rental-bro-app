<template>
  <div>
    <ProjectForm v-if="project" :project-to-edit="project" @submit="submit" />
    <ContentLoader v-else class="mt-4" />
  </div>
</template>

<script>
import ProjectForm from "@/components/projects/form/ProjectForm.vue";
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  components: {
    ProjectForm,
    ContentLoader,
  },
  data() {
    return {
      project: null,
    };
  },
  methods: {
    submit(form) {},
  },
  async created() {
    this.project = {
      title: "Interview scene",
      dates: ["2023-08-15", "2023-08-16", "2023-08-17"],
      details: {
        notes: "Don't forget batteries\nPassport is required!",
        location: "Bolshaya Novodmitrovskaya, 2",
        contacts: [
          { name: "Oleg", role: "producer", tel: "+79121234567" },
          { role: "admin", tel: "+79121234567" },
        ],
        engineer: { name: "Mikhail", tel: "+79998463971" },
        helpers: [
          { name: "Zhenya", tel: "+79998463971" },
          { name: "Zhenya", tel: "+79998463971" },
        ],
      },
      gearList: [
        {
          model: "Sennheiser EW 122P-G3 (rx)",
          type: "wireless",
          priceday: 400,
          qty: 4,
          id: "VMQGWB0Wjcek6n72xMhj",
        },
        {
          model: "Sennheiser EW 122P-G3 (tx)",
          type: "wireless",
          priceday: 400,
          qty: 4,
          id: "ZJKF1jXMQgFdzbJ75xcD",
        },
        {
          model: "Sennheiser MKE-2 Gold",
          type: "lavalier mic",
          priceday: 650,
          qty: 3,
          id: "on6BJWf0ykE1nH93KSRZ",
        },
        {
          model: "Zoom F8",
          type: "field recorder",
          priceday: 1700,
          qty: 4,
          id: "r2XGcN1FbqMkuyP5hEHT",
        },
      ],
      extras: [
        {
          name: "Engineer",
          price: 8000,
        },
        {
          name: "Lighting equipment",
          qty: 2,
          price: 1000,
        },
      ],
      id: "12345",
    };
  },
};
</script>
