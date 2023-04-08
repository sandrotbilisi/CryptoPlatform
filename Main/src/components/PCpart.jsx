import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractContext, providerContext } from '../App'


function App() {
  const [provider, setProvider] = useContext(providerContext)
  const [contract, setContract] = useContext(contractContext);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(contract)

  useEffect(() => {
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

