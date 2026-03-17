import { describe, test, expect } from '@jest/globals'
import compareFiles from '../src/compareFiles.js'

describe('compareFiles', () => {
  test('Root JSON. Unchanged key. Same primitive value in both flat files', () => {
    const data1 = { timeout: 50 }
    const data2 = { timeout: 50 }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      { key: 'timeout', value: 50, status: 'unchanged' },
    ])
  })

  test('Root JSON. Changed key value. Different primitive values in flat files', () => {
    const data1 = { timeout: 50 }
    const data2 = { timeout: 20 }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      { key: 'timeout', oldValue: 50, newValue: 20, status: 'modified' },
    ])
  })

  test('Root JSON. Removed key. Key exists only in first file', () => {
    const data1 = { proxy: '123.234.53.22' }
    const data2 = {}

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      { key: 'proxy', value: '123.234.53.22', status: 'deleted' },
    ])
  })

  test('Root JSON. Added key. Key exists only in second file', () => {
    const data1 = {}
    const data2 = { verbose: true }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      { key: 'verbose', value: true, status: 'added' },
    ])
  })

  test('Nested object. Changed value. Different values on second nesting level', () => {
    const data1 = {
      common: { setting1: 'Value 1' },
    }
    const data2 = {
      common: { setting1: 'Value 2' },
    }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      {
        key: 'common', value: [
          { key: 'setting1', oldValue: 'Value 1', newValue: 'Value 2', status: 'modified' },
        ], status: 'unchanged',
      },
    ])
  })

  test('Deep nested JSON. Changed value. Difference on third nesting level', () => {
    const data1 = {
      common: {
        setting6: {
          doge: {
            wow: '',
          },
        },
      },
    }
    const data2 = {
      common: {
        setting6: {
          doge: {
            wow: 'so much',
          },
        },
      },
    }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      {
        key: 'common', value: [
          {
            key: 'setting6', value: [
              {
                key: 'doge', value: [
                  { key: 'wow', oldValue: '', newValue: 'so much', status: 'modified' },
                ], status: 'unchanged',
              },
            ], status: 'unchanged',
          },
        ], status: 'unchanged',
      },
    ])
  })

  test('Nested object. Value type changed. Object replaced with primitive', () => {
    const data1 = {
      group1: {
        nest: {
          key: 'value',
        },
      },
    }
    const data2 = {
      group1: {
        nest: 'str',
      },
    }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      {
        key: 'group1', value: [
          { key: 'nest', oldValue: { key: 'value' }, newValue: 'str', status: 'modified' },
        ], status: 'unchanged',
      },
    ])
  })

  test('Deep nested JSON. Added key. New key inside nested object', () => {
    const data1 = {
      common: {
        setting6: {
          key: 'value',
        },
      },
    }
    const data2 = {
      common: {
        setting6: {
          key: 'value',
          ops: 'vops',
        },
      },
    }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      {
        key: 'common', value: [
          {
            key: 'setting6', value: [
              { key: 'key', value: 'value', status: 'unchanged' },
              { key: 'ops', value: 'vops', status: 'added' },
            ], status: 'unchanged',
          },
        ], status: 'unchanged',
      },
    ])
  })

  test('Flat and nested JSON. Key sorting. Keys appear in random order in source files', () => {
    const data1 = {
      b: 2,
      a: 1,
      common: {
        z: 3,
        x: 1,
        y: 2,
      },
    }
    const data2 = {
      b: 2,
      a: 1,
      common: {
        z: 3,
        x: 1,
        y: 2,
      },
    }

    const result = compareFiles(data1, data2)

    expect(result).toEqual([
      { key: 'a', value: 1, status: 'unchanged' },
      { key: 'b', value: 2, status: 'unchanged' },
      {
        key: 'common', value: [
          { key: 'x', value: 1, status: 'unchanged' },
          { key: 'y', value: 2, status: 'unchanged' },
          { key: 'z', value: 3, status: 'unchanged' },
        ], status: 'unchanged',
      },
    ])
  })
})
