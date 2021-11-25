import { createStore } from 'redux';
import rootReducer from './Reducers';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

const peristedState = loadState();
const store = createStore(
    rootReducer, 
    peristedState,
    // compose(applyMiddleware(thunk)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {

    console.log(store.getState());
    saveState(store.getState());
});





export default store;
