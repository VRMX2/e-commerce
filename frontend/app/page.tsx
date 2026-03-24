"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both { success, data: [...] } and plain array responses
        const list = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
        setProducts(list);
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
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-badge">تشكيلة 2026 الجديدة</div>
          <h2 className="hero-title">أناقة <span>لا مثيل لها</span></h2>
          <p className="hero-subtitle">
            اكتشفي تشكيلتنا الحصرية من الساعات الفاخرة. الجودة، الدقة، والجمال في مكان واحد. الدفع عند الاستلام لجميع ولايات الجزائر.
          </p>
          <a href="#products" className="hero-button">تصفح التشكيلة الفاخرة</a>
        </div>
      </section>

      <section id="products" className="container text-center" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <h2 className="section-title animate-fade-in">أحدث المنتجات</h2>
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
