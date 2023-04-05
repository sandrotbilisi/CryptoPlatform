import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import PCPart from './components/PCpart'
import AdminPage from './components/AdminPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <PCPart />
    <AdminPage />
    </>
  )
}

export default App
 