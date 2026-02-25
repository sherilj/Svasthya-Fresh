import React, { useState } from "react";
import { Search, Star } from "lucide-react";

export const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Wild Forest Honey",
    category: "Honey",
    price: 450,
    rating: 4.8,
    img: "/wild_honey.png",
    desc: "Pure, raw honey collected from the deep forests. Unprocessed and unpasteurized to retain natural enzymes.",
    badgeLeft: "20% OFF",
    badgeRight: "BEST SELLER",
  },
  {
    id: 2,
    name: "Tulsi Honey",
    category: "Honey",
    price: 320,
    rating: 4.6,
    img: "/tulsi_honey.png",
    desc: "Infused with the natural goodness of Tulsi leaves. Enhances immunity and effectively relieves coughs & colds.",
  },
  {
    id: 3,
    name: "Multi-Flora Honey",
    category: "Honey",
    price: 280,
    rating: 4.5,
    img: "/multi_flora_honey.png",
    desc: "A rich and natural blend of nectar collected from multiple flowers. Perfect for your daily sweetening needs.",
  },
  {
    id: 4,
    name: "Kashmir Acacia Honey",
    category: "Honey",
    price: 550,
    rating: 4.9,
    img: "/wild_honey.png",
    desc: "Light, mild, and crystallized acacia honey sourced from the pristine valleys of Kashmir.",
    badgeRight: "PREMIUM",
  },
  {
    id: 5,
    name: "Peanut Chikki Bar",
    category: "Chikki",
    price: 150,
    rating: 4.9,
    img: "/chikki_pic.png",
    desc: "Crunchy roasted peanuts blended with organic jaggery. A perfect energy boosting traditional snack.",
    badgeLeft: "15% OFF",
  },
  {
    id: 6,
    name: "Mixed Dry Fruit Chikki",
    category: "Chikki",
    price: 350,
    rating: 4.9,
    img: "/chikki_pic.png",
    desc: "A royal blend of cashews, almonds, and pistachios in jaggery. Perfect premium gifting choice.",
    badgeRight: "BEST SELLER",
  },
  {
    id: 7,
    name: "Sesame Jaggery Chikki",
    category: "Chikki",
    price: 120,
    rating: 4.7,
    img: "/chikki_pic.png",
    desc: "Iron-rich sesame seeds bound by pure jaggery. A traditional winter favorite for warmth and health.",
  },
  {
    id: 8,
    name: "Crushed Peanut Chikki",
    category: "Chikki",
    price: 140,
    rating: 4.8,
    img: "/chikki_pic.png",
    desc: "Finely crushed roasted peanuts with thin jaggery layers for an effortless melting crunch.",
  },
  {
    id: 9,
    name: "A2 Desi Cow Ghee",
    category: "Ghee",
    price: 1200,
    rating: 4.8,
    img: "/ghee_pic.png",
    desc: "Traditionally bilona churned ghee made from A2 milk of indigenous cows. Golden, granular, and pure.",
    badgeLeft: "10% OFF",
    badgeRight: "PREMIUM",
  },
  {
    id: 10,
    name: "Pure Buffalo Ghee",
    category: "Ghee",
    price: 800,
    rating: 4.7,
    img: "/ghee_pic.png",
    desc: "Rich, aromatic, and creamy buffalo milk ghee. Ideal for deep frying and traditional Indian sweets.",
  },
  {
    id: 11,
    name: "Gir Cow Cultured Ghee",
    category: "Ghee",
    price: 1500,
    rating: 4.9,
    img: "/ghee_pic.png",
    desc: "Made from authentic Gir cow milk curd. Rich in nutrition with an unmistakable traditional aroma.",
    badgeRight: "BEST SELLER",
  },
  {
    id: 12,
    name: "Farm Fresh Cow Ghee",
    category: "Ghee",
    price: 900,
    rating: 4.8,
    img: "/ghee_pic.png",
    desc: "Wholesome everyday ghee sourced directly from local ethical dairy farmers without preservatives.",
  },
];

