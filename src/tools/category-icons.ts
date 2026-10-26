import type { Component } from 'vue';
import type { CategoryId } from '@/ui/theme/tokens';
import Calculator from '@vicons/tabler/es/Calculator';
import Code from '@vicons/tabler/es/Code';
import Database from '@vicons/tabler/es/Database';
import Id from '@vicons/tabler/es/Id';
import Server from '@vicons/tabler/es/Server';
import ShieldLock from '@vicons/tabler/es/ShieldLock';
import Sitemap from '@vicons/tabler/es/Sitemap';
import Stack2 from '@vicons/tabler/es/Stack2';
import Typography from '@vicons/tabler/es/Typography';

/** Symbol je Kategorie (Tabler, wie bei den Werkzeugen). Die Farbe kommt aus den Design-Tokens. */
export const categoryIcons: Record<CategoryId, Component> = {
  data: Stack2,
  text: Typography,
  dev: Code,
  db: Database,
  net: Sitemap,
  sec: ShieldLock,
  ops: Server,
  calc: Calculator,
  id: Id,
};
