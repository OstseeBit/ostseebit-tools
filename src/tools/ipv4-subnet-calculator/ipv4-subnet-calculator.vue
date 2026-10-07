<script setup lang="ts">
import ArrowLeft from '@vicons/tabler/es/ArrowLeft';
import ArrowRight from '@vicons/tabler/es/ArrowRight';
import { useStorage } from '@vueuse/core';
import { Netmask } from 'netmask';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';
import { getIPClass } from './ipv4-subnet-calculator.service';

const { t } = useI18n();

const ip = useStorage('ipv4-subnet-calculator:ip', '192.168.0.1/24');

const getNetworkInfo = (address: string) => new Netmask(address.trim());

const networkInfo = computed(() => withDefaultOnError(() => getNetworkInfo(ip.value), undefined));

const ipValidationRules = computed(() => [
  {
    message: t('tools.ipv4-subnet-calculator.parseErrorMessage'),
    validator: (value: string) => isNotThrowing(() => getNetworkInfo(value.trim())),
  },
]);

const sections = computed<{
  label: string
  getValue: (blocks: Netmask) => string | undefined
  undefinedFallback?: string
}[]>(() => [
  {
    label: t('tools.ipv4-subnet-calculator.netmaskLabel'),
    getValue: block => block.toString(),
  },
  {
    label: t('tools.ipv4-subnet-calculator.networkAddressLabel'),
    getValue: ({ base }) => base,
  },
  {
    label: t('tools.ipv4-subnet-calculator.networkMaskLabel'),
    getValue: ({ mask }) => mask,
  },
  {
    label: t('tools.ipv4-subnet-calculator.networkMaskBinaryLabel'),
    getValue: ({ bitmask }) => ('1'.repeat(bitmask) + '0'.repeat(32 - bitmask)).match(/.{8}/g)?.join('.') ?? '',
  },
  {
    label: t('tools.ipv4-subnet-calculator.cidrNotationLabel'),
    getValue: ({ bitmask }) => `/${bitmask}`,
  },
  {
    label: t('tools.ipv4-subnet-calculator.wildcardMaskLabel'),
    getValue: ({ hostmask }) => hostmask,
  },
  {
    label: t('tools.ipv4-subnet-calculator.networkSizeLabel'),
    getValue: ({ size }) => String(size),
  },
  {
    label: t('tools.ipv4-subnet-calculator.firstAddressLabel'),
    getValue: ({ first }) => first,
  },
  {
    label: t('tools.ipv4-subnet-calculator.lastAddressLabel'),
    getValue: ({ last }) => last,
  },
  {
    label: t('tools.ipv4-subnet-calculator.broadcastAddressLabel'),
    getValue: ({ broadcast }) => broadcast,
    undefinedFallback: t('tools.ipv4-subnet-calculator.noBroadcastMessage'),
  },
  {
    label: t('tools.ipv4-subnet-calculator.ipClassLabel'),
    getValue: ({ base: ip }) => getIPClass({ ip }),
    undefinedFallback: t('tools.ipv4-subnet-calculator.unknownClassMessage'),
  },
]);

function switchToBlock({ count = 1 }: { count?: number }) {
  const next = networkInfo.value?.next(count);

  if (next) {
    ip.value = next.toString();
  }
}
</script>

<template>
  <div>
    <c-input-text
      v-model:value="ip"
      :label="t('tools.ipv4-subnet-calculator.inputLabel')"
      :placeholder="t('tools.ipv4-subnet-calculator.inputPlaceholder')"
      :validation-rules="ipValidationRules"
      mb-4
    />

    <div v-if="networkInfo">
      <n-table>
        <tbody>
          <tr v-for="{ getValue, label, undefinedFallback } in sections" :key="label">
            <td font-bold>
              {{ label }}
            </td>
            <td>
              <c-text-copyable v-if="getValue(networkInfo)" :value="getValue(networkInfo)" monospace :show-icon="false" />
              <span v-else op-70>
                {{ undefinedFallback }}
              </span>
            </td>
          </tr>
        </tbody>
      </n-table>

      <div mt-3 flex items-center justify-between>
        <c-button @click="switchToBlock({ count: -1 })">
          <n-icon :component="ArrowLeft" />
          {{ t('tools.ipv4-subnet-calculator.previousBlockButton') }}
        </c-button>
        <c-button @click="switchToBlock({ count: 1 })">
          {{ t('tools.ipv4-subnet-calculator.nextBlockButton') }}
          <n-icon :component="ArrowRight" />
        </c-button>
      </div>
    </div>
  </div>
</template>
