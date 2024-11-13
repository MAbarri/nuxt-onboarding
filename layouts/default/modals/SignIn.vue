<script setup lang="ts">
import { ref } from "vue";

const { signIn } = useAuth();

const signInLoading = ref(false);
const authStore = useAuthStore();
const toast = useToast();

/* const displayError = () => {
  toast.add({
    id: '1',
    title: 'error', // This sets the toast type to error
    description: 'incorrect username or password'
  });

 
}  */
/* 
const email = ref('');
const password = ref('') */

/* const logInWith = async (provider: string) => {
  signInLoading.value = true;
  await signIn(provider, { callbackUrl: "/dashboard?signInCallback=true" });
  setTimeout(() => {
    signInLoading.value = false;
    authStore.toggleSignInModal();
  }, 500); 
};*/

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const usernameError = ref(false);
const passwordError = ref(false);

// Simulate login logic for demonstration (replace with actual API call)
const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'correctUsername' && password === 'correctPassword') {
        resolve(true);
      } else {
        reject('Incorrect username or password');
      }
    }, 2000);
  });
};

const handleLogin = async () => {
  // Reset errors
  usernameError.value = !username.value;
  passwordError.value = !password.value;
  errorMessage.value = '';

  // Check for empty fields
  if (!username.value || !password.value) {
    errorMessage.value = "Please fill out all fields.";
    return;
  }

  // Attempt login if fields are filled
  try {
    await mockLogin(username.value, password.value);
    errorMessage.value = ''; // Clear error if login is successful
    // Proceed with login (e.g., redirect to another page)
  } catch (error) {
    errorMessage.value = error; // Show incorrect username/password error
  }
};
</script>
<template>
  <UModal v-model="authStore.isSignInModalOpen" closable>
    <form
    class="space-y-4 md:space-y-6 p-5"
    @submit.prevent="
      signIn('credentials', { username: username, password: password })
    "
  >
    <div>
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >username</label
      >
      <input
        v-model="username"
        type="username"
        name="username"
        id="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@company.com"
        :error="usernameError"
        required
      />
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        v-model="password"
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :error="usernameError"
        required
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="remember" class="text-gray-500 dark:text-gray-300"
            >Remember me</label
          >
        </div>
      </div>
      <a
        href="#"
        class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >Forgot password?</a
      >
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <button
    @click="handleLogin" 

      type="submit"
      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Sign in
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet?
      <a
        href="#"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >Sign up</a
      >
    </p>
  </form>
  </UModal>
</template>
<style scoped>
.error-message {
  color: red;
  margin-top: 8px;
}
</style>
