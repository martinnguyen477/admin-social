/* REDUX - STORE  */
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { accountReducer } from "./account/reducers";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account']
};

// TẠO STORE - TỔNG REDUCERS (CHỨA CÁC REDUCERS CỦA CÁC FEATURE) - (ACCOUNT, PROFILE...)
// Khi Reducer tương tác thì Store này tự nhận State mới từ Action Dispatch vào.
const rootReducer = combineReducers({
  account: accountReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

// State tổng hợp => Thì chúng ta có thể lấy được state bất cứ chỗ nào từ State TỔNG HỢP này
export type AppState = ReturnType<typeof rootReducer>;

//Console Store View
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
}
const store = configureStore()
let persistor = persistStore(store)

export {
  store, persistor
}