<script setup lang="ts">
import { mnemonicToSeed, generateMnemonic } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';

import type { WalletObject } from "~/types";

const { copy, copied } = useClipboard();
const toast = useToast();

let hdNode: HDNodeWallet;
const seedPhrase = ref('');
const addresses = ref<WalletObject[]>([]);
let currentIndex = ref(0);

const generated = ref(true);
const showPrivateKey = ref(false)

async function generateWallet() {
  if (seedPhrase.value === '') {
    seedPhrase.value = generateMnemonic();
  }

  const seed = await mnemonicToSeed(seedPhrase.value);
  const derivationPath = `m/44'/60'/${currentIndex.value}'/0'`;
  hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);

  currentIndex.value++;
  addresses.value.push({
    address: wallet.address,
    privateKey: wallet.privateKey
  });

  toast.add({
    title: 'Wallet generated',
    description: 'Your HD wallet has been generated successfully!',
    color: 'success',
  });

  generated.value = false;
}

function addWallet() {
  const derivationPath = `m/44'/60'/${currentIndex.value}'/0'`;
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);

  currentIndex.value++;
  addresses.value.push({
    address: wallet.address,
    privateKey: wallet.privateKey
  });

  toast.add({
    title: 'New Wallet generated',
    description: 'Your new wallet has been generated successfully!',
    color: 'success',
  });
}
</script>

<template>
  <UContainer v-if="generated">
    <h1 class="tracking-tighter text-4xl md:text-5xl font-bold">Secret Recovery Phrase</h1>
    <p class="text-xl text-neutral-300 mt-2">Save these words in a safe place</p>

    <div class="flex items-end mt-4">
      <UInput
          v-model="seedPhrase"
          placeholder="Enter your 12 word secret phrase (or leave blank to generate)"
          size="xl"
          class="w-full"
      />
      <UButton class="ml-2" size="xl" icon="material-symbols:add" @click="generateWallet">Generate</UButton>
    </div>
  </UContainer>

  <UContainer v-else>
    <h1 class="tracking-tighter text-4xl md:text-5xl font-bold">Your ETH Wallet</h1>

    <UCollapsible class="w-full mt-8">
      <UButton
          size="xl"
          label="Your Secret Recovery Phrase"
          color="neutral"
          variant="subtle"
          trailing-icon="material-symbols:arrow-drop-down"
          block
      />

      <template #content>
        <div class="flex justify-between items-center mt-4">
          <p class="font-medium">Please never share the following secret recovery phrase with anyone.</p>

          <UButton
              icon="material-symbols:content-copy"
              size="xl"
          >
            Copy
          </UButton>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <UInput
              v-for="(seed, index) in seedPhrase.split(' ')"
              :key="index"
              :value="seed"
              size="xl"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator class="h-16" />

    <div class="flex justify-end">
      <UButton size="xl" icon="material-symbols:add" @click="addWallet">Add another wallet</UButton>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UCard
        v-for="(address, index) in addresses"
      >
        <h2 class="text-xl font-bold">Wallet {{ index + 1 }}</h2>

        <p class="font-medium text-neutral-300 mt-2">Public Key</p>
        <UInput
            :value="address.address"
            class="w-full"
        >
          <template #trailing>
            <UTooltip text="Copy to clipboard" :content="{ side: 'right' }">
              <UButton
                  :color="copied ? 'success' : 'neutral'"
                  variant="link"
                  size="sm"
                  :icon="copied ? 'material-symbols:copy-all' : 'material-symbols:content-copy'"
                  aria-label="Copy to clipboard"
                  @click="copy(address.address)"
              />
            </UTooltip>
          </template>
        </UInput>

        <p class="font-medium text-neutral-300 mt-2">Private Key</p>
        <UInput
            :value="address.privateKey"
            class="w-full"
            :type="showPrivateKey ? 'text' : 'password'"
        >
          <template #trailing>
            <UTooltip text="Copy to clipboard" :content="{ side: 'right' }">
              <UButton
                  :color="copied ? 'success' : 'neutral'"
                  variant="link"
                  size="sm"
                  :icon="copied ? 'material-symbols:copy-all' : 'material-symbols:content-copy'"
                  aria-label="Copy to clipboard"
                  @click="copy(address.privateKey)"
              />
            </UTooltip>
          </template>
        </UInput>
      </UCard>
    </div>
  </UContainer>
</template>
