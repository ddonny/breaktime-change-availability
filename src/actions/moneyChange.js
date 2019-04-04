import constants from './../constants'

const setToDrawer = function setToDrawer(data) {
  return {
    type: constants.SET_TO_DRAWER,
    data: data
  }
}

export default {
  setToDrawer
}
