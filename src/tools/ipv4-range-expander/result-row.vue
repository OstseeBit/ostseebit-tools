<script setup lang="ts">
import _ from 'lodash';

const props = withDefaults(defineProps<{ label?: string, oldValue?: string, newValue?: string }>(), {
  label: '',
  oldValue: '',
  newValue: '',
});
const { label, oldValue, newValue } = toRefs(props);

const testId = computed(() => _.kebabCase(label.value));
</script>

<template>
  <tr>
    <td font-bold>
      {{ label }}
    </td>
    <td :data-test-id="`${testId}.old`">
      <c-text-copyable :value="oldValue" monospace :show-icon="false" />
    </td>
    <td :data-test-id="`${testId}.new`">
      <c-text-copyable :value="newValue" monospace :show-icon="false" />
    </td>
  </tr>
</template>
