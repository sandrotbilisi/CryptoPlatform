import React from 'react'
import { useState } from 'react'



export default function Navbar() {

  const [ walletAddress, setWalletAddress] = useState("")

  async function requestAccount() {
    console.log('requesting Account ...')

    // Check if Metamask is Installed

    if(window.ethereum)
    {
      console.log("%cMetamask Found ✅", 'color: lightgreen; font-weight:bold;')
      
      console.log("%cConnecting To Wallet ...", 'color: gray; font-weight:bold;')
      try{
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        console.log("%cSuccessfully Connected to Wallet ✅", 'color: lightgreen; font-weight:bold;')
        setWalletAddress(accounts[0])
        console.log(`%cAccounts: ${accounts}`, 'color: purple; font-weight:bold;')
      }catch(err) { console.log(err) }
    }else{
      console.log("%cMetamask Not Found ❌", 'color: red; font-weight:bold;')
    }
  }


  return (
  <nav>
    <span className="yve">✨PcPartso✨</span>
    <div className='center'>
        <li>
          {/* <Link to={'explore'}>მაღაზია</Link> */}
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Shop</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
    </div>
    <li className='icons'>
      <button onClick={requestAccount}>Connect Wallet</button>
    </li>
  </nav>
  )
}
