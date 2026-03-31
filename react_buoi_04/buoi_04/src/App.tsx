import { useState } from 'react'
import './App.css'
import Cart from './Component/Cart.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Cart/>
      </div>
    </>
  )
}

export default App
