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

// Dentro de Cart.jsx
const handleCheckout = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert("Debes iniciar sesión para finalizar tu compra.");
    navigate('/login');
    return;
  }

  const orderData = {
    userId: user.userId,
    items: cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })),
    total: getCartTotal()
  };

  try {
    const response = await fetch('http://localhost:8080/api/orders/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });

    if (response.ok) {
      alert("¡Gracias por tu compra! Tu pedido de artesanías está en camino.");
      clearCart(); // Limpiamos el carrito local
      navigate('/tienda'); // Regresamos a la tienda
    } else {
      alert("Hubo un problema al procesar tu pedido.");
    }
  } catch (error) {
    console.error("Error en el checkout:", error);
  }
};

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