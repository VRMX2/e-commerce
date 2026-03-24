import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "700", "800"] });

export const metadata: Metadata = {
  title: "ساعات الفخامة - أرقى الساعات النسائية",
  description: "متجر إلكتروني لبيع أرقى الساعات النسائية في الجزائر والدفع عند الاستلام",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <header className="app-header">
          <div className="container header-nav">
            {/* Logo + Brand */}
            <a href="/" className="brand-link">
              <Image
                src="/assets/logo/logo.png"
                alt="ساعات الفخامة"
                width={48}
                height={48}
                className="brand-logo"
                priority
              />
              <span className="brand-title">ساعات الفخامة</span>
            </a>

            {/* Hamburger toggle for mobile */}
            <input type="checkbox" id="nav-toggle" className="nav-toggle-input" />
            <label htmlFor="nav-toggle" className="nav-hamburger" aria-label="القائمة">
              <span></span>
              <span></span>
              <span></span>
            </label>

            {/* Nav Links */}
            <nav className="nav-links">
              <a href="/" className="nav-link">الرئيسية</a>
              <a href="/#products" className="nav-link">المنتجات</a>
              <a href="/#contact" className="nav-link">اتصل بنا</a>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>

        <footer className="app-footer">
          <div className="container footer-inner">
            <div className="footer-brand">
              <Image src="/logo.png" alt="ساعات الفخامة" width={40} height={40} />
              <h2 className="footer-title">ساعات الفخامة</h2>
            </div>
            <p className="footer-desc">نقدم أفضل الساعات النسائية في الجزائر. الدفع عند الاستلام والتوصيل متوفر لكل الولايات.</p>
            <div className="footer-links">
              <a href="/" className="footer-link">الرئيسية</a>
              <span className="footer-sep">•</span>
              <a href="/#products" className="footer-link">المنتجات</a>
              <span className="footer-sep">•</span>
              <a href="/#contact" className="footer-link">اتصل بنا</a>
            </div>
            <div className="footer-copy">
              © {new Date().getFullYear()} ساعات الفخامة. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
