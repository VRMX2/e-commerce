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

      <section id="contact" className="contact-section">
        <div className="container text-center">
          <h2 className="section-title animate-fade-in">اتصل بنا</h2>
          <div className="title-underline"></div>
          <p className="hero-subtitle" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
            نحن هنا لخدمتكم والإجابة على استفساراتكم على مدار الساعة
          </p>
          
          <div className="contact-grid">
            {/* Phone */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <h3 className="contact-title">رقم الهاتف</h3>
              <p className="contact-value" dir="ltr">0774525109</p>
            </div>

            {/* Email */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="contact-title">البريد الإلكتروني</h3>
              <p className="contact-value">lehcengrissi@gmail.com</p>
            </div>

            {/* Address */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="contact-title">العنوان</h3>
              <p className="contact-value">براقي، الجزائر (Baraki Alger)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
