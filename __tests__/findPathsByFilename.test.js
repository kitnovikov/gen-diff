import { describe, test, expect } from '@jest/globals'
import { findPathsByFilename } from '../src/utils.js'
import { makeFile, makeDirectory } from '../src/entities/tree.js'

describe('findPathsByFilename', () => {
  test('Returns empty array. Tree is empty, file name is invalid', () => {
    const result = findPathsByFilename({}, '–')

    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  test('Returns empty array. Tree is empty, file name is valid', () => {
    const result = findPathsByFilename({}, 'file1.json')

    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  test('Returns empty array. Tree is not empty, valid file name, file not found', () => {
    const tree = makeDirectory('dir1', [
      makeFile('file1.json'),
      makeDirectory('dir2', []),
      makeDirectory('dir3', [
        makeFile('file2.json'),
      ]),
    ])

    const result = findPathsByFilename(tree, 'file_test.js')

    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  test('Returns single file path. Tree is not empty, valid file name, one file found', () => {
    const tree = makeDirectory('dir1', [
      makeFile('file1.json'),
      makeDirectory('dir2', []),
      makeDirectory('dir3', [
        makeFile('file2.json'),
      ]),
    ])

    const result = findPathsByFilename(tree, 'file2.json')

    expect(result).toHaveLength(1)
    expect(result).toEqual(['dir1/dir3/file2.json'])
  })

  test('Returns empty array. Tree is not empty, file name is invalid', () => {
    const tree = makeDirectory('dir1', [
      makeFile('file1.json'),
      makeDirectory('dir2', []),
      makeDirectory('dir3', [
        makeFile('file2.json'),
      ]),
    ])

    const result = findPathsByFilename(tree, 'file3.json')

    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  test('Returns multiple file paths. Tree is not empty, valid file name, more than one file found', () => {
    const tree = makeDirectory('dir1', [
      makeFile('file1.json'),
      makeDirectory('dir2', []),
      makeDirectory('dir3', [
        makeFile('file1.json'),
      ]),
    ])

    const result = findPathsByFilename(tree, 'file1.json')

    expect(result).toHaveLength(2)
    expect(result).toEqual(['dir1/file1.json', 'dir1/dir3/file1.json'])
  })
})
