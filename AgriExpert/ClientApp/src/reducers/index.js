import { combineReducers } from "redux";
import FieldValuesReducer from './FieldValuesReducer'
const allReducer = combineReducers({
    expertDetails: FieldValuesReducer.FieldvaluesReducer.expertDetailsReducer
})
export default allReducer;