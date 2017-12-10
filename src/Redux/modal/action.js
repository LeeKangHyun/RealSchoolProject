export function alert_modal(on = false, data = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: 'MODAL_ALERT',
      on: on,
      data: data,
    })
  }
}

export function add_modal(on = false, rfid = '') {
  return (dispatch, getState) => {
    dispatch({
      type: 'MODAL_ADD',
      on: on,
      rfid: rfid,
    })
  }
}