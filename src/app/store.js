import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice';
import loginSlice from './features/loginSlice';
import globalSlice from './features/globalSlice';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'cart',
  storage,
}

const persistedCart = persistReducer(persistConfig, cartSlice)

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persister = persistStore(store)