import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import auth from "./src/reducers/auth";
import reports from "./src/reducers/reports";
import AsyncStorage from '@react-native-community/async-storage'
import { persistCombineReducers, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'auth',
  blacklist: ['reports'],
  storage: AsyncStorage,
}

const reducers = persistCombineReducers(persistConfig, {
  auth,
  reports
});

const enhancer = applyMiddleware(thunk);

const store = createStore(reducers, {}, enhancer);

export const persistor = persistStore(store)

export default store;

store.subscribe(() => {
  console.log("state", store.getState())
})