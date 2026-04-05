import { useState } from 'react'
import './App.css'
import User from './component/User.tsx'

function App() {
  const [count, setCount] = useState("");

  return (
   <div>
    <User/>
   </div>
  )
}

export default App
