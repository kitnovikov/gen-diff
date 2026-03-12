export const makeFile = name => ({ name, type: 'file' })

export const makeDirectory = (name, children = []) => ({ name, type: 'directory', children })
