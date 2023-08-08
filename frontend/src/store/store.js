import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers/";
import thunk from "redux-thunk";

// Store the state in local storage when it changes

// Load the state from local storage when the page is reloaded
const persistedState = localStorage.getItem('state')
? JSON.parse(localStorage.getItem('state'))
: {};

const store = createStore(allReducers, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
