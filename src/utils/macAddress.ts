import type { Ref } from 'vue';
import { computed } from 'vue';
import { useValidation } from '@/composable/validation';

type TranslateFn = (key: string) => string;

function createMacAddressValidationRules(t: TranslateFn) {
  return [
    {
      message: t('validation.invalidMacAddress'),
      validator: (value: string) => value.trim().match(/^([0-9A-F]{2}[:-]){2,5}([0-9A-F]{2})$/i),
    },
  ];
}

function macAddressValidation(value: Ref, t: TranslateFn) {
  return useValidation({
    source: value,
    rules: computed(() => createMacAddressValidationRules(t)),
  });
}

function createPartialMacAddressValidationRules(t: TranslateFn) {
  return [
    {
      message: t('validation.invalidPartialMacAddress'),
      validator: (value: string) => value.trim().match(/^([0-9a-f]{2}[:\-. ]){0,5}([0-9a-f]{0,2})$/i),
    },
  ];
}

function usePartialMacAddressValidation(value: Ref, t: TranslateFn) {
  return useValidation({
    source: value,
    rules: computed(() => createPartialMacAddressValidationRules(t)),
  });
}

export { createMacAddressValidationRules, createPartialMacAddressValidationRules, macAddressValidation, usePartialMacAddressValidation };
