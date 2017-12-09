export function alert_modal(on = false) {
  return {
    type: 'MODAL_ALERT',
    on: on
  }
}