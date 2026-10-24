<script setup lang="ts">
import type { UserAgentResultSection } from './user-agent-parser.types';
import Adjustments from '@vicons/tabler/es/Adjustments';
import Browser from '@vicons/tabler/es/Browser';
import Cpu from '@vicons/tabler/es/Cpu';
import Devices from '@vicons/tabler/es/Devices';
import Engine from '@vicons/tabler/es/Engine';
import { UAParser } from 'ua-parser-js';
import { withDefaultOnError } from '@/utils/defaults';
import UserAgentResultCards from './user-agent-result-cards.vue';

const { t } = useI18n();

const ua = ref(navigator.userAgent as string);

// If not input in the ua field is present return an empty object of type UAParser.IResult because otherwise
// UAParser returns the values for the current Browser. This is confusing because results are shown for an empty
// UA field value.
function getUserAgentInfo(userAgent: string) {
  return userAgent.trim().length > 0
    ? UAParser(userAgent.trim())
    : ({ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} } as UAParser.IResult);
}
const userAgentInfo = computed(() => withDefaultOnError(() => getUserAgentInfo(ua.value), undefined));

const sections = computed<UserAgentResultSection[]>(() => [
  {
    heading: t('tools.user-agent-parser.browserHeading'),
    icon: Browser,
    content: [
      {
        label: t('tools.user-agent-parser.nameLabel'),
        getValue: block => block?.browser.name,
        undefinedFallback: t('tools.user-agent-parser.noBrowserNameMessage'),
      },
      {
        label: t('tools.user-agent-parser.versionLabel'),
        getValue: block => block?.browser.version,
        undefinedFallback: t('tools.user-agent-parser.noBrowserVersionMessage'),
      },
    ],
  },
  {
    heading: t('tools.user-agent-parser.engineHeading'),
    icon: Engine,
    content: [
      {
        label: t('tools.user-agent-parser.nameLabel'),
        getValue: block => block?.engine.name,
        undefinedFallback: t('tools.user-agent-parser.noEngineNameMessage'),
      },
      {
        label: t('tools.user-agent-parser.versionLabel'),
        getValue: block => block?.engine.version,
        undefinedFallback: t('tools.user-agent-parser.noEngineVersionMessage'),
      },
    ],
  },
  {
    heading: t('tools.user-agent-parser.osHeading'),
    icon: Adjustments,
    content: [
      {
        label: t('tools.user-agent-parser.nameLabel'),
        getValue: block => block?.os.name,
        undefinedFallback: t('tools.user-agent-parser.noOsNameMessage'),
      },
      {
        label: t('tools.user-agent-parser.versionLabel'),
        getValue: block => block?.os.version,
        undefinedFallback: t('tools.user-agent-parser.noOsVersionMessage'),
      },
    ],
  },
  {
    heading: t('tools.user-agent-parser.deviceHeading'),
    icon: Devices,
    content: [
      {
        label: t('tools.user-agent-parser.modelLabel'),
        getValue: block => block?.device.model,
        undefinedFallback: t('tools.user-agent-parser.noDeviceModelMessage'),
      },
      {
        label: t('tools.user-agent-parser.typeLabel'),
        getValue: block => block?.device.type,
        undefinedFallback: t('tools.user-agent-parser.noDeviceTypeMessage'),
      },
      {
        label: t('tools.user-agent-parser.vendorLabel'),
        getValue: block => block?.device.vendor,
        undefinedFallback: t('tools.user-agent-parser.noDeviceVendorMessage'),
      },
    ],
  },
  {
    heading: t('tools.user-agent-parser.cpuHeading'),
    icon: Cpu,
    content: [
      {
        label: t('tools.user-agent-parser.architectureLabel'),
        getValue: block => block?.cpu.architecture,
        undefinedFallback: t('tools.user-agent-parser.noCpuArchitectureMessage'),
      },
    ],
  },
]);
</script>

<template>
  <div>
    <c-input-text
      v-model:value="ua"
      :label="t('tools.user-agent-parser.inputLabel')"
      multiline
      :placeholder="t('tools.user-agent-parser.inputPlaceholder')"
      clearable
      raw-text
      rows="2"
      autosize
      monospace
      mb-3
    />

    <UserAgentResultCards :user-agent-info="userAgentInfo" :sections="sections" />
  </div>
</template>
