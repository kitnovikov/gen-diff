import compareFiles from './compareFiles.js'
import stringify from './formatters/stringify.js'
import { resolveFile, readFile } from './utils.js'

const genDiff = (filepath1, filepath2) => {
  try {
    if (!filepath1 || !filepath2) {
      throw new Error('Path to files are not specified')
    }

    const absolutePath1 = resolveFile(filepath1)
    const absolutePath2 = resolveFile(filepath2)

    const data1 = JSON.parse(readFile(absolutePath1))
    const data2 = JSON.parse(readFile(absolutePath2))

    const diff = compareFiles(data1, data2)

    return stringify(diff)
  }
  catch (e) {
    return e
  }
}

export default genDiff

console.log(genDiff('/Users/nikita/Desktop/Projects/gen-diff/__fixtures__/file1.json', 'file2.json'))
