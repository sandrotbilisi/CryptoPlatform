import React, { useState, useEffect, useContext } from "react";
import { ethers } from 'ethers';
import { contractContext, providerContext } from "../App";

const CONTRACT_ADDRESS = '0xB748AcC151858492c46ca81cefb730f9D2a6cAdD';
const provider = new ethers.BrowserProvider(window.ethereum);

function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [contract, setContract] = useContext(contractContext);

  async function handleAddPart(event) {
    event.preventDefault();
    try {
      await contract.addPart(name, ethers.parseEther(String(price)), quantity);
      alert(`Successfully added ${name} to the marketplace!`);
      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);
    } catch (error) {
      // console.log(error);
      // alert(`Failed to add part: ${error.message}`);
      alert("Please Log in First")
    }
  }

  const InputClass = {
    border: "none",
    padding: 10,
    width: 300,
    height: 50,
    marginTop: 10
  }

  return (
    <div>
      <h2>Add a new PC part to the marketplace:</h2> <br />
      <form onSubmit={handleAddPart}>
        <label>
          Name <br />
          <input placeholder="Name" type="text" style={InputClass} value={name} onChange={(event) => setName(event.target.value)} /> <br />
        </label>
        <br />
        <label>
          Description <br />
          <input placeholder="Description" style={InputClass} value={description} onChange={(event) => setDescription(event.target.value)} /> <br />
        </label>
        <br />
        <label>
          Price (ETH) <br />
          <input placeholder="Price" style={InputClass} type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} /> <br />
        </label>
        <br />
        <label>
          Quantity <br />
          <input placeholder="Quantity" style={InputClass} type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} /> <br />
        </label>
        <br /> <br />
        <button type="submit">Add Part</button>
      </form>
    </div>
  );
}

export default AdminPage;
