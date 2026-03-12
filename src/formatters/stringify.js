export default (array, replacer = ' ', space = 2) => {
  const result = ['{']

  for (const { key, value, char } of array) {
    result.push(`${replacer.repeat(space)} ${char} ${key}: ${value}`)
  }

  result.push('}')

  return result.join('\n')
}
