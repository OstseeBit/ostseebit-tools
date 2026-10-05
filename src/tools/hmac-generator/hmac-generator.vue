<script setup lang="ts">
import type { lib } from 'crypto-js';
import {
  enc,
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA3,
  HmacSHA224,
  HmacSHA256,
  HmacSHA384,
  HmacSHA512,
} from 'crypto-js';

import { useCopy } from '@/composable/copy';
import { convertHexToBin } from '../hash-text/hash-text.service';

const algos = {
  MD5: HmacMD5,
  RIPEMD160: HmacRIPEMD160,
  SHA1: HmacSHA1,
  SHA3: HmacSHA3,
  SHA224: HmacSHA224,
  SHA256: HmacSHA256,
  SHA384: HmacSHA384,
  SHA512: HmacSHA512,
} as const;

type Encoding = keyof typeof enc | 'Bin';

function formatWithEncoding(words: lib.WordArray, encoding: Encoding) {
  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(enc.Hex));
  }
  return words.toString(enc[encoding]);
}

const { t } = useI18n();

const plainText = ref('');
const secret = ref('');
const hashFunction = ref<keyof typeof algos>('SHA256');
const encoding = ref<Encoding>('Hex');
const hmac = computed(() =>
  formatWithEncoding(algos[hashFunction.value](plainText.value, secret.value), encoding.value),
);
const { copy } = useCopy({ source: hmac });
</script>

<template>
  <div flex flex-col gap-4>
    <c-input-text v-model:value="plainText" multiline raw-text :placeholder="t('tools.hmac-generator.plainTextPlaceholder')" rows="3" autosize autofocus :label="t('tools.hmac-generator.plainTextLabel')" />
    <c-input-text v-model:value="secret" raw-text :placeholder="t('tools.hmac-generator.secretKeyPlaceholder')" :label="t('tools.hmac-generator.secretKeyLabel')" clearable />

    <div flex gap-2>
      <c-select
        v-model:value="hashFunction" :label="t('tools.hmac-generator.hashFunctionLabel')"
        flex-1
        :placeholder="t('tools.hmac-generator.hashFunctionPlaceholder')"
        :options="Object.keys(algos).map((label) => ({ label, value: label }))"
      />
      <c-select
        v-model:value="encoding" :label="t('tools.hmac-generator.outputEncodingLabel')"
        flex-1
        :placeholder="t('tools.hmac-generator.outputEncodingPlaceholder')"
        :options="[
          {
            label: t('tools.hmac-generator.binary'),
            value: 'Bin',
          },
          {
            label: t('tools.hmac-generator.hexadecimal'),
            value: 'Hex',
          },
          {
            label: 'Base64 (base 64)',
            value: 'Base64',
          },
          {
            label: 'Base64-url (base 64 with url safe chars)',
            value: 'Base64url',
          },
        ]"
      />
    </div>
    <input-copyable v-model:value="hmac" type="textarea" :placeholder="t('tools.hmac-generator.outputPlaceholder')" :label="t('tools.hmac-generator.outputLabel')" />
    <div flex justify-center>
      <c-button @click="copy()">
        {{ t('tools.hmac-generator.copyButton') }}
      </c-button>
    </div>
  </div>
</template>
