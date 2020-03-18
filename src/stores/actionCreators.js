function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

const INDEX_STORE = 'INDEX_STORE'
const CARLIST_STROE = 'CARLIST_STROE'

export const indexStore = makeActionCreator(INDEX_STORE, 'index-store')
export const carlistStore = makeActionCreator(CARLIST_STROE, 'id', 'carlist-store')