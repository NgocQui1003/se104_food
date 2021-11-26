import { combineReducers } from "redux";
import savedListReducer from "./savedList";

const rootReducer = combineReducers({
    savedList: savedListReducer,
})

export default rootReducer;