import { useState } from 'react'

import './App.css'

import Dashboard from "./ui/Dashboard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Dashboard></Dashboard>
    </>
  )
}

export default App
