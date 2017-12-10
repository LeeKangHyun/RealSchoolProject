export default function (state = {
  alert: {
    on: false,
    data: {}
  },
  add: {
    on: false,
    rfid: '',
  }
}, action) {
  switch (action.type) {
    case 'MODAL_ALERT':
      return {
        ...state,
        alert: {
          on: action.on,
          data: action.data,
        }
      };
    case 'MODAL_ADD':
      return {
        ...state,
        add: {
          on: action.on,
          rfid: action.rfid,
        }
      };
    default:
      return state;
  }
}
