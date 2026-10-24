import type { OGSchemaType } from '../OGSchemaType.type';

export const profile: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.profile.name',
  elements: [
    {
      type: 'input',
      key: 'profile:first_name',
      labelKey: 'tools.og-meta-generator.schemas.profile.firstNameLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.profile.firstNamePlaceholder',
    },
    {
      type: 'input',
      key: 'profile:last_name',
      labelKey: 'tools.og-meta-generator.schemas.profile.lastNameLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.profile.lastNamePlaceholder',
    },
    {
      type: 'input',
      key: 'profile:username',
      labelKey: 'tools.og-meta-generator.schemas.profile.usernameLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.profile.usernamePlaceholder',
    },
    {
      type: 'input',
      key: 'profile:gender',
      labelKey: 'tools.og-meta-generator.schemas.profile.genderLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.profile.genderPlaceholder',
    },
  ],
};
