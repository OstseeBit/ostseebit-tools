<script setup lang="ts">
import db from 'oui-data';
import { useCopy } from '@/composable/copy';
import { createMacAddressValidationRules } from '@/utils/macAddress';

const { t } = useI18n();

const getVendorValue = (address: string) => address.trim().replace(/[.:-]/g, '').toUpperCase().substring(0, 6);

const macAddress = ref('20:37:06:12:34:56');
const details = computed<string | undefined>(() => (db as Record<string, string>)[getVendorValue(macAddress.value)]);
const macAddressValidationRules = computed(() => createMacAddressValidationRules(t));

const { copy } = useCopy({ source: () => details.value ?? '', text: t('tools.mac-address-lookup.copiedMessage') });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="macAddress"
      :label="t('tools.mac-address-lookup.macAddressLabel')"
      size="large"
      :placeholder="t('tools.mac-address-lookup.macAddressPlaceholder')"
      clearable
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      :validation-rules="macAddressValidationRules"
      mb-5
    />

    <div mb-5px>
      {{ t('tools.mac-address-lookup.vendorInfoLabel') }}
    </div>
    <c-card mb-5>
      <div v-if="details">
        <div v-for="(detail, index) of details.split('\n')" :key="index">
          {{ detail }}
        </div>
      </div>

      <div v-else italic op-60>
        {{ t('tools.mac-address-lookup.unknownVendor') }}
      </div>
    </c-card>

    <div flex justify-center>
      <c-button :disabled="!details" @click="copy()">
        {{ t('tools.mac-address-lookup.copyButton') }}
      </c-button>
    </div>
  </div>
</template>
