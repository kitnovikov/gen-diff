import compareFiles from './compareFiles.js'
import { resolveFile, readFile } from './utils.js'
import parsed from './parsers/index.js'
import formatters from './formatters/index.js'
import path from 'path'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    if (!filepath1 || !filepath2) {
      throw new Error('Path to files are not specified')
    }

    const absolutePath1 = resolveFile(filepath1)
    const absolutePath2 = resolveFile(filepath2)

    const data1 = parsed(readFile(absolutePath1), path.extname(absolutePath1).slice(1))
    const data2 = parsed(readFile(absolutePath2), path.extname(absolutePath2).slice(1))

    const diff = compareFiles(data1, data2)

    return formatters(format)(diff)
  }
  catch (e) {
    return e
  }
}

export default genDiff

const result = genDiff('/Users/nikita/Desktop/Projects/gen-diff/__fixtures__/file1.json', 'file2.json')

console.log(result)
