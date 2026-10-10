export type {
  OGSchemaType,
  OGSchemaTypeElementInput,
  OGSchemaTypeElementInputMultiple,
  OGSchemaTypeElementSelect,
  OGSchemaTypeOption,
};

// All display texts are i18n keys (`labelKey`, `placeholderKey`, `nameKey`) that
// the component resolves with t(), so the schemas stay plain, language-independent data.
interface OGSchemaTypeElementBase {
  key: string
  labelKey: string
  placeholderKey: string
}

interface OGSchemaTypeElementInput extends OGSchemaTypeElementBase {
  type: 'input'
}

interface OGSchemaTypeElementInputMultiple extends OGSchemaTypeElementBase {
  type: 'input-multiple'
}

interface OGSchemaTypeOptionItem {
  labelKey: string
  value: string
}

interface OGSchemaTypeOptionGroup {
  type: 'group'
  key: string
  labelKey: string
  children: OGSchemaTypeOptionItem[]
}

type OGSchemaTypeOption = OGSchemaTypeOptionItem | OGSchemaTypeOptionGroup;

interface OGSchemaTypeElementSelect extends OGSchemaTypeElementBase {
  type: 'select'
  options: OGSchemaTypeOption[]
}

interface OGSchemaType {
  nameKey: string
  elements: (OGSchemaTypeElementSelect | OGSchemaTypeElementInput | OGSchemaTypeElementInputMultiple)[]
}
