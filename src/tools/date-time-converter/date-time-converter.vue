<script setup lang="ts">
import type { DateFormat, ToDateMapper } from './date-time-converter.types';
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
} from 'date-fns';
import { useValidation } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import {
  dateToExcelFormat,
  excelFormatToDate,
  isExcelFormat,
  isISO8601DateTimeString,
  isISO9075DateString,
  isMongoObjectId,
  isRFC3339DateString,
  isRFC7231DateString,
  isTimestamp,
  isUnixTimestamp,
  isUTCDateString,
} from './date-time-converter.service';

const { t } = useI18n();

const inputDate = ref('1710498600000');

const toDate: ToDateMapper = date => new Date(date);

const formats = computed<DateFormat[]>(() => [
  {
    id: 'jsDate',
    name: t('tools.date-converter.formatJsDate'),
    fromDate: date => date.toString(),
    toDate,
    formatMatcher: () => false,
  },
  {
    id: 'iso8601',
    name: 'ISO 8601',
    fromDate: formatISO,
    toDate: parseISO,
    formatMatcher: date => isISO8601DateTimeString(date),
  },
  {
    id: 'iso9075',
    name: 'ISO 9075',
    fromDate: formatISO9075,
    toDate: parseISO,
    formatMatcher: date => isISO9075DateString(date),
  },
  {
    id: 'rfc3339',
    name: 'RFC 3339',
    fromDate: formatRFC3339,
    toDate,
    formatMatcher: date => isRFC3339DateString(date),
  },
  {
    id: 'rfc7231',
    name: 'RFC 7231',
    fromDate: formatRFC7231,
    toDate,
    formatMatcher: date => isRFC7231DateString(date),
  },
  {
    id: 'unixTimestamp',
    name: t('tools.date-converter.formatUnixTimestamp'),
    fromDate: date => String(getUnixTime(date)),
    toDate: sec => fromUnixTime(+sec),
    formatMatcher: date => isUnixTimestamp(date),
  },
  {
    id: 'timestamp',
    name: t('tools.date-converter.formatTimestamp'),
    fromDate: date => String(getTime(date)),
    toDate: ms => new Date(+ms),
    formatMatcher: date => isTimestamp(date),
  },
  {
    id: 'utc',
    name: t('tools.date-converter.formatUtc'),
    fromDate: date => date.toUTCString(),
    toDate,
    formatMatcher: date => isUTCDateString(date),
  },
  {
    id: 'mongoObjectId',
    name: 'Mongo ObjectID',
    fromDate: date => `${Math.floor(date.getTime() / 1000).toString(16)}0000000000000000`,
    toDate: objectId => new Date(Number.parseInt(objectId.substring(0, 8), 16) * 1000),
    formatMatcher: date => isMongoObjectId(date),
  },
  {
    id: 'excel',
    name: t('tools.date-converter.formatExcel'),
    fromDate: date => dateToExcelFormat(date),
    toDate: excelFormatToDate,
    formatMatcher: isExcelFormat,
  },
]);

const formatIndex = ref(6);
const now = useNow();

const normalizedDate = computed(() => {
  if (!inputDate.value) {
    return now.value;
  }

  const { toDate } = formats.value[formatIndex.value];

  try {
    return toDate(inputDate.value);
  }
  catch {
    return undefined;
  }
});

function onDateInputChanged(value: string) {
  const matchingIndex = formats.value.findIndex(({ formatMatcher }) => formatMatcher(value));
  if (matchingIndex !== -1) {
    formatIndex.value = matchingIndex;
  }
}

const validation = useValidation({
  source: inputDate,
  watch: [formatIndex],
  rules: computed(() => [
    {
      message: t('tools.date-converter.invalidDateMessage'),
      validator: (value: string) =>
        withDefaultOnError(() => {
          if (value === '') {
            return true;
          }

          const maybeDate = formats.value[formatIndex.value].toDate(value);
          return isDate(maybeDate) && isValid(maybeDate);
        }, false),
    },
  ]),
});

function formatDateUsingFormatter(formatter: (date: Date) => string, date?: Date) {
  if (!date || !validation.isValid) {
    return '';
  }

  return withDefaultOnError(() => formatter(date), '');
}
</script>

<template>
  <div>
    <div flex gap-2>
      <c-input-text
        v-model:value="inputDate"
        autofocus
        :placeholder="t('tools.date-converter.inputPlaceholder')"
        clearable
        test-id="date-time-converter-input"
        :validation="validation"
        @update:value="onDateInputChanged"
      />

      <c-select
        v-model:value="formatIndex"
        style="flex: 0 0 170px"
        :options="formats.map(({ name }, i) => ({ label: name, value: i }))"
        data-test-id="date-time-converter-format-select"
      />
    </div>

    <n-divider />

    <input-copyable
      v-for="{ id, name, fromDate } in formats"
      :key="id"
      :label="name"
      label-width="200px"
      label-position="left"
      label-align="right"
      :value="formatDateUsingFormatter(fromDate, normalizedDate)"
      :placeholder="t('tools.date-converter.invalidDatePlaceholder')"
      :test-id="id"
      readonly
      mt-2
    />
  </div>
</template>
