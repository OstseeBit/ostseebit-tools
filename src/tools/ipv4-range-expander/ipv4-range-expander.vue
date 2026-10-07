<script setup lang="ts">
import type { Ipv4RangeExpanderResult } from './ipv4-range-expander.types';
import Exchange from '@vicons/tabler/es/Exchange';
import { useValidation } from '@/composable/validation';
import { isValidIpv4 } from '../ipv4-address-converter/ipv4-address-converter.service';
import { calculateCidr } from './ipv4-range-expander.service';
import ResultRow from './result-row.vue';

const { t } = useI18n();

const rawStartAddress = useStorage('ipv4-range-expander:startAddress', '192.168.1.1');
const rawEndAddress = useStorage('ipv4-range-expander:endAddress', '192.168.6.255');

const result = computed(() => calculateCidr({ startIp: rawStartAddress.value, endIp: rawEndAddress.value }));

// `id` is a stable identifier for :key and data-test-id — must NOT be
// derived from the translated `label`, which previously broke e2e
// selectors (and silent `:key` churn) the moment the UI language changed.
const calculatedValues = computed<{
  id: string
  label: string
  getOldValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined
  getNewValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined
}[]>(() => [
  {
    id: 'start-address',
    label: t('tools.ipv4-range-expander.startAddressLabel'),
    getOldValue: () => rawStartAddress.value,
    getNewValue: result => result?.newStart,
  },
  {
    id: 'end-address',
    label: t('tools.ipv4-range-expander.endAddressLabel'),
    getOldValue: () => rawEndAddress.value,
    getNewValue: result => result?.newEnd,
  },
  {
    id: 'addresses-in-range',
    label: t('tools.ipv4-range-expander.addressesInRangeLabel'),
    getOldValue: result => result?.oldSize?.toLocaleString(),
    getNewValue: result => result?.newSize?.toLocaleString(),
  },
  {
    id: 'cidr',
    label: t('tools.ipv4-range-expander.cidrLabel'),
    getOldValue: () => '',
    getNewValue: result => result?.newCidr,
  },
]);

const startIpValidation = useValidation({
  source: rawStartAddress,
  rules: computed(() => [{ message: t('validation.invalidIpv4Address'), validator: (ip: string) => isValidIpv4({ ip }) }]),
});
const endIpValidation = useValidation({
  source: rawEndAddress,
  rules: computed(() => [{ message: t('validation.invalidIpv4Address'), validator: (ip: string) => isValidIpv4({ ip }) }]),
});

const showResult = computed(() => endIpValidation.isValid && startIpValidation.isValid && result.value !== undefined);

function onSwitchStartEndClicked() {
  const tmpStart = rawStartAddress.value;
  rawStartAddress.value = rawEndAddress.value;
  rawEndAddress.value = tmpStart;
}
</script>

<template>
  <div>
    <div mb-4 flex gap-4>
      <c-input-text
        v-model:value="rawStartAddress"
        :label="t('tools.ipv4-range-expander.startAddressLabel')"
        :placeholder="t('tools.ipv4-range-expander.startAddressPlaceholder')"
        :validation="startIpValidation"
        clearable
      />

      <c-input-text
        v-model:value="rawEndAddress"
        :label="t('tools.ipv4-range-expander.endAddressLabel')"
        :placeholder="t('tools.ipv4-range-expander.endAddressPlaceholder')"
        :validation="endIpValidation"
        clearable
      />
    </div>

    <n-table v-if="showResult" data-test-id="result">
      <thead>
        <tr>
          <th scope="col">
&nbsp;
          </th>
          <th scope="col">
            {{ t('tools.ipv4-range-expander.oldValueHeader') }}
          </th>
          <th scope="col">
            {{ t('tools.ipv4-range-expander.newValueHeader') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <ResultRow
          v-for="{ id, label, getOldValue, getNewValue } in calculatedValues"
          :id="id"
          :key="id"
          :label="label"
          :old-value="getOldValue(result)"
          :new-value="getNewValue(result)"
        />
      </tbody>
    </n-table>
    <n-alert
      v-else-if="startIpValidation.isValid && endIpValidation.isValid"
      :title="t('tools.ipv4-range-expander.invalidCombinationTitle')"
      type="error"
    >
      <div my-3 op-70>
        {{ t('tools.ipv4-range-expander.invalidCombinationText') }}
      </div>

      <c-button @click="onSwitchStartEndClicked">
        <n-icon mr-2 :component="Exchange" depth="3" size="22" />
        {{ t('tools.ipv4-range-expander.switchButton') }}
      </c-button>
    </n-alert>
  </div>
</template>
