import type { MaybeRef, Ref } from 'vue';
import { get } from '@vueuse/core';
import _ from 'lodash';
import { reactive, watch } from 'vue';
import { isNotThrowing } from '@/utils/boolean';

type ValidatorReturnType = unknown;
type GetErrorMessageReturnType = string;

export interface UseValidationRule<T> {
  validator: (value: T) => ValidatorReturnType
  getErrorMessage?: (value: T) => GetErrorMessageReturnType
  message: string
}

// Shared by the format-converter tools (JSON/YAML/TOML/XML <-> X): validates
// by attempting to parse, empty input always passes. Deliberately wraps the
// parser in isNotThrowing() rather than returning the parsed value directly —
// a validator that returns the parse result is treated as "invalid" by
// isFalsyOrHasThrown() whenever that result is itself falsy (e.g. parsing the
// string "false" or "0"), which is a real bug, not just a style preference.
// Also removes the copy-paste risk that once shipped a wrong error message
// (yaml-to-toml claiming "Provided JSON is not valid").
export function createParseValidationRule(parse: (value: string) => unknown, formatName: string): UseValidationRule<string> {
  return {
    validator: (value: string) => value === '' || isNotThrowing(() => parse(value)),
    message: `Provided ${formatName} is not valid.`,
  };
}

export function isFalsyOrHasThrown(cb: () => ValidatorReturnType): boolean {
  try {
    const returnValue = cb();

    if (_.isNil(returnValue)) {
      return true;
    }

    return returnValue === false;
  }
  catch {
    return true;
  }
}

export function getErrorMessageOrThrown(cb: () => GetErrorMessageReturnType): string {
  try {
    return cb() || '';
  }
  catch (e: unknown) {
    return String(e);
  }
}

export interface ValidationAttrs {
  feedback: string
  validationStatus: string | undefined
}

export function useValidation<T, S = T>({
  source,
  rules,
  watch: watchRefs = [],
}: {
  source: Ref<T, S>
  rules: MaybeRef<UseValidationRule<T>[]>
  watch?: Ref<unknown>[]
}) {
  const state = reactive<{
    message: string
    status: undefined | 'error'
    isValid: boolean
    attrs: ValidationAttrs
  }>({
    message: '',
    status: undefined,
    isValid: false,
    attrs: {
      validationStatus: undefined,
      feedback: '',
    },
  });

  watch(
    [source, ...watchRefs],
    () => {
      state.message = '';
      state.status = undefined;

      for (const rule of get(rules)) {
        if (isFalsyOrHasThrown(() => rule.validator(source.value))) {
          if (rule.getErrorMessage) {
            const getErrorMessage = rule.getErrorMessage;
            state.message = rule.message.replace('{0}', getErrorMessageOrThrown(() => getErrorMessage(source.value)));
          }
          else {
            state.message = rule.message;
          }
          state.status = 'error';
        }
      }

      state.isValid = state.status !== 'error';
      state.attrs.feedback = state.message;
      state.attrs.validationStatus = state.status;
    },
    { immediate: true },
  );

  return state;
}
