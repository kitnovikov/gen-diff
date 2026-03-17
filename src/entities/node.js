import statuses from './statuses.js'

export const makeNodeLeft = (key, value) => ({ key: key, value: value, status: statuses.deleted })

export const makeNodeRight = (key, value) => ({ key: key, value: value, status: statuses.added })

export const makeNodeInternal = (key, value) => ({ key: key, value: value, status: statuses.unchanged })

export const makeNodeLeaf = (key, oldValue, newValue) => ({ key: key, oldValue, newValue, status: statuses.modified })
