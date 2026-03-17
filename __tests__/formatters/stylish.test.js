import { describe, test, expect } from '@jest/globals'
import stylish from '../../src/formatters/stylish.js'

describe('stylish formatter', () => {
  test('Root. All statuses. Flat structure with primitive values', () => {
    const tree = [
      { key: 'a', value: 1, status: 'unchanged' },
      { key: 'b', value: 2, status: 'added' },
      { key: 'c', value: 3, status: 'deleted' },
      { key: 'd', oldValue: 4, newValue: 5, status: 'modified' },
    ]

    const expected = `{
    a: 1
  + b: 2
  - c: 3
  - d: 4
  + d: 5
}`

    expect(stylish(tree)).toBe(expected)
  })

  test('Nested. Object value. Stringify object branch', () => {
    const tree = [
      {
        key: 'obj',
        value: { a: 1 },
        status: 'added',
      },
    ]

    const expected = `{
  + obj: {
        a: 1
    }
}`

    expect(stylish(tree)).toBe(expected)
  })

  test('Recursion. Array node. Nested diff processing', () => {
    const tree = [
      {
        key: 'node',
        value: [
          { key: 'a', value: 1, status: 'unchanged' },
        ],
        status: 'unchanged',
      },
    ]

    const expected = `{
    node: {
        a: 1
    }
}`

    expect(stylish(tree)).toBe(expected)
  })

  test('Deep nesting. Multi-level recursion', () => {
    const tree = [
      {
        key: 'a',
        value: [
          {
            key: 'b',
            value: [
              {
                key: 'c',
                value: 1,
                status: 'added',
              },
            ],
            status: 'unchanged',
          },
        ],
        status: 'unchanged',
      },
    ]

    const expected = `{
    a: {
        b: {
          + c: 1
        }
    }
}`

    expect(stylish(tree)).toBe(expected)
  })

  test('Modified. Old and new values with different types', () => {
    const tree = [
      {
        key: 'key',
        oldValue: { a: 1 },
        newValue: 'text',
        status: 'modified',
      },
    ]

    const expected = `{
  - key: {
        a: 1
    }
  + key: text
}`

    expect(stylish(tree)).toBe(expected)
  })

  test('Error. Unknown status. Exception thrown', () => {
    const tree = [
      {
        key: 'a',
        value: 1,
        status: 'unknown',
      },
    ]

    expect(() => stylish(tree)).toThrow('Status not found: unknown')
  })
})
