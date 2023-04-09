import React, { useState, useEffect, useContext, createContext } from "react";
import { contractContext, providerContext, partsContext } from "../App";
import { useParams } from "react-router-dom";
import { ethers} from 'ethers'

export default function PcPartPage(props) {
  const [provider, setProvider] = useContext(providerContext);
  const [quantity, setQuantity] = useState(1);

  const [contract, setContract] = useContext(contractContext);
  const [loading, setLoading] = useState(false);

  const { parts } = props;
  const { id } = useParams();
  console.log(parts)

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };


  // find the part with the matching id
  const part = parts.find((part) => part.id === id);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "40px",
    },
    image: {
      width: "50%",
      height: "100%",
      objectFit: "contain",
      marginBottom: "20px",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    description: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    price: {
      fontSize: "20px",

      marginBottom: "20px",
    },
    quantity: {
      fontSize: "20px",
      marginBottom: "40px",
    },
    button: {
      padding: "10px 30px",
      fontSize: "20px",
      backgroundColor: "#0077FF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const tx = await contract.purchasePart(part.id, quantity, {
        value: ethers.parseEther(String(part.price * quantity)),
      });
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <img
        src={"https://www.computerhope.com/jargon/m/motherboard-small.png"}
        alt={part.name}
        style={styles.image}
      />
      <h2 style={styles.title}>{part.name}</h2>
      <p style={styles.description}>Description: {part.description}</p>
      <p style={styles.price}>Price: {part.price} ETH</p>
      <p style={styles.quantity}>Quantity available: {part.quantity}</p>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </label>
      <button onClick={handlePurchase} style={styles.button}>
        {!loading ? "Purchase" : "Purchasing"}
      </button>
    </div>
  );
}
