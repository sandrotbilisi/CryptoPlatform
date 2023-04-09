import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import { contractContext, providerContext, partsContext } from "../App";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  const [provider, setProvider] = useContext(providerContext);
  const [contract, setContract] = useContext(contractContext);
  const [parts, setParts] = useContext(partsContext);
  const [selectedPart, setSelectedPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
            seller: part.seller,
          });
        }
        setParts(parts);
        console.log(parts)
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
      const tx = await contract.purchasePart(selectedPart.id, quantity, {
        value: ethers.parseEther(String(selectedPart.price * quantity)),
      });
      await tx.wait();
      setSelectedPart(null);
      setQuantity(1);
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while purchasing the part. Please try again."
      );
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
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </label>
              <button onClick={handlePurchase} disabled={loading}>
                {loading ? "Purchasing..." : "Purchase"}
              </button>
            </>
          ) : (
            <>
              <h2>Parts Available</h2>
              <div style={{ display: "flex", listStyleType: "none" }}>
                {parts.map((part) => (
                  <Link to={`/parts/${part.id}`}>

                  <li key={part.id} onClick={() => handlePartSelect(part)}>
                    <div
                      style={{
                        width: 300,
                        backgroundColor: "#1c1c1c",
                        boxShadow: "1px 2px 9px #F4AAB9",
                        borderRadius: 5,
                        padding: 20,
                        margin: 10,
                        border: "1px solid #F4AAB9",
                        boxSizing: "border-box",
                        cursor: "pointer"
                      }}
                      >     
                      <img
                        src={"https://www.computerhope.com/jargon/m/motherboard-small.png"}
                        alt={part.name}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "contain",
                        }}
                        />
                      <p style={{ fontWeight: "bold", fontSize: 20 }}>
                        {part.name}
                      </p>
                      <hr style={{ marginBottom: 10 }} />
                      <p style={{ fontSize: 16 }}>{part.description}</p>
                      <p style={{ marginTop: 10 }}>
                        <strong>Price:</strong> {part.price} ETH
                      </p>
                    </div>
                  </li>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
      
    </div>
  );
}

export default App;
