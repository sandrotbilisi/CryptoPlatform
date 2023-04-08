import { useState, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import PCPart from './components/PCpart'
import AdminPage from './components/AdminPage'


export const providerContext = createContext()
export const contractContext = createContext()

function App() {
  const [count, setCount] = useState(0)
  const [provider, setProvider] = useState(false)
  const [contract, setContract] = useState(null)

  return (
    <providerContext.Provider value={[provider, setProvider]}>
      <contractContext.Provider value={[contract, setContract]}>
        <Navbar />
        <PCPart />
        <AdminPage />
      </contractContext.Provider>
    </providerContext.Provider>
  )
}

export default App
 