import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//Cach 1
function App() {
  const [count, setCount] = useState(true);

  return (
    <div>
      <h1>Status: {count? "On" : "Off"}</h1>
      <button onClick={()=>setCount(!count)} style={{marginRight: "10px", height: "50px", width: "50px"}}> Click</button>
    </div>
  )
}

// //Cach 2
// function App() {
//   const [count, setCount] = useState<boolean>(true);

//   const off = () => {
//     setCount(!count);
//   }

//   return (
//     <div>
//       <h1>Status: {count? "On" : "Off"}</h1>
//       <button onClick={off} style={{marginRight: "10px"}}>Click</button>
//     </div>
//   )
// }

export default App
