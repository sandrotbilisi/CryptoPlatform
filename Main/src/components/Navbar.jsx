import React from 'react';
import { useState, useContext, createContext, useEffect } from 'react';
import { ethers } from 'ethers';
import PCPartsMarketplace from './contracts/PCPartsMarketplace.json';

import mysql from 'mysql';
import { providerContext, contractContext } from '../App';




export default function Navbar() {
  const [contract, setContract] = useContext(contractContext)
  const [provider, setProvider] = useContext(providerContext)


  useEffect(() => {
    const initializeContract = async () => {
      if (provider) {
        const contractAddress = '0xB748AcC151858492c46ca81cefb730f9D2a6cAdD';
        const signer = (await provider.getSigner(0));
        const contract = new ethers.Contract(contractAddress, PCPartsMarketplace.abi, signer);
        setContract(contract);
      }
    };
    initializeContract();
  }, [provider]);
  
  async function requestAccount() {

    // Check if Metamask is Installed

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        console.log(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider)

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
        <button onClick={() => {connectWallet()}}>{provider ? "Logout" : "Login"}</button>
      </li>
    </nav>
  );
}
