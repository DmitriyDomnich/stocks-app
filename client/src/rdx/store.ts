import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { groupsReducer } from './groups/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tickersReducer } from './tickers/reducer';
import { chartsReducer } from './charts/reducer';

const rootReducer = combineReducers({
  groups: groupsReducer,
  tickers: tickersReducer,
  charts: chartsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['tickers', 'charts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
