import constants from '../constants'

const initState = {
  value: 0,
  stateDrawer: [
    {
      denom: 10000,
      quantity: 3
    },
    {
      denom: 5000,
      quantity: 6
    },
    {
      denom: 1000,
      quantity: 8
    }
  ]
}

const ACTION_HANDLERS = {
  [constants.TEST__CLICK]: (state) => {
    const { value } = state
    return {
      ...state,
      value: value + 1
    }
  },
  [constants.SET_TO_DRAWER]: (state, data) => {
    const { stateDrawer } = state
    let newData = [];
    if (data.data) {
      newData = data.data;
    }
    return {
      ...state,
      stateDrawer: [...stateDrawer, ...newData]
    }
  }
}

export default function(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  const nextState = handler ? handler(state, action) : state
  return nextState
}
