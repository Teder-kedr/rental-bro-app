<template>
  <v-card flat height="100%" color="transparent" style="border-radius: 0">
    <v-container class="pa-0">
      <h1 class="mb-2">{{ project.title || "New project" }}</h1>
      <p class="mb-6 my-subtext">Step {{ currentStep }} of 4</p>
      <v-form v-model="isFormValid" ref="myForm">
        <v-window v-model="currentStep" :touch="{ left: null, right: null }">
          <v-window-item :value="1">
            <p class="my-label">
              Project title:
              <span class="text-grey" style="font-weight: 400">
                <em>(required)</em>
              </span>
            </p>
            <v-text-field
              v-model="project.title"
              flat
              variant="solo"
              spellcheck="false"
              placeholder="example: Podcast recording"
              :rules="[isNotEmpty]"
            />

            <p class="my-label">
              Date:
              <span class="text-grey" style="font-weight: 400">
                <em>(required)</em>
              </span>
            </p>
            <MyDatePicker
              :provided-dates="project.dates"
              @change="updateDates"
            />

            <p class="mt-sm-4 my-label">Location:</p>
            <v-text-field
              v-model="project.details.location"
              density="compact"
              flat
              variant="solo"
              spellcheck="false"
              placeholder="example: Penny Lane, 24/2"
            />
          </v-window-item>

          <v-window-item :value="2">
            <p class="my-label">Engineer:</p>
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="project.details.engineer.name"
                  density="compact"
                  flat
                  variant="solo"
                  label="Name"
                  class="me-sm-4"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="project.details.engineer.tel"
                  density="compact"
                  flat
                  variant="solo"
                  type="tel"
                  label="Phone number"
                  class="ms-sm-4"
                />
              </v-col>
            </v-row>
            <p v-if="project.details.helpers.length" class="my-label">
              Helpers:
            </p>
            <v-row
              v-for="(person, idx) of project.details.helpers"
              :key="idx"
              no-gutters
            >
              <v-col cols="12">
                <p
                  class="small-count"
                  v-if="project.details.helpers.length > 1"
                >
                  {{ idx + 1 }}.
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="person.name"
                  density="compact"
                  flat
                  variant="solo"
                  label="Name"
                  class="me-sm-4"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="person.tel"
                  density="compact"
                  flat
                  variant="solo"
                  type="tel"
                  label="Phone number"
                  class="ms-sm-4"
                />
              </v-col>
              <v-btn
                v-if="project.details.helpers.length"
                block
                flat
                prepend-icon="mdi-minus"
                append-icon="mdi-account"
                class="mb-4"
                @click="project.details.helpers.splice(idx, 1)"
              >
                Remove helper
              </v-btn>
            </v-row>

            <v-btn
              block
              flat
              prepend-icon="mdi-plus"
              append-icon="mdi-account"
              @click="project.details.helpers.push({})"
            >
              Add helper
            </v-btn>

            <p class="my-label mt-4">Contacts:</p>
            <v-row
              v-for="(person, idx) of project.details.contacts"
              :key="idx"
              no-gutters
            >
              <v-col cols="12">
                <p
                  class="small-count"
                  v-if="project.details.contacts.length > 1"
                >
                  {{ idx + 1 }}.
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="person.name"
                  density="compact"
                  flat
                  variant="solo"
                  label="Name"
                  class="me-sm-4 me-md-2"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="person.tel"
                  density="compact"
                  flat
                  variant="solo"
                  type="tel"
                  label="Phone number"
                  class="ms-sm-4 ms-md-2 me-md-2"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="person.role"
                  density="compact"
                  flat
                  variant="solo"
                  label="Role"
                  class="ms-md-2"
                />
              </v-col>
              <v-btn
                v-if="project.details.contacts.length > 1"
                block
                flat
                prepend-icon="mdi-minus"
                append-icon="mdi-account"
                class="mb-4"
                @click="project.details.contacts.splice(idx, 1)"
              >
                Remove contact
              </v-btn>
            </v-row>

            <v-btn
              block
              flat
              prepend-icon="mdi-plus"
              append-icon="mdi-account"
              @click="project.details.contacts.push({})"
            >
              Add contact
            </v-btn>
          </v-window-item>

          <v-window-item :value="3">
            <p class="my-label">Gear:</p>

            <v-table
              v-if="project.gearList.length"
              density="compact"
              class="my-table py-sm-2"
            >
              <thead>
                <tr>
                  <th class="px-0">Item</th>
                  <th class="text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item of project.gearList"
                  :key="item.id"
                  :class="{
                    'text-warning': availabilityMap[item.id] < item.qty,
                  }"
                >
                  <td
                    class="px-0"
                    :class="{
                      'crossed-out': !checkItemStillExists(item),
                      'text-error': !checkItemStillExists(item),
                    }"
                  >
                    {{ item.model }}
                  </td>
                  <td class="text-right">{{ item.qty }}</td>
                </tr>
                <tr>
                  <th class="px-0">Total:</th>
                  <th class="text-right">
                    {{ currencify(gearTotal, currency) }}
                  </th>
                </tr>
              </tbody>
            </v-table>

            <ItemNotExistAlert v-if="itemNotExistAlertShown" />
            <ItemOverbookAlert v-if="overbookAlertShown" />

            <v-btn
              block
              flat
              prepend-icon="mdi-plus"
              class="mt-2"
              @click="isGearPickerOpen = true"
            >
              Add gear from my inventory
            </v-btn>
            <GearPicker
              v-model="isGearPickerOpen"
              v-model:project-gear-list="project.gearList"
              :date-array="project.dates"
              :projectId="project.id"
              @emit-map="availabilityMap = $event"
            />

            <p class="my-label mt-8">Extra gear and expenses:</p>
            <v-row v-for="(item, idx) of project.extras" :key="idx" no-gutters>
              <v-col cols="12">
                <p class="small-count" v-if="project.extras.length > 1">
                  {{ idx + 1 }}.
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="item.name"
                  label="Name"
                  spellcheck="false"
                  flat
                  variant="solo"
                  density="compact"
                  class="me-sm-2"
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  v-model="item.price"
                  label="Price for one"
                  flat
                  type="number"
                  variant="solo"
                  density="compact"
                  class="hide-spinners me-2 mx-sm-2"
                  @keydown.up.prevent
                  @keydown.down.prevent
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  v-model="item.qty"
                  label="Quantity"
                  flat
                  type="number"
                  variant="solo"
                  density="compact"
                  class="hide-spinners ms-2"
                  @keydown.up.prevent
                  @keydown.down.prevent
                />
              </v-col>
              <v-btn
                v-if="project.extras.length"
                block
                flat
                prepend-icon="mdi-minus"
                class="mb-4"
                @click="project.extras.splice(idx, 1)"
              >
                Remove item
              </v-btn>
            </v-row>
            <p v-if="extrasTotal !== 0" class="my-total mb-4">
              Total: {{ currencify(extrasTotal, currency) }}
            </p>
            <v-btn
              block
              flat
              prepend-icon="mdi-plus"
              class="mt-2"
              @click="project.extras.push({})"
              >Add item</v-btn
            >
          </v-window-item>

          <v-window-item :value="4">
            <p class="my-label">Notes:</p>
            <v-textarea
              v-model="project.details.notes"
              spellcheck="false"
              flat
              variant="solo"
              style="white-space: pre-line"
            />
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
import MyDatePicker from "@/components/MyDatePicker.vue";
import GearPicker from "@/components/GearPicker.vue";
import ItemOverbookAlert from "@/components/ItemOverbookAlert.vue";
import ItemNotExistAlert from "@/components/ItemNotExistAlert.vue";
import { getGearList } from "@/services/firestore";
import currencify from "@/services/currencify";

