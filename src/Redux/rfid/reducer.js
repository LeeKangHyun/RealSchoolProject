export default function (state = {
  blueT: []
}, action) {
  const { blueT } = state;
  switch (action.type) {
    case 'RFID_CREATE_ITEM':
      return {
        blueT: [...blueT, action.obj]
      };
    case 'RFID_CHANGE_ITEM':
    case 'RFID_REMOVE_ITEM':
      return {
        blueT: [
          ...action.obj
        ]
      };
    default:
      return state;
  }
}
