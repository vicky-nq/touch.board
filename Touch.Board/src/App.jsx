import { useState } from 'react'
import Canvas from './components/Canvas'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="w-full max-w-4xl p-4 bg-white rounded shadow">
        <Canvas />
      </main>
    </div>
  )
}