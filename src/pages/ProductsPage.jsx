import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductsPage.module.css';
import { FiSearch, FiFilter, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductContext.jsx'; // Use global products
import Chatbot from '../components/Chatbot.jsx';

const ProductsPage = () => {
  const { addToCart } = useCart();
  const { products: allProducts } = useProducts(); // Get products from context
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDelivery, setActiveDelivery] = useState('All Options');
  const [sortBy, setSortBy] = useState('Newest First');
  const [addedItem, setAddedItem] = useState(null); // For the notification

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product);
  };

  useEffect(() => {
    if (addedItem) {
      const timer = setTimeout(() => setAddedItem(null), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [addedItem]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts;
    if (searchTerm) products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (activeCategory !== 'All') products = products.filter(p => p.category === activeCategory);
    if (sortBy === 'Price: Low to High') products.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') products.sort((a, b) => b.price - a.price);
    return products;
  }, [searchTerm, activeCategory, sortBy, allProducts]);

  return (
    <div className={styles.pageContainer}>
      {addedItem && <AddToCartNotification item={addedItem} />}
      <div className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.searchBar}><FiSearch /><input type="text" placeholder="Search fresh produce..." onChange={e => setSearchTerm(e.target.value)} /></div>
          <div className={styles.filterSort}><FiFilter className={styles.filterIcon} /><select className={styles.sortDropdown} onChange={e => setSortBy(e.target.value)}><option>Newest First</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
        </div>
        <div className={styles.filters}>
          <div className={styles.categoryFilters}>
            {['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Herbs & Spices', 'Other'].map(cat => (
              <button key={cat} className={activeCategory === cat ? styles.active : ''} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>
        <div className={styles.productGrid}>
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <div key={product.id} className={styles.productCard}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <h3>{product.name}</h3>
                <p className={styles.productPrice}>₹{product.price.toFixed(2)}</p>
                <button className={styles.addToCartBtn} onClick={() => handleAddToCart(product)}><FiShoppingCart /> Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

// Notification component defined in the same file
const AddToCartNotification = ({ item }) => {
    return (
        <div className={styles.notification}>
            <FiCheckCircle className={styles.notificationIcon} />
            <img src={item.image} alt={item.name} className={styles.notificationImg} />
            <div className={styles.notificationText}>
                <strong>Added to Cart</strong>
                <p>{item.name}</p>
            </div>
            <Link to="/cart" className={styles.notificationBtn}>View Cart</Link>
        </div>
    );
};

export default ProductsPage;
