// buildDirectoryTree.test.js
import { describe, test, expect, afterEach } from '@jest/globals'
import mock from 'mock-fs'
import { buildDirectoryTree } from '../src/utils.js'
import { makeFile, makeDirectory } from '../src/entities/tree.js'

describe('buildDirectoryTree', () => {
  afterEach(() => {
    mock.restore()
  })

  test('buildDirectoryTree. File node is created. Single file in root directory', () => {
    mock({
      root: {
        'index.js': 'console.log("hello")',
      },
    })

    const tree = buildDirectoryTree('root')

    expect(tree).toEqual(
      makeDirectory('root', [
        makeFile('index.js'),
      ]),
    )
  })

  test('buildDirectoryTree. File node is created recursively. File inside nested directory', () => {
    mock({
      root: {
        src: {
          'index.js': 'console.log("hello")',
        },
      },
    })

    const tree = buildDirectoryTree('root')

    expect(tree).toEqual(
      makeDirectory('root', [
        makeDirectory('src', [
          makeFile('index.js'),
        ]),
      ]),
    )
  })

  test('buildDirectoryTree. Empty directory node is created. Empty directory in root', () => {
    mock({
      root: {
        utils: {},
      },
    })

    const tree = buildDirectoryTree('root')

    expect(tree).toEqual(
      makeDirectory('root', [
        makeDirectory('utils'),
      ]),
    )
  })

  test('buildDirectoryTree. Directory node is created and processed recursively. Directory with files in root', () => {
    mock({
      root: {
        src: {
          'index.js': 'console.log("hello")',
          'app.js': 'console.log("app")',
        },
      },
    })

    const tree = buildDirectoryTree('root')

    expect(tree).toEqual(
      makeDirectory('root', [
        makeDirectory('src', [
          makeFile('app.js'),
          makeFile('index.js'),
        ]),
      ]),
    )
  })

  test('buildDirectoryTree. Deeply nested file nodes are created recursively. File inside deeply nested directories', () => {
    mock({
      root: {
        src: {
          utils: {
            'helper.js': 'console.log("helper")',
          },
        },
      },
    })

    const tree = buildDirectoryTree('root')

    expect(tree).toEqual(
      makeDirectory('root', [
        makeDirectory('src', [
          makeDirectory('utils', [
            makeFile('helper.js'),
          ]),
        ]),
      ]),
    )
  })
})
