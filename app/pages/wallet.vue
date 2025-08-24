<script setup lang="ts">
const toast = useToast();
const seedPhrase = ref('');

function generateWallet() {
  toast.add({
    title: 'Wallet generated',
    description: 'Your wallet has been generated successfully',
    color: 'success',
  });
}
</script>

<template>
  <UContainer>
    <h1 class="tracking-tighter text-4xl md:text-5xl font-bold">Secret Recovery Phrase</h1>
    <p class="text-xl text-neutral-300 mt-2">Save these words in a safe place</p>

    <div class="flex items-end mt-4">
      <UInput
          v-model="seedPhrase"
          placeholder="Enter your 12 word secret phrase separated by commas (or leave blank to generate)"
          size="xl"
          class="w-full"
      />
      <UButton class="ml-2" size="xl" icon="material-symbols:add" @click="generateWallet">Generate</UButton>
    </div>
  </UContainer>
</template>
