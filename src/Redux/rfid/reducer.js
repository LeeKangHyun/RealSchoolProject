export default function (state = {
  blueT: [
    {
      rfid: 12313123,
      name: "1",
      state: true
    },
    {
      rfid: 12313122,
      name: "2",
      state: true
    },
    {
      rfid: 12314122,
      name: "3",
      state: true
    }
  ]
}, action) {
  const { blueT } = state;
  switch (action.type) {
    case 'RFID_CREATE_ITEM':
      return {
        blueT: [...blueT, action.obj]
      };
      break;
    case 'RFID_CHANGE_ITEM':
    case 'RFID_REMOVE_ITEM':
      return {
        blueT: [
          ...action.obj
        ]
      };
      break;
    default:
      return state;
  }
}
