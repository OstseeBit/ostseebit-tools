<script setup lang="ts">
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';
import {
  EAPMethods,
  EAPPhase2Methods,
  useWifiQRCode,
} from './useQRCode';

const foreground = ref('#000000ff');
const background = ref('#ffffffff');

// Example values so a QR code is shown right away; the password is a made-up one.
const ssid = ref('Ostsee-WLAN');
const password = ref('beispiel-passwort-123');
const eapMethod = ref();
const isHiddenSSID = ref(false);
const eapAnonymous = ref(false);
const eapIdentity = ref();
const eapPhase2Method = ref();

const { t } = useI18n();

const { qrcode, encryption } = useWifiQRCode({
  ssid,
  password,
  eapMethod,
  isHiddenSSID,
  eapAnonymous,
  eapIdentity,
  eapPhase2Method,
  color: {
    background,
    foreground,
  },
  options: { width: 1024 },
});

const { download } = useDownloadFileFromBase64({ source: qrcode, filename: 'qr-code.png' });
</script>

<template>
  <c-card>
    <div grid grid-cols-1 gap-12>
      <div>
        <c-select
          v-model:value="encryption"
          mb-4
          :label="t('tools.wifi-qrcode-generator.encryptionMethod')"
          default-value="WPA"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="[
            {
              label: t('tools.wifi-qrcode-generator.noPassword'),
              value: 'nopass',
            },
            {
              label: 'WPA/WPA2/WPA3',
              value: 'WPA',
            },
            {
              label: t('tools.wifi-qrcode-generator.wep'),
              value: 'WEP',
            },
            {
              label: 'WPA2-EAP',
              value: 'WPA2-EAP',
            },
          ]"
        />
        <div class="mb-6 flex flex-row items-center gap-2">
          <c-input-text
            v-model:value="ssid"
            label-position="left"
            label-width="130px"
            label-align="right"
            :label="t('tools.wifi-qrcode-generator.ssidLabel')"
            rows="1"
            autosize
            :placeholder="t('tools.wifi-qrcode-generator.ssidPlaceholder')"
            mb-6
          />
          <n-checkbox v-model:checked="isHiddenSSID">
            {{ t('tools.wifi-qrcode-generator.hiddenSsid') }}
          </n-checkbox>
        </div>
        <c-input-text
          v-if="encryption !== 'nopass'"
          v-model:value="password"
          label-position="left"
          label-width="130px"
          label-align="right"
          :label="t('tools.wifi-qrcode-generator.passwordLabel')"
          rows="1"
          autosize
          type="password"
          :placeholder="t('tools.wifi-qrcode-generator.passwordPlaceholder')"
          mb-6
        />
        <c-select
          v-if="encryption === 'WPA2-EAP'"
          v-model:value="eapMethod"
          :label="t('tools.wifi-qrcode-generator.eapMethod')"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="EAPMethods.map((method) => ({ label: method, value: method }))"
          searchable mb-4
        />
        <div v-if="encryption === 'WPA2-EAP'" class="mb-6 flex flex-row items-center gap-2">
          <c-input-text
            v-model:value="eapIdentity"
            label-position="left"
            label-width="130px"
            label-align="right"
            :label="t('tools.wifi-qrcode-generator.identityLabel')"
            rows="1"
            autosize
            :placeholder="t('tools.wifi-qrcode-generator.identityPlaceholder')"
            mb-6
          />
          <n-checkbox v-model:checked="eapAnonymous">
            {{ t('tools.wifi-qrcode-generator.anonymous') }}
          </n-checkbox>
        </div>
        <c-select
          v-if="encryption === 'WPA2-EAP'"
          v-model:value="eapPhase2Method"
          :label="t('tools.wifi-qrcode-generator.eapPhase2Method')"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="EAPPhase2Methods.map((method) => ({ label: method, value: method }))"
          searchable mb-4
        />
        <n-form label-width="130" label-placement="left">
          <n-form-item :label="t('tools.wifi-qrcode-generator.foregroundColor')">
            <n-color-picker v-model:value="foreground" :modes="['hex']" />
          </n-form-item>
          <n-form-item :label="t('tools.wifi-qrcode-generator.backgroundColor')">
            <n-color-picker v-model:value="background" :modes="['hex']" />
          </n-form-item>
        </n-form>
      </div>
      <div v-if="qrcode">
        <div flex flex-col items-center gap-3>
          <img alt="wifi-qrcode" :src="qrcode" width="200">
          <c-button @click="download">
            {{ t('tools.wifi-qrcode-generator.download') }}
          </c-button>
        </div>
      </div>
    </div>
  </c-card>
</template>
