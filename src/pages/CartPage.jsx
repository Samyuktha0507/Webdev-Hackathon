import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import styles from './CartPage.module.css';
import { FiShoppingCart, FiArrowLeft, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 40.00 : 0; // Example fixed delivery fee
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    alert('Thank you for your order! Your items are on their way.');
    clearCart();
    navigate('/products');
  };

  return (
    <div className={styles.page}>
      <div className={styles.cartContainer}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <FiShoppingCart className={styles.cartIcon} />
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <button className={styles.shopButton}>Start Shopping</button>
            </Link>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                  </div>
                  <p className={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
                </div>
              ))}
            </div>
            <div className={styles.orderSummary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
