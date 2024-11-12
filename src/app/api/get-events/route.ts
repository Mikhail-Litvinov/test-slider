import { NextResponse } from 'next/server'
import pool from '../../lib/db'
import { EventType } from '@/shared/types'

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT date, type, description FROM events')
    
    const events = rows as EventType[]

    const chunkSize = 5
    const slides = []

    for (let i = 0; i < events.length; i += chunkSize) {
      slides.push(events.slice(i, i + chunkSize))
    }

    return NextResponse.json(slides, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching slider data:', error)
      return NextResponse.json({ message: 'Failed to fetch slider data.', error: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 })
  }
}