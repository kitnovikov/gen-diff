import { isObject } from '../utils.js'
import statuses from '../entities/statuses.js'

const indentsCount = 4
const leftShift = 2

const getdIndent = (replacer, depth) => replacer.repeat(depth * indentsCount - leftShift)

const getBracketIndent = (replacer, depth) => replacer.repeat(depth * indentsCount - indentsCount)

const buildLine = (indent, char, key, value) => `${indent}${char} ${key}: ${value}`

const stringify = (tree, replacer, depth) => {
  if (!isObject(tree)) {
    return tree
  }

  const indent = getdIndent(replacer, depth)
  const bracketIndent = getBracketIndent(replacer, depth)

  const lines = Object.entries(tree)
  const result = []

  for (const [key, value] of lines) {
    const children = stringify(value, replacer, depth + 1)
    result.push(buildLine(indent, ' ', key, children))
  }

  return ['{', ...result, `${bracketIndent}}`].join('\n')
}

const stylish = (tree, replacer = ' ') => {
  const iter = (node, depth = 1) => {
    const buildChildren = (value) => {
      if (isObject(value)) {
        return stringify(value, replacer, depth + 1)
      }

      return Array.isArray(value) ? iter(value, depth + 1) : value
    }

    const indent = getdIndent(replacer, depth)
    const bracketIndent = getBracketIndent(replacer, depth)
    const result = []

    for (const item of node) {
      const { status, key, value, newValue, oldValue } = item

      const children = buildChildren(value)

      switch (status) {
        case statuses.unchanged:
          result.push(buildLine(indent, ' ', key, children))
          break
        case statuses.deleted:
          result.push(buildLine(indent, '-', key, children))
          break
        case statuses.added:
          result.push(buildLine(indent, '+', key, children))
          break
        case statuses.modified:
          result.push(buildLine(indent, '-', key, buildChildren(oldValue)))
          result.push(buildLine(indent, '+', key, buildChildren(newValue)))
          break
        default:
          throw new Error(`Status not found: ${status}`)
      }
    }

    return ['{', ...result, `${bracketIndent}}`].join('\n')
  }

  return iter(tree)
}

export default stylish
