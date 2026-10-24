<script setup lang="ts">
import type { SelectGroupOption, SelectOption } from 'naive-ui';
import type { OGSchemaType, OGSchemaTypeElementSelect, OGSchemaTypeOption } from './OGSchemaType.type';
import { generateMeta } from '@it-tools/oggen';
import _ from 'lodash';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { image, ogSchemas, twitter, website } from './og-schemas';

const { t } = useI18n();

function toSelectOptions(options: OGSchemaTypeOption[]): Array<SelectOption | SelectGroupOption> {
  return options.map(option => 'children' in option
    ? { type: 'group', key: option.key, label: t(option.labelKey), children: option.children.map(child => ({ label: t(child.labelKey), value: child.value })) }
    : { label: t(option.labelKey), value: option.value });
}

// Since type guards do not work in template

const metadata = ref<{ type: string, [k: string]: any }>({
  'type': 'website',
  'twitter:card': 'summary_large_image',
});

watch(
  () => ref(metadata.value.type),
  (_ignored, prevSection) => {
    const section = ogSchemas[prevSection.value];

    if (!section) {
      return;
    }

    section.elements.forEach(({ key }) => {
      metadata.value[key] = '';
    });
  },
);

const sections = computed(() => {
  const secs: OGSchemaType[] = [website, image, twitter];
  const additionalSchema = ogSchemas[metadata.value.type];

  if (additionalSchema) {
    secs.push(additionalSchema);
  }

  return secs;
});

const metaTags = computed(() => {
  const twitterMeta = _.chain(metadata.value)
    .pickBy((_value, k) => k.startsWith('twitter:'))
    .mapKeys((_value, k) => k.replace(/^twitter:/, ''))
    .value();

  const otherMeta = _.pickBy(metadata.value, (_value, k) => !k.startsWith('twitter:'));

  return generateMeta({ ...otherMeta, twitter: twitterMeta }, { generateTwitterCompatibleMeta: true });
});
</script>

<template>
  <div>
    <div v-for="{ nameKey, elements } of sections" :key="nameKey" style="margin-bottom: 15px">
      <div mb-5px>
        {{ t(nameKey) }}
      </div>

      <n-input-group v-for="{ key, type, labelKey, placeholderKey, ...element } of elements" :key="key">
        <n-input-group-label style="flex: 0 0 150px">
          {{ t(labelKey) }}
        </n-input-group-label>

        <c-input-text v-if="type === 'input'" v-model:value="metadata[key]" :placeholder="t(placeholderKey)" clearable />
        <n-dynamic-input
          v-else-if="type === 'input-multiple'"
          v-model:value="metadata[key]"
          :min="1"
          :placeholder="t(placeholderKey)"
          :default-value="['']"
          :show-sort-button="true"
        />

        <n-select
          v-else-if="type === 'select'"
          v-model:value="metadata[key]"
          w-full
          :placeholder="t(placeholderKey)"
          :options="toSelectOptions((element as OGSchemaTypeElementSelect).options)"
        />
      </n-input-group>
    </div>
  </div>
  <div>
    <n-form-item :label="t('tools.og-meta-generator.yourMetaTags')">
      <TextareaCopyable :value="metaTags" language="html" />
    </n-form-item>
  </div>
</template>

<style lang="less" scoped>
.n-input-group {
  margin-bottom: 5px;
}

::v-deep(.n-form-item-blank) {
  min-height: 0 !important;
}
::v-deep(.n-dynamic-input-item) {
  margin-bottom: 5px;
}
</style>
