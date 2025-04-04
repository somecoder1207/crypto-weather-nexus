import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

export async function GET() {
  try {
    const feed = await parser.parseURL('https://www.coindesk.com/arc/outboundfeeds/rss/')
    const topFive = feed.items.slice(0, 5)
    return NextResponse.json(topFive)
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
