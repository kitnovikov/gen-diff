import jsonParser from './jsonParser.js'
import yamlParser from './yamlParser.js'

const parsers = {
  json: jsonParser,
  yaml: yamlParser,
  yml: yamlParser,
}

export default (data, format) => {
  const parser = parsers[format]

  if (!parser) {
    throw new Error(`Parser not found: ${parser}`)
  }

  return parser(data)
}
