export default function (state = {
  alert: {
    on: false,
  },
  add: {
    on: false,
  }
}, action) {
  switch (action.type) {
    case 'MODAL_ALERT':
      return {
        alert: {
          on: action.on
        }
      };
    case 'MODAL_ADD':
      return {
        add: {
          on: action.on
        }
      };
    default:
      return state;
  }
}