export default {
  components: {
    MyDatePicker,
    GearPicker,
    ItemOverbookAlert,
    ItemNotExistAlert,
  },
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
      myInventory: [],
      currentStep: 1,
      isFormValid: false,
      isLoading: false,
      isAwaitingSubmit: false,
      inventoryLoaded: false,
      isGearPickerOpen: false,
      availabilityMap: {},
    };
  },
  computed: {
    form() {
      return {
        title: this.project.title,
        dates: this.project.dates,
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
    gearTotal() {
      return this.project.gearList.reduce(
        (acc, item) => item.priceday * item.qty + acc,
        0
      );
    },
    extrasTotal() {
      return this.project.extras.reduce((acc, item) => {
        if (item.price) {
          return item.price * (item.qty || 1) + acc;
        } else return acc;
      }, 0);
    },
    currency() {
      return this.$store.state.userSettings.currency;
    },
    overbookAlertShown() {
      let result = false;
      if (this.availabilityMap) {
        this.project.gearList.forEach((item) => {
          if (this.availabilityMap[item.id] < item.qty) {
            result = true;
            return;
          }
        });
      }
      return result;
    },
    itemNotExistAlertShown() {
      let result = false;
      if (this.myInventory) {
        this.project.gearList.forEach((item) => {
          if (!this.checkItemStillExists(item)) {
            result = true;
            return;
          }
        });
      }
      return result;
    },
  },
  methods: {
    updateDates(newValue) {
      this.project.dates = newValue;
    },
    checkItemStillExists(item) {
      if (!this.inventoryLoaded) return true;
      return this.myInventory.find((i) => i.id === item.id);
    },
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
    isNotEmpty(val) {
      if (val && val.trim() === "") return false;
      return !!val;
    },
    currencify,
  },
  async created() {
    if (this.projectToEdit) {
      this.project = this.projectToEdit;
    }
    try {
      this.myInventory = await getGearList();
    } catch (error) {
      this.$store.dispatch("handleNewError", error.message);
    } finally {
      this.inventoryLoaded = true;
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
.my-table {
  background-color: transparent;
  font-size: 0.9rem;
}
.my-total {
  font-size: 0.9rem;
  font-weight: 500;
}
.small-count {
  font-size: 0.825rem;
  color: grey;
  padding-block: 0.5rem;
}
.crossed-out {
  text-decoration: line-through;
}
.hide-spinners ::-webkit-inner-spin-button,
.hide-spinners ::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hide-spinners ::-moz-inner-spin-button,
.hide-spinners ::-moz-outer-spin-button {
  -moz-appearance: none;
  margin: 0;
}
.my-label {
  font-size: 1.1rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
}
</style>
