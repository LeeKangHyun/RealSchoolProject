export default function (state = {
  todos: [],
}, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD':
      return {
        ...state,
        todos: [payload, ...state.todos],
        btList: [...state.btList],
        btState: [...state.btState]
      };
      break;
    case 'REMOVE':
      return {
        ...state,
        todos: state.todos.filter((todo, i) => i !== payload)
      };
      break;
    default:
      return state;
  }
}