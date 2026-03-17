import stylish from './stylish.js'

const formatters = {
  stylish: stylish,
}

export default (format) => {
  const formatter = formatters[format]

  if (!format) {
    throw new Error(`Format not found: ${format}`)
  }

  return formatter
}
