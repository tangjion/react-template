const defaultState = {
  indexData: 'indexData',
  carlistData: 'carlistData'
}

export default (state = defaultState, action) => {
  if (action.type == 'INDEX_STORE') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.indexData = action.value;
    return newState;
  }
  return state;
}