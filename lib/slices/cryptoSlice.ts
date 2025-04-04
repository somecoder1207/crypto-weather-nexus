import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: 'bitcoin,ethereum,solana',
    },
  })
  return res.data
})

type CryptoState = {
  coins: any[]
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  coins: [],
  loading: false,
  error: null,
}

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false
        state.coins = action.payload
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch crypto data'
      })
  },
})

export default cryptoSlice.reducer
