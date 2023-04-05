import React, { useState } from 'react';
import { ethers } from 'ethers';
import PCPartsMarketplace from './contracts/PCPartsMarketplace.json';

const CONTRACT_ADDRESS = '0xB748AcC151858492c46ca81cefb730f9D2a6cAdD';
const provider = new ethers.BrowserProvider(window.ethereum);

function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  async function handleAddPart(event) {
    event.preventDefault();
    const signer = (await provider.getSigner(0));
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PCPartsMarketplace.abi, signer);

    try {
      await contract.addPart(name, ethers.parseEther(String(price)), quantity);
      alert(`Successfully added ${name} to the marketplace!`);
      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);
    } catch (error) {
      console.log(error);
      alert(`Failed to add part: ${error.message}`);
    }
  }

  return (
    <div>
      <h2>Add a new PC part to the marketplace:</h2>
      <form onSubmit={handleAddPart}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Price (ETH):
          <input type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
        </label>
        <br />
        <button type="submit">Add Part</button>
      </form>
    </div>
  );
}

export default AdminPage;
