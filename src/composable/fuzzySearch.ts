import type { IFuseOptions } from 'fuse.js';
import type { MaybeRef } from 'vue';
import { get } from '@vueuse/core';
import Fuse from 'fuse.js';
import { computed } from 'vue';

export { useFuzzySearch };

function useFuzzySearch<Data>({
  search,
  data,
  options = {},
}: {
  search: MaybeRef<string>
  // MaybeRef so callers whose data can change after mount (e.g. a c-select
  // with translated option labels) get a search index that stays in sync —
  // a plain array still works exactly as before since get() on it is a
  // no-op with no reactive dependency, so the Fuse instance below is still
  // only ever built once for those callers.
  data: MaybeRef<Data[]>
  options?: IFuseOptions<Data> & { filterEmpty?: boolean }
}) {
  const filterEmpty = options.filterEmpty ?? true;

  const fuse = computed(() => new Fuse(get(data), options));

  const searchResult = computed<Data[]>(() => {
    const query = get(search);

    if (!filterEmpty && query === '') {
      return get(data);
    }

    return fuse.value.search(query).map(({ item }) => item);
  });

  return { searchResult };
}
