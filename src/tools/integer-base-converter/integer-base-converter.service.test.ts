import { describe, expect, it } from 'vitest';
import { convertBase } from './integer-base-converter.service';

const t = (key: string) => key;

describe('integer-base-converter', () => {
  describe('convertBase', () => {
    describe('when the input and target bases are between 2 and 64', () => {
      it('should convert integer between different bases', () => {
        expect(convertBase({ value: '0', fromBase: 2, toBase: 11, t })).toEqual('0');
        expect(convertBase({ value: '0', fromBase: 5, toBase: 2, t })).toEqual('0');
        expect(convertBase({ value: '0', fromBase: 10, toBase: 16, t })).toEqual('0');
        expect(convertBase({ value: '10100101', fromBase: 2, toBase: 16, t })).toEqual('a5');
        expect(convertBase({ value: '192654', fromBase: 10, toBase: 8, t })).toEqual('570216');
        expect(convertBase({ value: 'zz', fromBase: 64, toBase: 10, t })).toEqual('2275');
        expect(convertBase({ value: '42540766411283223938465490632011909384', fromBase: 10, toBase: 10, t })).toEqual('42540766411283223938465490632011909384');
        expect(convertBase({ value: '42540766411283223938465490632011909384', fromBase: 10, toBase: 16, t })).toEqual('20010db8000085a300000000ac1f8908');
        expect(convertBase({ value: '20010db8000085a300000000ac1f8908', fromBase: 16, toBase: 10, t })).toEqual('42540766411283223938465490632011909384');
      });
    });
  });
});
