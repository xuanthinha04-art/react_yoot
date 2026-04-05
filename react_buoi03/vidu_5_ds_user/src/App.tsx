import { useState } from 'react'
import './App.css'
import User from './components/UserV3'

function App() {
    const [count, setCount] = useState("");
  return (
    <div>
      <User/>
    </div>
  )
}

export default App
