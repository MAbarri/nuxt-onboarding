<script setup lang="ts">
import { ref } from "vue";
import SecondaryNavigation from "../../layouts/dashboard/SecondaryNavigation.vue";
const toast = useToast();

// Table columns
const columns = [
  { key: "name", label: "Name" },
  { key: "actions" },
];

// People data
const people = ref([
  { id: 1, name: "Lindsay Walton" },
  { id: 2, name: "Courtney Henry" },
  { id: 3, name: "Tom Cook" },
]);

// Selected rows
const selected = ref([]);

// New row input
const newRow = ref({
  name: "",
});

// Edit row data
const editRow = ref({
  id: null,
  name: "",
});
const isEditing = ref(false);

// Function to add a new row
const addRow = () => {
  if (newRow.value.name) {
    people.value.push({
      id: people.value.length + 1,
      ...newRow.value,
    });
    newRow.value = { name: "" }; // Clear input
  } else {
    toast.add({ title: "Please fill in the name." });
  }
};

// Function to delete a row
const deleteRow = (id) => {
  people.value = people.value.filter((person) => person.id !== id);
};

// Function to start editing a row
const startEditing = (row) => {
  editRow.value = { ...row };
  isEditing.value = true;
};

// Function to save the edited row
const saveEdit = () => {
  const index = people.value.findIndex((person) => person.id === editRow.value.id);
  if (index !== -1) {
    people.value[index] = { ...editRow.value };
    isEditing.value = false;
    editRow.value = { id: null, name: "" };
  }
};

// Function to duplicate a row
const duplicateRow = (row) => {
  const newId = people.value.length + 1;
  people.value.push({ ...row, id: newId });
};

// Dropdown menu items
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => startEditing(row),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      click: () => duplicateRow(row),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteRow(row.id),
    },
  ],
];
</script>
<template>
  <div>
    <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
      <SecondaryNavigation />
      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <slot />

        <!-- Add New Row Form -->
        <form @submit.prevent="addRow" class="mb-8 p-4 border rounded-lg bg-gray-50">
          <h3 class="text-lg font-semibold mb-4">Add New User</h3>
          <div>
            <label for="name" class="block text-sm font-medium">Name</label>
            <input
              id="name"
              v-model="newRow.name"
              type="text"
              placeholder="Enter name"
              class="mt-1 p-2 w-full border rounded"
            />
          </div>
          <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add User
          </button>
        </form>

        <!-- Edit Modal -->
        <div
          v-if="isEditing"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
        >
          <div class="bg-white p-6 rounded shadow-lg">
            <h3 class="text-lg font-semibold mb-4">Edit Row</h3>
            <form @submit.prevent="saveEdit">
              <div class="mb-4">
                <label class="block text-sm font-medium">Name</label>
                <input
                  v-model="editRow.name"
                  type="text"
                  class="mt-1 p-2 w-full border rounded"
                />
              </div>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
              <button
                type="button"
                @click="isEditing = false"
                class="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        <!-- Table -->
        <UTable v-model="selected" :rows="people" :columns="columns">
          <template #name-data="{ row }">
            <span>{{ row.name }}</span>
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
        </UTable>
      </main>
    </div>
  </div>
</template>
