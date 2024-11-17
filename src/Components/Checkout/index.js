import React, { useState } from 'react';
import { getLatestRFIDTag } from '../../services/checkoutService';

const CheckoutComponent = () => {
  const [checkoutData, setCheckoutData] = useState(null); // Stores RFID response data
  const [errorMessage, setErrorMessage] = useState(null); // Stores error messages
  const [totalAmount, setTotalAmount] = useState(0); // Total cart amount

  const handleRFIDCheck = async () => {
    try {
      const data = await getLatestRFIDTag();
      if (data.success) {
        setCheckoutData(data);
        setErrorMessage(null);

        // Calculate total amount
        const total = data.data.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
        setTotalAmount(total);
      } else {
        setErrorMessage(data.message || 'RFID not found.');
        setCheckoutData(null);
        setTotalAmount(0);
      }
    } catch (error) {
      setErrorMessage('Failed to fetch RFID data. Please try again.');
      setCheckoutData(null);
      setTotalAmount(0);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Your Cart</h2>

      {/* Scan RFID Section */}
      <div className="rfid-scan-section">
        <button onClick={handleRFIDCheck}>Scan RFID</button>
      </div>

      {/* Display Items in Cart */}
      {checkoutData && checkoutData.success && (
        <div className="cart-items">
          {checkoutData.data.map((item, index) => (
            <div className="cart-item-card" key={index}>
              <img
                src={item.ImageURL}
                alt={`${item.Name} in ${item.ColorName}`}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h4>{item.Name}</h4>
                <p>Size: {item.SizeLabel}</p>
                <p>Color: {item.ColorName}</p>
                <p>Quantity: {item.Quantity}</p>
              </div>
              <div className="cart-item-price">
                <p>${item.Price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Cart Footer */}
      {checkoutData && checkoutData.success && (
        <div className="cart-footer">
          <div className="cart-total">
            <h4>Total Amount: ${totalAmount}</h4>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutComponent;
