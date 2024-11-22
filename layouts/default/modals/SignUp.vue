<template>
    <UModal v-model="authStore.isSignUpModalOpen" >
     <form > 
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
</UModal>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const authStore = useAuthStore();
  const username = ref('')
  const password = ref('')
  
  const handleSignUp = async () => {
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { username: username.value, password: password.value },
      })
  
      if (response.status === 'success') {
        alert('Sign-up successful!')
      }
    } catch (error) {
      console.error('Sign-up failed:', error)
    }
  }
  </script>