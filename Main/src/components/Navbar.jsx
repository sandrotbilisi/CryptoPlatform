import React from 'react'
import { useState } from 'react'

import { ethers }  from "ethers";


export default function Navbar() {

  const [ walletAddress, setWalletAddress] = useState("")
  const [ provider, setProvider ] = useState(null)
  const [ signer, setSigner ] = useState(null)
  const [ btnText, setBtnText ] = useState("Connect Wallet")
  const [ contract, setContract] = useState(null)

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
        setBtnText("Wallet Connected")
        console.log(`%cAccounts: ${accounts}`, 'color: purple; font-weight:bold;')
      }catch(err) { console.log(err) }
    }else{
      console.log("%cMetamask Not Found ❌", 'color: red; font-weight:bold;')
    }
  }

  async function connectWallet() {
    if(typeof window.ethereum != 'undefined'){
      await requestAccount()
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider)
      const temp_signer = (await provider.getSigner(0))
      setSigner(signer)
      const temp_contract = await new ethers.Contract(contractAddress, contractABI, temp_signer);
      setContract(temp_contract)
      await temp_contract.getBalance()
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
      {/* <button onClick={requestAccount}>Request Account</button> */}
      <button onClick={connectWallet}>{btnText}</button>
    </li>
  </nav>
  )
}
