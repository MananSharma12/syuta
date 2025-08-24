<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.preference === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <nav class="my-8">
    <UContainer class="flex justify-between">
      <div class="flex items-center-safe">
        <Icon name="material-symbols:account-balance-wallet-outline" class="text-4xl font-bold"/>
        <h1 class="text-3xl font-bold ml-2">Syūta</h1>
        <UBadge color="primary" class="font-bold ml-1">v0.1</UBadge>
      </div>

      <div class="mt-2">
        <USwitch
            v-model="isDark"
            size="xl"
            unchecked-icon="material-symbols:light-mode"
            checked-icon="material-symbols:dark-mode"
        />
      </div>
    </UContainer>
  </nav>
</template>
