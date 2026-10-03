<script setup lang="ts">
const md = `
# OstseeBit Tools

## About
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis
mollis blandit, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed euismod, nisl quis mollis blandit, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.

[OstseeBit Tools](https://github.com/OstseeBit/ostseebit-tools)
`;
</script>

<template>
  <c-markdown :markdown="md" />
</template>
