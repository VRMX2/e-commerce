"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار",
  "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر",
  "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة",
  "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض",
  "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تسمسيلت", "الوادي", "خنشلة",
  "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان",
  "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "إن صالح", "إن قزام", "تقرت",
  "جانت", "المغير", "المنيعة"
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    wilaya: "",
    commune: "",
    quantity: 1,
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          phone: formData.phone,
          wilaya: formData.wilaya,
          commune: formData.commune,
          product_id: product.id,
          product_name: product.name,
          price: product.price * formData.quantity,
          quantity: formData.quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errMsg = data.errors ? data.errors.join('\n') : (data.message || 'حدث خطأ أثناء إرسال الطلب');
        throw new Error(errMsg);
      }

      setSuccessMsg(data.message || 'تم تأكيد طلبك، سنتصل بك قريباً');
      setFormData({ name: '', phone: '', wilaya: '', commune: '', quantity: 1 });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner" style={{ borderColor: 'var(--primary-gold)' }}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center" style={{ padding: '5rem 0', fontSize: '1.25rem', fontWeight: 700 }}>
        المنتج غير موجود
      </div>
    );
  }

  if (successMsg) {
    return (
      <div className="success-container">
        <div className="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="success-title">{successMsg}</h2>
        <p className="success-desc">شكراً لاختيارك ساعات الفخامة. لقد تم تسجيل طلبك وسيقوم فريقنا بالتواصل معك لتأكيد الشحن.</p>
        <button onClick={() => router.push("/")} className="link-back" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <h1 className="checkout-title">إتمام الطلب</h1>
      
      <div className="checkout-layout">
        
        {/* Product Details */}
        <div className="order-summary" style={{ order: 1 }}>
          <h2 className="summary-header">ملخص الطلب</h2>
          
          <div className="summary-product">
            <div className="summary-image">
              <Image src={product.image_url} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="80px" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.name}</h3>
              <p style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>{product.price} د.ج</p>
            </div>
          </div>
          
          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>سعر الوحدة</span>
            <span style={{ fontWeight: 700 }}>{product.price} د.ج</span>
          </div>
          
          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>التوصيل</span>
            <span className="badge-cod">الدفع عند الاستلام</span>
          </div>
          
          <div className="summary-total">
            <span>المجموع الإجمالي</span>
            <span className="summary-total-price">{(product.price * formData.quantity).toLocaleString('ar-DZ')} د.ج</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{ order: 2 }}>
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="alert-error animate-fade-in">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {errorMsg}
                </div>
              )}
            
            <div className="form-group">
              <label className="form-label">الاسم الكامل *</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="الاسم واللقب"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">رقم الهاتف *</label>
              <input
                required
                type="tel"
                dir="ltr"
                className="form-control"
                style={{ textAlign: 'right', fontFamily: 'monospace' }}
                placeholder="05xx xx xx xx"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">الولاية *</label>
                <select
                  required
                  className="form-control"
                  value={formData.wilaya}
                  onChange={e => setFormData({...formData, wilaya: e.target.value})}
                >
                  <option value="">اختر الولاية</option>
                  {WILAYAS.map((w, i) => (
                    <option key={i} value={`${i+1} - ${w}`}>{i+1} - {w}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">البلدية *</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="بلدية الإقامة"
                  value={formData.commune}
                  onChange={e => setFormData({...formData, commune: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">الكمية</label>
              <div className="quantity-control">
                <button type="button" onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})} className="qty-btn">-</button>
                <span className="qty-value">{formData.quantity}</span>
                <button type="button" onClick={() => setFormData({...formData, quantity: Math.min(10, formData.quantity + 1)})} className="qty-btn">+</button>
              </div>
            </div>

            <div style={{ paddingTop: '1rem' }}>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ height: '3.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                {submitting ? (
                  <div className="spinner"></div>
                ) : 'تأكيد الطلب'}
              </button>
              <p className="icon-shield">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                معلوماتك محمية ولن يتم مشاركتها أبداً
              </p>
            </div>
          </form>
          </div>
        </div>

      </div>
    </div>
  );
}
