import { makeFile, makeDirectory } from './entities/tree.js'
import path from 'path'
import fs from 'fs'

const buildDirectoryTree = (dir) => {
  const iter = (_dir) => {
    const filenames = fs.readdirSync(_dir)

    return filenames.flatMap((name) => {
      const filepath = path.join(_dir, name)
      const stat = fs.statSync(filepath)

      if (stat.isFile()) {
        return makeFile(name)
      }

      return makeDirectory(name, iter(filepath))
    })
  }

  return makeDirectory(dir, iter(dir))
}

const findPathsByFilename = (tree, filename) => {
  if (!tree.children?.length) {
    return []
  }

  const iter = (node, acc) => {
    const currentPath = path.join(acc, node.name)

    if (node.type === 'file') {
      return node.name === filename ? [currentPath] : []
    }

    return node.children.flatMap(child =>
      iter(child, currentPath),
    )
  }

  return iter(tree, '')
}

const resolveFile = (filename) => {
  if (fs.existsSync(filename)) {
    return filename
  }

  const tree = buildDirectoryTree(process.cwd())

  const result = findPathsByFilename(tree, filename)

  if (result.length === 0) {
    throw new Error(`File not found: ${filename}`)
  }

  if (result.length > 1) {
    throw new Error(`Multiple files found: ${filename}`)
  }

  return result.at(0)
}

const readFile = filepath => fs.readFileSync(filepath, 'utf-8')

export {
  buildDirectoryTree,
  findPathsByFilename,
  resolveFile,
  readFile,
}
