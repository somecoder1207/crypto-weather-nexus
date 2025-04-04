import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import weatherReducer from './slices/weatherSlice'
import cryptoReducer from './slices/cryptoSlice'
import favoritesReducer from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    favorites: favoritesReducer,
  },
})


// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
