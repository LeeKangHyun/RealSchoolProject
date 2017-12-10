export function alert_modal(on = false, data = {}) {
  return {
    type: 'MODAL_ALERT',
    on: on,
    data: data,
  }
}

export function add_modal(on = false, rfid = '') {
  return {
    type: 'MODAL_ADD',
    on: on,
    rfid: rfid,
  }
}