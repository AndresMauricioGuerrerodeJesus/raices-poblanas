import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Intentamos cargar el carrito guardado en el navegador (Local Storage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cada que el carrito cambie, lo guardamos para que no se borre al refrescar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.productId === product.productId);
      if (existing) {
        return prevCart.map(item =>
          item.productId === product.productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.productId !== id));

  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);