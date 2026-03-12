const compareFiles = (json1, json2) => {
  const keys = Object.keys({ ...json1, ...json2 }).sort()
  const result = []

  for (const key of keys) {
    const value1 = json1[key]
    const value2 = json2[key]

    if (value1 == value2) {
      result.push({ key: key, value: value1, char: ' ' })
    }
    else if (Object.hasOwn(json1, key) && !Object.hasOwn(json2, key)) {
      result.push({ key: key, value: value1, char: '-' })
    }
    else if (!Object.hasOwn(json1, key) && Object.hasOwn(json2, key)) {
      result.push({ key: key, value: value2, char: '+' })
    }
    else {
      result.push({ key: key, value: value1, char: '-' })
      result.push({ key: key, value: value2, char: '+' })
    }
  }

  return result
}

export default compareFiles;