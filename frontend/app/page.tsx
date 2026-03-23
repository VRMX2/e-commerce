"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">أناقة لا مثيل لها</h2>
          <p className="hero-subtitle">
            اكتشفي تشكيلتنا الجديدة من الساعات الفاخرة. الجودة، الدقة، والجمال في مكان واحد. الدفع عند الاستلام لجميع ولايات الجزائر.
          </p>
          <a href="#products" className="hero-button">تصفح التشكيلة</a>
        </div>
      </section>

      <section id="products" className="container text-center" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 className="section-title">أحدث المنتجات</h2>
        <div className="title-underline"></div>
        
        {loading ? (
          <div style={{ padding: '4rem 0' }}>
            <div className="spinner" style={{ borderColor: 'var(--primary-gold)' }}></div>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
