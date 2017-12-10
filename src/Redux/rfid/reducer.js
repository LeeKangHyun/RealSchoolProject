export default function (state = {
  blueT: []
}, action) {
  const { blueT } = state;
  switch (action.type) {
    case 'RFID_CREATE_ITEM':
      return {
        ...state,
        blueT: [...blueT, action.obj]
      };
    case 'RFID_CHANGE_ITEM':
    case 'RFID_REMOVE_ITEM':
      return {
        ...state,
        blueT: [
          ...action.obj
        ]
      };
    default:
      return state;
  }
}
