import { config } from '@vue/test-utils';
import { i18nPlugin } from '@/plugins/i18n.plugin';

config.global.plugins = [...(config.global.plugins ?? []), i18nPlugin];
