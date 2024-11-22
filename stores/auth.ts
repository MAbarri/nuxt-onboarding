export const useAuthStore = defineStore("auth", () => {
  const isSignInModalOpen = ref(false);
  const isSignUpModalOpen = ref(false);
  const toggleSignInModal = (value?: boolean) => {
    isSignInModalOpen.value = value ? value : !isSignInModalOpen.value;
  };
  const toggleSignUpModal = (value?: boolean) => {
    isSignUpModalOpen.value = value ? value : !isSignUpModalOpen.value;
  };

return {
  isSignUpModalOpen,
  toggleSignUpModal,
  isSignInModalOpen,
  toggleSignInModal,
  
} as const;
 
    

  
});




/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
