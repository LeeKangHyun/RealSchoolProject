export function alert_modal(on = false) {
  return {
    type: 'MODAL_ALERT',
    on: on
  }
}

export function add_modal(on = false) {
  return {
    type: 'MODAL_ADD',
    on: on
  }
}