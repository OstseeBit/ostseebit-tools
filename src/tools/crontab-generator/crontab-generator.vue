<script setup lang="ts">
import { isValidCron } from 'cron-validator';
import cronstrue from 'cronstrue/i18n';
import { useStyleStore } from '@/stores/style.store';

function isCronValid(v: string) {
  return isValidCron(v, { allowBlankDay: true, alias: true, seconds: true });
}

const { t, locale } = useI18n();

const styleStore = useStyleStore();

const cron = ref('40 * * * *');
const cronstrueConfig = reactive({
  verbose: true,
  dayOfWeekStartIndexZero: true,
  use24HourTimeFormat: true,
  throwExceptionOnParseError: true,
});

const helpers = computed(() => [
  {
    symbol: '*',
    meaning: t('tools.crontab-generator.meaningAnyValue'),
    example: '* * * *',
    equivalent: t('tools.crontab-generator.equivalentEveryMinute'),
  },
  {
    symbol: '-',
    meaning: t('tools.crontab-generator.meaningRangeOfValues'),
    example: '1-10 * * *',
    equivalent: t('tools.crontab-generator.equivalentMinutes1Through10'),
  },
  {
    symbol: ',',
    meaning: t('tools.crontab-generator.meaningListOfValues'),
    example: '1,10 * * *',
    equivalent: t('tools.crontab-generator.equivalentAtMinutes1And10'),
  },
  {
    symbol: '/',
    meaning: t('tools.crontab-generator.meaningStepValues'),
    example: '*/10 * * *',
    equivalent: t('tools.crontab-generator.equivalentEvery10Minutes'),
  },
  {
    symbol: '@yearly',
    meaning: t('tools.crontab-generator.meaningYearly'),
    example: '@yearly',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@annually',
    meaning: t('tools.crontab-generator.meaningSameAsYearly'),
    example: '@annually',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@monthly',
    meaning: t('tools.crontab-generator.meaningMonthly'),
    example: '@monthly',
    equivalent: '0 0 1 * *',
  },
  {
    symbol: '@weekly',
    meaning: t('tools.crontab-generator.meaningWeekly'),
    example: '@weekly',
    equivalent: '0 0 * * 0',
  },
  {
    symbol: '@daily',
    meaning: t('tools.crontab-generator.meaningDaily'),
    example: '@daily',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@midnight',
    meaning: t('tools.crontab-generator.meaningSameAsDaily'),
    example: '@midnight',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@hourly',
    meaning: t('tools.crontab-generator.meaningHourly'),
    example: '@hourly',
    equivalent: '0 * * * *',
  },
  {
    symbol: '@reboot',
    meaning: t('tools.crontab-generator.meaningReboot'),
    example: '',
    equivalent: '',
  },
]);

const cronString = computed(() => {
  if (isCronValid(cron.value)) {
    return cronstrue.toString(cron.value, { ...cronstrueConfig, locale: locale.value });
  }
  return ' ';
});

const tableHeaders = computed(() => ({
  symbol: t('tools.crontab-generator.symbolLabel'),
  meaning: t('tools.crontab-generator.meaningLabel'),
  example: t('tools.crontab-generator.exampleLabel'),
  equivalent: t('tools.crontab-generator.equivalentLabel'),
}));

const cronValidationRules = computed(() => [
  {
    validator: (value: string) => isCronValid(value),
    message: t('tools.crontab-generator.invalidCronMessage'),
  },
]);
</script>

<template>
  <c-card>
    <div mx-auto max-w-sm>
      <c-input-text
        v-model:value="cron"
        size="large"
        placeholder="* * * * *"
        :validation-rules="cronValidationRules"
        mb-3
      />
    </div>

    <div class="cron-string">
      {{ cronString }}
    </div>

    <n-divider />

    <div flex justify-center>
      <n-form :show-feedback="false" label-width="170" label-placement="left">
        <n-form-item :label="t('tools.crontab-generator.verboseLabel')">
          <n-switch v-model:value="cronstrueConfig.verbose" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.use24HourTimeFormatLabel')">
          <n-switch v-model:value="cronstrueConfig.use24HourTimeFormat" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.daysStartAt0Label')">
          <n-switch v-model:value="cronstrueConfig.dayOfWeekStartIndexZero" />
        </n-form-item>
      </n-form>
    </div>
  </c-card>
  <c-card>
    <pre>
┌──────────── [optional] seconds (0 - 59)
| ┌────────── minute (0 - 59)
| | ┌──────── hour (0 - 23)
| | | ┌────── day of month (1 - 31)
| | | | ┌──── month (1 - 12) OR jan,feb,mar,apr ...
| | | | | ┌── day of week (0 - 6, sunday=0) OR sun,mon ...
| | | | | |
* * * * * * command</pre>

    <div v-if="styleStore.isSmallScreen">
      <c-card v-for="{ symbol, meaning, example, equivalent } in helpers" :key="symbol" mb-3 important:border-none>
        <div>
          {{ t('tools.crontab-generator.symbolLabel') }}: <strong>{{ symbol }}</strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.meaningLabel') }}: <strong>{{ meaning }}</strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.exampleLabel') }}:
          <strong><code>{{ example }}</code></strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.equivalentLabel') }}: <strong>{{ equivalent }}</strong>
        </div>
      </c-card>
    </div>

    <c-table v-else :data="helpers" :headers="tableHeaders" />
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(input) {
  font-size: 30px;
  font-family: monospace;
  padding: 5px;
  text-align: center;
}

.cron-string {
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  margin: 5px 0 15px;
}

pre {
  overflow: auto;
  padding: 10px 0;
}
</style>
