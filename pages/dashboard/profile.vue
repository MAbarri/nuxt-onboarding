<script setup lang="ts">
import { ref } from "vue";
import SecondaryNavigation from "../../layouts/dashboard/SecondaryNavigation.vue";

const toast = useToast();

// Table columns
const columns = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "actions" },
];

// People data
const people = ref([
  { id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
  { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
  { id: 3, name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
]);

const selected = ref([]);
const newRow = ref({ name: "", title: "", email: "", role: "" });
const editRow = ref({ id: null, name: "", title: "", email: "", role: "" });
const isEditing = ref(false);
const showAddForm = ref(false);
const deleteConfirmation = ref({ id: null, name: "" });

// Add new row
const addRow = () => {
  if (newRow.value.name && newRow.value.title && newRow.value.email && newRow.value.role) {
    people.value.push({ id: people.value.length + 1, ...newRow.value });
    newRow.value = { name: "", title: "", email: "", role: "" };
    showAddForm.value = false;
  } else {
    toast.add({ title: "Please fill in all fields." });
  }
};

// Edit row
const startEditing = (row) => {
  editRow.value = { ...row };
  isEditing.value = true;
};

const saveEdit = () => {
  const index = people.value.findIndex((person) => person.id === editRow.value.id);
  if (index !== -1) {
    people.value[index] = { ...editRow.value };
    isEditing.value = false;
    editRow.value = { id: null, name: "", title: "", email: "", role: "" };
  }
};

// Show confirmation modal for delete
const confirmDelete = (row) => {
  deleteConfirmation.value = { id: row.id, name: row.name };
};

// Handle actual deletion
const handleDeleteConfirmed = () => {
  if (deleteConfirmation.value.id !== null) {
    people.value = people.value.filter((person) => person.id !== deleteConfirmation.value.id);
    deleteConfirmation.value = { id: null, name: "" }; // Reset after deletion
  }
};

const cancelDelete = () => {
  deleteConfirmation.value = { id: null, name: "" };
};

// Duplicate row
const duplicateRow = (row) => {
  people.value.push({ ...row, id: people.value.length + 1 });
};

// Dropdown items
const items = (row) => [
  [
    { label: "Edit", click: () => startEditing(row) },
    { label: "Duplicate", click: () => duplicateRow(row) },
  ],
  [
    { label: "Delete", click: () => confirmDelete(row) },
  ],
];
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
      <SecondaryNavigation />
      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <slot />
        <button @click="showAddForm = true" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4">Add New User</button>

        <!-- Add New User Modal -->
        <div v-if="showAddForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 class="text-lg font-semibold mb-4">Add New User</h3>
            <form @submit.prevent="addRow">
              <div class="mb-4">
                <label for="name">Name</label>
                <input id="name" v-model="newRow.name" type="text" class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-4">
                <label for="title">Title</label>
                <input id="title" v-model="newRow.title" type="text" class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-4">
                <label for="email">Email</label>
                <input id="email" v-model="newRow.email" type="email" class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-4">
                <label for="role">Role</label>
                <select id="role" v-model="newRow.role" class="mt-1 p-2 w-full border rounded">
                  <option>Member</option>
                  <option>Admin</option>
                  <option>Owner</option>
                </select>
              </div>
              <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                <button type="button" @click="showAddForm = false" class="ml-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="deleteConfirmation.id !== null" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded shadow-lg">
            <h3 class="text-lg font-semibold">Confirm Delete</h3>
            <p>Are you sure you want to delete {{ deleteConfirmation.name }}?</p>
            <div class="mt-4 flex justify-end space-x-4">
              <button @click="handleDeleteConfirmed" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
              <button @click="cancelDelete" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <UTable v-model="selected" :rows="people" :columns="columns">
          <template #name-data="{ row }"><span>{{ row.name }}</span></template>
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
      </main>
    </div>
  </div>
</template>
