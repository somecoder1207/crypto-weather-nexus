import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  cities: string[]
  cryptos: string[]
}

const initialState: FavoritesState = {
  cities: [],
  cryptos: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleCityFavorite: (state, action: PayloadAction<string>) => {
      const city = action.payload
      state.cities.includes(city)
        ? state.cities.splice(state.cities.indexOf(city), 1)
        : state.cities.push(city)
    },
    toggleCryptoFavorite: (state, action: PayloadAction<string>) => {
      const crypto = action.payload
      state.cryptos.includes(crypto)
        ? state.cryptos.splice(state.cryptos.indexOf(crypto), 1)
        : state.cryptos.push(crypto)
    },
  },
})

export const { toggleCityFavorite, toggleCryptoFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
