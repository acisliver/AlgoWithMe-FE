import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IDEPage from './pages/IDEPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <IDEPage />
  )
}

export default App
