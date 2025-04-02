import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

declare global {
  interface Window {
    bootstrap: any;
  }
}

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // 🧠 Show toast only once when cart is not empty
  useEffect(() => {
    if (cart.length > 0) {
      const toastEl = document.getElementById('cartToast');
      if (toastEl) {
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
      }
    }
  }, [cart]); // Trigger only when cart changes

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item.bookID}>
                  {item.title}: ${item.price.toFixed(2)}
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button>Checkout</button>
          </>
        )}
        <button onClick={() => navigate('/projects')}>Continue Browsing</button>
      </div>

      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 11 }}
      >
        <div
          className="toast align-items-center text-bg-success border-0"
          id="cartToast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Book added to cart!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
