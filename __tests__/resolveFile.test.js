import { describe, test, expect } from '@jest/globals'
import { resolveFile } from '../src/utils.js'
import path from 'path'

const getFixturePath = filename => path.resolve('__fixtures__', filename)

describe('resolveFile', () => {
  test('Returns absolute path. Relative file path, file exists, single match', () => {
    const filename = 'file2.json'

    const absolutePath = resolveFile(filename)

    expect(absolutePath).toBe(getFixturePath(filename))
  })

  test('Throws “Two identical files found” error. Relative file path, multiple files found', () => {
    const filename = 'file1.json'

    expect(() => resolveFile(filename)).toThrow(`Multiple files found: ${filename}`)
  })

  test('Throws “Two identical files found” error. Relative file path, multiple files found', () => {
    const filename = 'file3.json'

    expect(() => resolveFile(filename)).toThrow(`File not found: ${filename}`)
  })

  test('Throws “File not found” error. Relative file path, file does not exist', () => {
    const filename = 'file3.json'

    expect(() => resolveFile(filename)).toThrow(`File not found: ${filename}`)
  })

  test('Returns absolute path. Absolute file path, file exists', () => {
    const filepath = getFixturePath('file2.json')

    const absolutePath = resolveFile(filepath)

    expect(absolutePath).toBe(filepath)
  })

  test('Throws “File not found” error. Relative file path, file does not exist', () => {
    const filepath = getFixturePath('file3.json')

    expect(() => resolveFile(filepath)).toThrow(`File not found: ${filepath}`)
  })
})
