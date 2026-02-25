import React, { useState } from "react";
import "./styles.css";
import "./products.css";
import "./cart.css";
import "./checkout.css";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import LandingPage from "./components/LandingPage";
import ProductsPage from "./components/ProductsPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import OurStory from "./components/OurStory";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import Delivery from "./components/Delivery";
import Payment from "./components/Payment";
import OrderConfirmation from "./components/OrderConfirmation";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [currentPage, setCurrentPage] = useState("auth"); // 'auth', 'landing', 'products', 'details', 'cartPage', 'ourStory', 'contact', 'checkout', 'delivery', 'payment', 'orderConfirmation'
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    altPhone: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [lastOrderId, setLastOrderId] = useState("#SV-431423");

  const handleNavigateToProducts = (category = "All") => {
    console.log('Navigating to products with category:', category);
    setActiveCategory(category);
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage("details");
    window.scrollTo(0, 0);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleDetailsChange = (field, value) => {
    setCheckoutDetails(prev => ({ ...prev, [field]: value }));
  };

  const goToCheckout = () => {
    setCurrentPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToDelivery = () => {
    setCurrentPage("delivery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeliveryContinue = (method) => {
    setDeliveryMethod(method);
    console.log("Proceeding to payment with", method);
    setCurrentPage("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    console.log('Scrolling to section:', sectionId, 'Current page:', currentPage);
    if (currentPage !== "landing") {
      setCurrentPage("landing");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="app-container"
    >
      <header className="header">
        <div className="header-inner">
          <a
            href="#"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("landing");
              window.scrollTo(0, 0);
            }}
          >
            <img src="/logo.png" alt="Svasthya Fresh Logo" />
          </a>

          <nav className="nav-menu">
            <a
              href="#"
              className={`nav-link ${currentPage === "landing" ? "active" : ""}`}
              aria-current={currentPage === "landing" ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                console.log("Home button clicked");
                setCurrentPage("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>

            <div className="nav-dropdown">
              <a
                href="#"
                className={`nav-link ${["products", "details"].includes(currentPage) ? "active" : ""}`}
                aria-current={[
                  "products",
                  "details",
                ].includes(currentPage) ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("products");
                  setActiveCategory("All");
                }}
              >
                Products <ChevronDown size={14} />
              </a>
              <div className="dropdown-content">
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateToProducts("All"); }}>All Products</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateToProducts("Honey"); }}>Honey</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateToProducts("Chikki"); }}>Chikki</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateToProducts("Ghee"); }}>Ghee</a>
              </div>
            </div>

            <a
              href="#"
              className={`nav-link ${currentPage === "ourStory" ? "active" : ""}`}
              aria-current={currentPage === "ourStory" ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("ourStory");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Our Story
            </a>



            <a
              href="#"
              className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
              aria-current={currentPage === "contact" ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Contact
            </a>
          </nav>

          <div className="header-actions">
            <button className="icon-btn">
              <Search size={22} color="#4A4A4A" />
            </button>
            <button className="icon-btn cart-btn" onClick={() => { setCurrentPage("cartPage"); window.scrollTo(0, 0); }}>
              <ShoppingCart size={22} color="#4A4A4A" />
              <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            </button>
            <button className="icon-btn">
              <User size={22} color="#4A4A4A" />
            </button>
          </div>
        </div>
      </header>


      <main
        className={`main-content ${["checkout", "delivery", "payment"].includes(currentPage) ? "checkout-mode" : ""} ${currentPage === "orderConfirmation" ? "order-conf-mode" : ""} ${["cartPage", "details", "orderConfirmation"].includes(currentPage) ? "cart-details-mode" : ""} ${currentPage === "products" ? "products-mode" : ""} ${currentPage === "contact" ? "contact-mode" : ""}`}
      >
        {currentPage === "landing" && (
          <LandingPage onNavigateToProducts={handleNavigateToProducts} />
        )}
        {currentPage === "products" && (
          <ProductsPage
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onViewProduct={handleViewProduct}
          />
        )}
        {currentPage === "details" && selectedProduct && (
          <ProductDetails
            key={selectedProduct.id}
            product={selectedProduct}
            onViewProduct={handleViewProduct}
            onBack={() => setCurrentPage("products")}
            onAddToCart={addToCart}
            onGoToCart={() => { setCurrentPage("cartPage"); window.scrollTo(0, 0); }}
          />
        )}
        {currentPage === "cartPage" && (
          <CartPage
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onContinueShopping={() => { setCurrentPage("products"); setActiveCategory("All"); window.scrollTo(0, 0); }}
            onProceedToCheckout={goToCheckout}
          />
        )}
        {currentPage === "ourStory" && <OurStory />}
        {currentPage === "contact" && <Contact />}
        {currentPage === "checkout" && (
          <Checkout
            cart={cart}
            details={checkoutDetails}
            onDetailsChange={handleDetailsChange}
            onBackToCart={() => {
              setCurrentPage("cartPage");
              window.scrollTo(0, 0);
            }}
            onContinue={goToDelivery}
          />
        )}
        {currentPage === "delivery" && (
          <Delivery
            cart={cart}
            details={checkoutDetails}
            selectedMethod={deliveryMethod}
            onSelectMethod={setDeliveryMethod}
            onBack={() => {
              setCurrentPage("checkout");
              window.scrollTo(0, 0);
            }}
            onContinue={handleDeliveryContinue}
          />
        )}
        {currentPage === "payment" && (
          <Payment
            cart={cart}
            details={checkoutDetails}
            selectedMethod={deliveryMethod}
            onBack={() => {
              setCurrentPage("delivery");
              window.scrollTo(0, 0);
            }}
            onPlaceOrder={() => {
              const newOrderId = `#SV-${Math.floor(100000 + Math.random() * 900000)}`;
              console.log("Order placed! ID:", newOrderId);
              setLastOrderId(newOrderId);
              setCart([]);
              setCurrentPage("orderConfirmation");
              window.scrollTo(0, 0);
            }}
          />
        )}
        {currentPage === "orderConfirmation" && (
          <OrderConfirmation
            orderId={lastOrderId}
            onContinueShopping={() => {
              setCurrentPage("products");
              setActiveCategory("All");
              window.scrollTo(0, 0);
            }}
            onReturnHome={() => {
              setCurrentPage("landing");
              window.scrollTo(0, 0);
            }}
          />
        )}
        {currentPage === "auth" && (
          <div className="auth-fullscreen">
            <div className="auth-container">
              <div className="auth-card">
                <div className="card-left">
                  <img src="/vegetables.png" alt="Nature" className="hero-img" />
                </div>
                <div className="card-right">
                  <div className="form-wrapper">
                    <h1 className="auth-title">
                      {isSignIn ? "Sign In" : "Create Account"}
                    </h1>
                    <p className="auth-subtitle">
                      {isSignIn ? "Don't have an account? " : "Already have an account? "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsSignIn(!isSignIn);
                        }}
                      >
                        {isSignIn ? "Sign up" : "Sign in"}
                      </a>
                    </p>

                    <form
                      className="auth-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setCurrentPage("landing");
                      }}
                    >
                      {!isSignIn && (
                        <div className="auth-input-group">
                          <label>Full Name</label>
                          <div className="auth-input">
                            <User size={20} color="#868889" />
                            <input type="text" placeholder="Your Name" />
                          </div>
                        </div>
                      )}

                      <div className="auth-input-group">
                        <label>Email Address</label>
                        <div className="auth-input">
                          <Mail size={20} color="#868889" />
                          <input type="email" placeholder="you@example.com" />
                        </div>
                      </div>

                      <div className="auth-input-group">
                        <label>Password</label>
                        <div className="auth-input">
                          <Lock size={20} color="#868889" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="auth-toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={20} color="#868889" />
                            ) : (
                              <Eye size={20} color="#868889" />
                            )}
                          </button>
                        </div>
                      </div>

                      {!isSignIn && (
                        <div className="auth-input-group">
                          <label>Confirm Password</label>
                          <div className="auth-input">
                            <Lock size={20} color="#868889" />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      )}

                      <button type="submit" className="auth-submit">
                        {isSignIn ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                      </button>

                      <div className="auth-divider">
                        <span>Or join with</span>
                      </div>

                      <div className="auth-social">
                        <button type="button" className="auth-social-btn google">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google"
                          />
                          Google
                        </button>
                        <button type="button" className="auth-social-btn facebook">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                            alt="Facebook"
                          />
                          Facebook
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer id="contact" className="footer">
        <div className="footer-bg-wrapper">
          <img
            src="/footer_market.png"
            alt="Market Illustration"
            className="footer-illustration"
          />
        </div>
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-title">Svasthya Fresh</h2>
            <p className="footer-text">
              Bringing nature's finest to your doorstep. We believe in purity,
              authenticity, and health.
            </p>
            <div className="social-links">
              <span className="social-bubble">IG</span>
              <span className="social-bubble">WA</span>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("landing"); window.scrollTo(0, 0); }}>Home</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("products"); setActiveCategory("All"); }}>Shop</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("ourStory"); window.scrollTo(0, 0); }}>Our Story</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("contact"); window.scrollTo(0, 0); }}>Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Shipping Policy</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="separator">|</span>
          <p>&copy; 2026 Svasthya Fresh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
