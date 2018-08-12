import constants from 'constants/index'


const clickHandler = function clickHandler() {
  return {
    type: constants.TEST__CLICK
  }
}

const setToDrawer = function setToDrawer(data) {
  return {
    type: constants.SET_TO_DRAWER,
    data: data
  }
}

export default {
  clickHandler,
  setToDrawer
}
