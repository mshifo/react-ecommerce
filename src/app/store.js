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
import { pokemonApi } from './services/api.slice';

const persistConfig = {
  key: 'cart',
  storage,
}

const persistedCart = persistReducer(persistConfig, cartSlice)

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    /*getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),*/
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware)
})

export const persister = persistStore(store)