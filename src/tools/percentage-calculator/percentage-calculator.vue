<script setup lang="ts">
const { t } = useI18n();

// Example values so every calculator shows a result right away.
// A cleared n-input-number emits null, so null counts as empty just like undefined.
const isEmpty = (value: unknown) => value === undefined || value === null || value === '';

const percentageX = ref<number | null>(15);
const percentageY = ref<number | null>(200);
const percentageResult = computed(() => {
  if (isEmpty(percentageX.value) || isEmpty(percentageY.value)) {
    return '';
  }
  return ((percentageX.value as number) / 100 * (percentageY.value as number)).toString();
});

const numberX = ref<number | null>(30);
const numberY = ref<number | null>(120);
const numberResult = computed(() => {
  if (isEmpty(numberX.value) || isEmpty(numberY.value)) {
    return '';
  }
  const result = 100 * (numberX.value as number) / (numberY.value as number);
  return (!Number.isFinite(result) || Number.isNaN(result)) ? '' : result.toString();
});

const numberFrom = ref<number | null>(80);
const numberTo = ref<number | null>(100);
const percentageIncreaseDecrease = computed(() => {
  if (isEmpty(numberFrom.value) || isEmpty(numberTo.value)) {
    return '';
  }
  const result = ((numberTo.value as number) - (numberFrom.value as number)) / (numberFrom.value as number) * 100;
  return (!Number.isFinite(result) || Number.isNaN(result)) ? '' : result.toString();
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 sm:hidden>
          {{ t('tools.percentage-calculator.whatIsLabel') }}
        </div>
        <div flex gap-2>
          <div pt-1 hidden sm:block style="min-width: 48px;">
            {{ t('tools.percentage-calculator.whatIsLabel') }}
          </div>
          <n-input-number v-model:value="percentageX" data-test-id="percentageX" placeholder="X" />
          <div min-w-fit pt-1>
            {{ t('tools.percentage-calculator.percentOfLabel') }}
          </div>
          <n-input-number v-model:value="percentageY" data-test-id="percentageY" placeholder="Y" />
          <input-copyable v-model:value="percentageResult" data-test-id="percentageResult" readonly :placeholder="t('tools.percentage-calculator.resultPlaceholder')" style="max-width: 150px;" />
        </div>
      </c-card>

      <c-card mb-3>
        <div mb-3 sm:hidden>
          X {{ t('tools.percentage-calculator.isWhatPercentLabel') }} Y
        </div>
        <div flex gap-2>
          <n-input-number v-model:value="numberX" data-test-id="numberX" placeholder="X" />
          <div min-w-fit pt-1 hidden sm:block>
            {{ t('tools.percentage-calculator.isWhatPercentLabel') }}
          </div>
          <n-input-number v-model:value="numberY" data-test-id="numberY" placeholder="Y" />
          <input-copyable v-model:value="numberResult" data-test-id="numberResult" readonly :placeholder="t('tools.percentage-calculator.resultPlaceholder')" style="max-width: 150px;" />
        </div>
      </c-card>

      <c-card mb-3>
        <div mb-3>
          {{ t('tools.percentage-calculator.percentageChangeLabel') }}
        </div>
        <div flex gap-2>
          <n-input-number v-model:value="numberFrom" data-test-id="numberFrom" :placeholder="t('tools.percentage-calculator.fromPlaceholder')" />
          <n-input-number v-model:value="numberTo" data-test-id="numberTo" :placeholder="t('tools.percentage-calculator.toPlaceholder')" />
          <input-copyable v-model:value="percentageIncreaseDecrease" data-test-id="percentageIncreaseDecrease" readonly :placeholder="t('tools.percentage-calculator.resultPlaceholder')" style="max-width: 150px;" />
        </div>
      </c-card>
    </div>
  </div>
</template>
