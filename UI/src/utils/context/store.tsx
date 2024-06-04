import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers/rootReducers'; // your root reducer

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);

