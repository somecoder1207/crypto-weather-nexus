import Parser from 'rss-parser'

const parser = new Parser()

export const fetchCryptoNews = async () => {
    const res = await fetch('/api/news')
    if (!res.ok) throw new Error('Failed to fetch news')
    return await res.json()
  }
  