const ProductsPage = ({ activeCategory, setActiveCategory, onViewProduct, searchQuery, setSearchQuery }) => {

  const categories = ["All", "Honey", "Chikki", "Ghee"];

  const groupedProducts = categories.filter(c => c !== "All").reduce((acc, cat) => {
    const products = ALL_PRODUCTS.filter(p => p.category === cat && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (products.length > 0) acc[cat] = products;
    return acc;
  }, {});

  const renderProductGrid = (products) => (
    <div className="products-page-grid">
      {products.map((product) => (
        <div className="p-card-vertical" key={product.id}>
          <div className="p-card-image">
            <img src={product.img} alt={product.name} />
            {product.badgeLeft && (
              <span className="p-badge left-badge">{product.badgeLeft}</span>
            )}
            {product.badgeRight && (
              <span
                className={`p-badge right-badge ${product.badgeRight === "PREMIUM" ? "premium" : ""}`}
              >
                {product.badgeRight}
              </span>
            )}
          </div>
          <div className="p-card-info">
            <div className="p-card-meta">
              <span className="p-cat">{product.category.toUpperCase()}</span>
              <span className="p-rating">
                <Star size={12} fill="#FFC107" color="#FFC107" />{" "}
                {product.rating}
              </span>
            </div>
            <h3 className="p-title">{product.name}</h3>
            <p className="p-desc">{product.desc}</p>
            <div className="p-card-footer">
              <div className="p-price-block">
                <span className="p-price-label">Price</span>
                <span className="p-price">₹{product.price}</span>
              </div>
              <div className="p-card-buttons">
                <button className="p-view-btn" onClick={() => onViewProduct(product)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="products-page">
      {/* Header Area */}
      <div className="products-page-header">
        <h1 className="products-page-title">Our Products</h1>
        <div className="title-divider">
          <span className="diamond"></span>
        </div>
        <p className="products-page-subtitle">
          Browse our collection of premium, naturally sourced products.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="products-filter-bar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Products */}
      <div className="products-sections-wrapper">
        {activeCategory === "All" ? (
          Object.entries(groupedProducts).map(([cat, products]) => (
            <div key={cat} className="category-section">
              <h2 className="category-section-title">{cat} Collection</h2>
              {renderProductGrid(products)}
            </div>
          ))
        ) : (
          <div className="category-section">
            <h2 className="category-section-title">{activeCategory} Selection</h2>
            {renderProductGrid(ALL_PRODUCTS.filter(p => p.category === activeCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase())))}
          </div>
        )}
      </div>

      {/* Coming Soon Section */}
      <section className="coming-soon-section text-center">
        <h2 className="section-title-white" style={{ fontFamily: '"Playfair Display", "Merriweather", serif', fontSize: '3.2rem', letterSpacing: '1px', marginBottom: '10px' }}>Coming Soon</h2>
        <div className="title-divider-white" style={{ marginBottom: '15px' }}>
          <span className="diamond-white"></span>
        </div>
        <p className="coming-soon-subtitle-new">Exciting New Products Launching Soon</p>

        <div className="coming-soon-grid-new">
          <div className="coming-card-new">
            <img src="/4a.jpg" alt="Healthy Bowls" className="coming-img-new" />
            <div className="coming-card-content">
              <h3 className="coming-title-new">Healthy Bowls</h3>
              <div className="card-divider-new"></div>
              <p className="coming-desc-new">Pure &amp; Unprocessed</p>
            </div>
            <button className="btn-product coming-btn" style={{ backgroundColor: '#2e6b27' }}>View Product &gt;</button>
          </div>
          <div className="coming-card-new">
            <img src="/4b.jpg" alt="Cold Pressed Juice" className="coming-img-new" />
            <div className="coming-card-content">
              <h3 className="coming-title-new">Cold Pressed Juice</h3>
              <div className="card-divider-new"></div>
              <p className="coming-desc-new">Crunchy &amp; Nutritious</p>
            </div>
            <button className="btn-product coming-btn" style={{ backgroundColor: '#b5580a' }}>View Product &gt;</button>
          </div>
        </div>
      </section>

      {/* Heritage Banner */}
      <section className="heritage-banner-section">
        <h2 className="heritage-banner-text">"Purity is not just a claim, it's our heritage."</h2>
      </section>
    </div>
  );
};

export default ProductsPage;
