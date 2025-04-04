import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    )
    return { city, data: response.data }
  }
)

type WeatherState = {
  cities: { [key: string]: any }
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  cities: {},
  loading: false,
  error: null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.cities[action.payload.city] = action.payload.data
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch weather'
      })
  },
})

export default weatherSlice.reducer
