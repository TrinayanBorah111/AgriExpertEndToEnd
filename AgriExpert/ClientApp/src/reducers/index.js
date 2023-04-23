import { combineReducers } from "redux";
import FieldValuesReducer from './FieldValuesReducer'
const allReducer = combineReducers({
    expertDetails: FieldValuesReducer.FieldvaluesReducer.expertDetailsReducer,
    customerDetails: FieldValuesReducer.FieldvaluesReducer.customerDetailsReducer
})
export default allReducer;