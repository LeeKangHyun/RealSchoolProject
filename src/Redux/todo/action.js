// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (item) => {
    return {type: types.ADD, payload: item}
  },
  remove: (index) => {
    return {type: types.REMOVE, payload: index}
  }
};