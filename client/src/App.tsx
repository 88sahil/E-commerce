import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Second from './Second'
function App() {
  const [count, setCount] = useState(0)
  interface user{
    name:String,
    age:number
  }
  type color= {
    style:React.CSSProperties
  }
  let a:user = {
    name:'sahil',
    age:18
  }
  console.log(typeof a)
  return (
    <>
      <Second name="sahil" />
    </>
  )
}

export default App
