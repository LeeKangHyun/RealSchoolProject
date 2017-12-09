export default function (state = {
  alert: {
    on: false,
  }
}, action) {
  const { alert } = state;
  switch (action.type) {
    case 'MODAL_ALERT':
      return {
        alert: {
          on: action.on
        }
      };
      break;
    default:
      return state;
  }
}
