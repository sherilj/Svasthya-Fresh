import React from "react";
import { ShoppingBag, Plus, Minus, X, ArrowRight, Truck, ShieldCheck } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 999;

const CartPage = ({ cart, onUpdateQuantity, onRemove, onContinueShopping, onProceedToCheckout = () => {} }) => {
  const subtotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-page-inner">
          <button className="cp-continue-link" onClick={onContinueShopping}>
            ← CONTINUE SHOPPING
          </button>
          <h1 className="cp-title">Your Cart</h1>
          <div className="cp-empty-card">
            <div className="cp-empty-icon">
              <ShoppingBag size={40} strokeWidth={1.2} />
            </div>
            <h2>Your cart feels a bit light</h2>
            <p>Fill it with nature's goodness. Our honey, ghee, and healthy snacks are waiting for you.</p>
            <button className="cp-start-btn" onClick={onContinueShopping}>
              START SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-inner">
        <button className="cp-continue-link" onClick={onContinueShopping}>
          ← CONTINUE SHOPPING
        </button>
        <h1 className="cp-title">Your Cart</h1>

        <div className="cp-layout">
          {/* Left column - items */}
          <div className="cp-left">
            {/* Free shipping banner */}
            <div className="cp-shipping-banner">
              {shippingFree ? (
                <p className="cp-ship-text cp-ship-unlocked">You've unlocked free shipping!</p>
              ) : (
                <p className="cp-ship-text">
                  Add <strong>₹{remaining}</strong> more to unlock <strong>Free Shipping</strong>
                </p>
              )}
              <div className="cp-progress-bar">
                <div className="cp-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Cart items */}
            <div className="cp-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cp-item">
                  <div className="cp-item-img">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="cp-item-details">
                    <h3 className="cp-item-name">{item.name}</h3>
                    <span className="cp-item-badge">{item.category?.toUpperCase()}</span>
                    <p className="cp-item-price">₹{item.price}</p>
                  </div>
                  <div className="cp-item-right">
                    <div className="cp-qty-row">
                      <button
                        className="cp-qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cp-qty-val">{item.quantity}</span>
                      <button
                        className="cp-qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="cp-item-total">₹{item.price * item.quantity}</p>
                    <button className="cp-remove-btn" onClick={() => onRemove(item.id)}>
                      <X size={13} /> REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - order summary */}
          <div className="cp-right">
            <div className="cp-summary-card">
              <h2 className="cp-summary-title">Order Summary</h2>
              <div className="cp-summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="cp-summary-row">
                <span>Shipping Estimate</span>
                <span className={shippingFree ? "cp-free" : ""}>
                  {shippingFree ? "Free" : "₹99"}
                </span>
              </div>
              <div className="cp-summary-row">
                <span>Tax Estimate</span>
                <span>Included</span>
              </div>
              <div className="cp-summary-divider" />
              <div className="cp-summary-total">
                <span>Order Total</span>
                <span>₹{shippingFree ? subtotal : subtotal + 99}</span>
              </div>
              <button className="cp-checkout-btn" onClick={onProceedToCheckout}>
                PROCEED TO CHECKOUT <ArrowRight size={16} />
              </button>
              <div className="cp-trust-badges">
                <span className="cp-badge"><Truck size={16} /> FAST DELIVERY</span>
                <span className="cp-badge"><ShieldCheck size={16} /> SECURE CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
