<script setup lang="ts">
import { getCountries, getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js/max';
import { useValidation } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import {
  formatTypeToHumanReadable,
  getDefaultCountryCode,
  getFullCountryName,
} from './phone-parser-and-formatter.service';

const { t, locale } = useI18n();

const rawPhone = ref('+49 30 123456');
const defaultCountryCode = ref(getDefaultCountryCode());
const validation = useValidation({
  source: rawPhone,
  rules: computed(() => [
    {
      validator: (value: string) => value === '' || /^[0-9 +\-()]+$/.test(value),
      message: t('tools.phone-parser-and-formatter.invalidPhoneNumber'),
    },
  ]),
});

const parsedDetails = computed(() => {
  if (!validation.isValid) {
    return undefined;
  }

  const parsed = withDefaultOnError(() => parsePhoneNumber(rawPhone.value, defaultCountryCode.value), undefined);

  if (!parsed) {
    return undefined;
  }

  const yesNo = (value: boolean) => t(`tools.phone-parser-and-formatter.${value ? 'yes' : 'no'}`);

  return [
    {
      id: 'countryCode',
      label: t('tools.phone-parser-and-formatter.countryCodeLabel'),
      value: parsed.country,
    },
    {
      id: 'country',
      label: t('tools.phone-parser-and-formatter.countryLabel'),
      value: getFullCountryName(parsed.country, locale.value),
    },
    {
      id: 'callingCode',
      label: t('tools.phone-parser-and-formatter.callingCodeLabel'),
      value: parsed.countryCallingCode,
    },
    {
      id: 'isValid',
      label: t('tools.phone-parser-and-formatter.isValidLabel'),
      value: yesNo(parsed.isValid()),
    },
    {
      id: 'isPossible',
      label: t('tools.phone-parser-and-formatter.isPossibleLabel'),
      value: yesNo(parsed.isPossible()),
    },
    {
      id: 'type',
      label: t('tools.phone-parser-and-formatter.typeLabel'),
      value: formatTypeToHumanReadable(parsed.getType(), t),
    },
    {
      id: 'international',
      label: t('tools.phone-parser-and-formatter.internationalFormatLabel'),
      value: parsed.formatInternational(),
    },
    {
      id: 'national',
      label: t('tools.phone-parser-and-formatter.nationalFormatLabel'),
      value: parsed.formatNational(),
    },
    {
      id: 'e164',
      label: t('tools.phone-parser-and-formatter.e164FormatLabel'),
      value: parsed.format('E.164'),
    },
    {
      id: 'rfc3966',
      label: t('tools.phone-parser-and-formatter.rfc3966FormatLabel'),
      value: parsed.format('RFC3966'),
    },
  ];
});

const countriesOptions = computed(() =>
  getCountries().map(code => ({
    label: `${getFullCountryName(code, locale.value) || code} (+${getCountryCallingCode(code)})`,
    value: code,
  })),
);
</script>

<template>
  <div>
    <c-select v-model:value="defaultCountryCode" :label="t('tools.phone-parser-and-formatter.defaultCountryCodeLabel')" :options="countriesOptions" searchable mb-5 />

    <c-input-text
      v-model:value="rawPhone"
      :placeholder="t('tools.phone-parser-and-formatter.phoneNumberPlaceholder')"
      :label="t('tools.phone-parser-and-formatter.phoneNumberLabel')"
      :validation="validation"
      mb-5
    />

    <n-table v-if="parsedDetails">
      <tbody>
        <tr v-for="{ id, label, value } in parsedDetails" :key="id">
          <td font-bold>
            {{ label }}
          </td>
          <td>
            <c-text-copyable v-if="value" :value="value" />
            <span v-else op-70>
              {{ t('tools.phone-parser-and-formatter.unknown') }}
            </span>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>
