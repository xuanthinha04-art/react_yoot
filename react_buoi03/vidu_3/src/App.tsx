import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState("");

  const add = (text:string) => {
    setCount(text)
  }
  const xoa = () =>{
    setCount("")
  }

  return (
    <div>
      <label htmlFor="">Search</label>
      <input type="text" onChange={(e)=> add(e.target.value)} 
        placeholder='Type something' value={count} style={{height: "50px"}}/>
      <button onClick={xoa}>X</button>
      <h2>Preview: {count}</h2>
    </div>
  )
}

export default App
