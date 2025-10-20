import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkBg text-darkText dark:bg-white dark:text-black p-4">
      
      {/* Logos */}
      <div className="flex gap-6 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="w-20 h-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="w-20 h-20" alt="React logo" />
        </a>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Vite + React</h1>

      {/* Card */}
      <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black p-6 rounded-xl shadow-lg flex flex-col items-center mb-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2 rounded-lg border border-transparent text-base font-medium bg-gray-700 dark:bg-gray-300 hover:border-linkBlue transition-colors mb-4"
        >
          count is {count}
        </button>
        <p className="text-center">
          Edit <code className="bg-gray-800 dark:bg-gray-200 px-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Docs link */}
      <p className="text-center text-sm text-gray-400 dark:text-gray-600">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
