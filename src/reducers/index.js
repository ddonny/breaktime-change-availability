import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import moneyChange from './moneyChange'

export const rootReducer = combineReducers({
    router: routerReducer,
    moneyChange
  })

export default rootReducer
