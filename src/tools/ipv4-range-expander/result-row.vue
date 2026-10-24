<script setup lang="ts">
const props = withDefaults(defineProps<{ id?: string, label?: string, oldValue?: string, newValue?: string }>(), {
  id: '',
  label: '',
  oldValue: '',
  newValue: '',
});
const { id, label, oldValue, newValue } = toRefs(props);
</script>

<template>
  <tr>
    <td font-bold>
      {{ label }}
    </td>
    <td :data-test-id="`${id}.old`">
      <c-text-copyable :value="oldValue" monospace :show-icon="false" />
    </td>
    <td :data-test-id="`${id}.new`">
      <c-text-copyable :value="newValue" monospace :show-icon="false" />
    </td>
  </tr>
</template>
