import type { Component } from 'vue';
import type { CategoryId } from '@/ui/theme/tokens';

export interface Tool {
  name: string
  path: string
  description: string
  keywords: string[]
  component: () => Promise<Component>
  icon: Component
  redirectFrom?: string[]
  isNew: boolean
  createdAt?: Date
}

export interface ToolCategory {
  /** Kennung der Kategorie (Farbe in den Design-Tokens); fehlt bei der Favoritenliste. */
  id?: CategoryId
  name: string
  components: Tool[]
}

export type ToolWithCategory = Tool & { category: string, categoryId: CategoryId };
