import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import ProgressStepper from "./ProgressStepper";

const FALLBACK_ITEMS = [
  {
    id: "honey",
    name: "Wild Forest Honey",
    category: "Honey",
    price: 450,
    quantity: 1,
    img: "/wild_honey.png",
  },
  {
    id: "chikki",
    name: "Peanut Chikki Bar",
    category: "Chikki",
    price: 300,
    quantity: 1,
    img: "/chikki_pic.png",
  },
];

const formatCurrency = (value) => `₹${value.toLocaleString("en-IN")}`;

const defaultDetails = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  altPhone: "",
};

const Checkout = ({
  cart = [],
  onBackToCart = () => { },
  onContinue = () => { },
  details = defaultDetails,
  onDetailsChange = () => { },
}) => {
  const items = cart.length ? cart : FALLBACK_ITEMS;
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shippingLabel = "Free";
  const total = subtotal;

  const handleSubmit = (event) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <ProgressStepper
          currentStep={1}
          backLabel="← BACK TO CART"
          onBack={onBackToCart}
          showBackLink
        />

        <div className="checkout-grid">
          <div className="checkout-card">
            <div>
              <h2>Contact Information</h2>
              <p>Stay in the loop with order status and delivery updates.</p>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={details.email}
                  onChange={(e) => onDetailsChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="checkout-subtitle">Shipping Address</p>
                <div className="form-row">
                  <div className="checkout-input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={details.firstName}
                      onChange={(e) => onDetailsChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={details.lastName}
                      onChange={(e) => onDetailsChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="checkout-input-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="123 Green Street, Apt 4B"
                    value={details.address}
                    onChange={(e) => onDetailsChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="checkout-input-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Mumbai"
                      value={details.city}
                      onChange={(e) => onDetailsChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      type="text"
                      placeholder="Maharashtra"
                      value={details.state}
                      onChange={(e) => onDetailsChange("state", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row thirds">
                  <div className="checkout-input-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      id="pincode"
                      type="text"
                      placeholder="400001"
                      value={details.pincode}
                      onChange={(e) => onDetailsChange("pincode", e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={details.phone}
                      onChange={(e) => onDetailsChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label htmlFor="altPhone">Alternate Phone</label>
                    <input
                      id="altPhone"
                      type="tel"
                      placeholder="Optional"
                      value={details.altPhone}
                      onChange={(e) => onDetailsChange("altPhone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <label className="save-info-row">
                <input type="checkbox" defaultChecked />
                Save this information for next time
              </label>

              <button className="checkout-submit" type="submit">
                CONTINUE TO DELIVERY <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <aside className="checkout-card summary-card">
            <div className="summary-header">
              <div>
                <h2>Order Summary</h2>
                <p>An overview of the items in your bag.</p>
              </div>
            </div>

            <div className="summary-items">
              {items.map((item) => {
                const quantity = item.quantity || 1;
                return (
                  <div key={item.id} className="summary-item">
                    <div className="summary-thumb">
                      <img src={item.img || "/wild_honey.png"} alt={item.name} />
                    </div>
                    <div>
                      <p className="summary-name">{item.name}</p>
                      <p className="summary-meta">
                        {(item.category || "Artisanal").toUpperCase()}
                      </p>
                    </div>
                    <div className="summary-price">
                      <strong>
                        {formatCurrency(item.price * quantity)}
                      </strong>
                      {quantity > 1 && (
                        <span className="summary-qty">Qty {quantity}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shippingLabel}</span>
            </div>
            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <div className="ssl-badge">
              <ShieldCheck size={18} /> Secure SSL Encryption
            </div>
          </aside>
        </div>

      </div>
    </section>
  );
};

export default Checkout;
