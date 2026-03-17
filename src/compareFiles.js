import { makeNodeInternal, makeNodeLeaf, makeNodeLeft, makeNodeRight } from './entities/node.js'
import { isObject } from './utils.js'

const compareFiles = (json1, json2) => {
  const keys = Object.keys({ ...json1, ...json2 }).sort()
  const result = []

  for (const key of keys) {
    const value1 = json1[key]
    const value2 = json2[key]

    if (isObject(value1) && isObject(value2)) {
      result.push(makeNodeInternal(key, compareFiles(value1, value2)))
    }
    else if (value1 === value2) {
      result.push(makeNodeInternal(key, value1))
    }
    else if (!Object.hasOwn(json2, key)) {
      result.push(makeNodeLeft(key, value1))
    }
    else if (!Object.hasOwn(json1, key)) {
      result.push(makeNodeRight(key, value2))
    }
    else {
      result.push(makeNodeLeaf(key, value1, value2))
    }
  }

  return result
}

export default compareFiles
