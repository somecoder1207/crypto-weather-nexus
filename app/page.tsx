'use client'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/store'
import { fetchWeather } from '../lib/slices/weatherSlice'
import { fetchCrypto } from '../lib/slices/cryptoSlice'
import { initCryptoWebSocket } from '../lib/services/websocket'
import { fetchCryptoNews } from '../lib/utils/newsFeed'
import {
  toggleCityFavorite,
  toggleCryptoFavorite,
} from '../lib/slices/favoritesSlice'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function Home() {
  const dispatch = useAppDispatch()
  const weather = useAppSelector((state) => state.weather.cities)
  const crypto = useAppSelector((state) => state.crypto.coins)
  const favorites = useAppSelector((state) => state.favorites)

  const [livePrices, setLivePrices] = useState<Record<string, string>>({})
  const [news, setNews] = useState<any[]>([])

  const previousPrices = useRef<Record<string, number>>({})

  useEffect(() => {
    dispatch(fetchCrypto())
    const cities = ['Kolkata', 'London', 'Tokyo']
    cities.forEach((city) => dispatch(fetchWeather(city)))

    const ws = initCryptoWebSocket((data) => {
      setLivePrices((prev) => {
        Object.entries(data).forEach(([coin, priceStr]) => {
          const price = parseFloat(priceStr)
          const prevPrice = previousPrices.current[coin]

          if (prevPrice && prevPrice - price > 100) {
            toast(`⚠️ ${coin.toUpperCase()} dropped $${(prevPrice - price).toFixed(2)}!`)
          }

          previousPrices.current[coin] = price
        })
        return { ...prev, ...data }
      })
    })

    fetchCryptoNews().then(setNews)

    return () => ws.close()
  }, [dispatch])

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">CryptoWeather Nexus</h1>

      {/* Weather Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(weather).map(([city, data]) => (
          <div key={city} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
              <Link href={`/weather/${data.location.name}`} className="hover:underline">
                {data.location.name}
              </Link>
              <button
                onClick={() => {
                  dispatch(toggleCityFavorite(data.location.name))
                  const isFav = favorites.cities.includes(data.location.name)
                  toast(`${data.location.name} ${isFav ? 'removed from' : 'added to'} favorites`)
                }}
              >
                {favorites.cities.includes(data.location.name) ? '❤️' : '🤍'}
              </button>
            </h2>
            <p>Temperature: {data.current.temp_c}°C</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Condition: {data.current.condition.text}</p>
          </div>
        ))}
      </div>

      {/* Crypto Section */}
      <div>
        <h2 className="text-2xl font-bold mt-6 mb-2">Cryptocurrency Prices</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {crypto.map((coin) => (
            <div key={coin.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold flex justify-between items-center">
                <Link href={`/crypto/${coin.id}`} className="hover:underline">
                  {coin.name}
                </Link>
                <button
                  onClick={() => {
                    dispatch(toggleCryptoFavorite(coin.id))
                    const isFav = favorites.cryptos.includes(coin.id)
                    toast(`${coin.name} ${isFav ? 'removed from' : 'added to'} favorites`)
                  }}
                >
                  {favorites.cryptos.includes(coin.id) ? '❤️' : '🤍'}
                </button>
              </h3>
              <p>
                Price: $
                {livePrices[coin.id]
                  ? parseFloat(livePrices[coin.id]).toLocaleString()
                  : coin.current_price.toLocaleString()}
              </p>
              <p>
                24h Change:{' '}
                <span className={
                  coin.price_change_percentage_24h > 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Latest Crypto News</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {news.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}