import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ethers } from "ethers";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import PCPart from './components/PCpart'
import AdminPage from './components/AdminPage'
import PcPartPage from './components/PartPage'


export const providerContext = createContext()
export const contractContext = createContext()
export const partsContext = createContext()


function App() {
  const [count, setCount] = useState(0)
  const [provider, setProvider] = useState(false)
  const [contract, setContract] = useState(null)
  const [parts, setParts] = useState([])

  return (
    <providerContext.Provider value={[provider, setProvider]}>
      <contractContext.Provider value={[contract, setContract]}>
        <partsContext.Provider value={[parts,setParts]}>
          <Navbar />
          <Routes>
            <Route path='/' element={<PCPart />} />
            <Route path='/create' element={<AdminPage />} />
            <Route path='/parts/:id' element={<PcPartPage parts={parts} />} />
          </Routes>
        </partsContext.Provider>
      </contractContext.Provider>
    </providerContext.Provider>
  )
}

export default App
 