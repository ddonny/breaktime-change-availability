import constants from '../constants'

const initState = {
  value: 0,
  stateDrawer: [
    {
      denom: 100000
    },
    {
      denom: 50000
    },
    {
      denom: 20000
    },
    {
      denom: 10000
    },
    {
      denom: 5000
    },
    {
      denom: 1000
    },
    {
      denom: 500
    },
    {
      denom: 100
    },
    {
      denom: 50
    }
  ]
}

const ACTION_HANDLERS = {
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
