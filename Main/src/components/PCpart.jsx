import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PCPartsMarketplace from './contracts/PCPartsMarketplace.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize provider
    const initializeProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
		// await window.ethereum.request({
		// 	method: "eth_requestAccounts"
		// })
        // await provider.send('eth_requestAccounts', []);
        setProvider(provider);
      } else {
        setError('Please install MetaMask to use this application');
      }
    };
    initializeProvider();
  }, []);

  useEffect(() => {
    // Initialize contract
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

  useEffect(() => {
    // Load parts
    const loadParts = async () => {
      if (contract) {
        const partsCount = await contract.partsCount();
        const parts = [];
        for (let i = 1; i <= partsCount; i++) {
          const part = await contract.parts(i);
          parts.push({
            id: part.id.toString(),
            name: part.name,
            price: ethers.formatEther(part.price),
            quantity: part.quantity.toString(),
            seller: part.seller
          });
        }
        setParts(parts);
      }
    };
    loadParts();
  }, [contract]);

  const handlePartSelect = (part) => {
    setSelectedPart(part);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const tx = await contract.purchasePart(selectedPart.id, quantity, { value: ethers.parseEther(String(selectedPart.price * quantity)) });
      await tx.wait();
      setSelectedPart(null);
      setQuantity(1);
    } catch (error) {
      console.error(error);
      setError('An error occurred while purchasing the part. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>PC Parts Marketplace</h1>
      {error && <p>{error}</p>}
      {!provider && !error && <p>Initializing provider...</p>}
      {provider && !contract && <p>Initializing contract...</p>}
      {contract && (
        <>
          {selectedPart ? (
            <>
              <h2>{selectedPart.name}</h2>
              <p>Price: {selectedPart.price} ETH</p>
              <p>Quantity available: {selectedPart.quantity}</p>
              <label>
                Quantity:
                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
              </label>
              <button onClick={handlePurchase} disabled={loading}>
                {loading ? 'Purchasing...' : 'Purchase'}
              </button>
            </>
          ) : ( 
			<>
<h2>Parts Available</h2>
<ul>
{parts.map((part) => (
<li key={part.id} onClick={() => handlePartSelect(part)}>
<strong>{part.name}</strong> ({part.price} ETH)
</li>
))}
</ul>
</>
)}
</>
)}
</div>
);
}

export default App;

