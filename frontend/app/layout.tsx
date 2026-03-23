import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "700"] });

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
            <h1 className="brand-title">ساعات الفخامة</h1>
            <nav className="nav-links">
              <a href="/">الرئيسية</a>
              <a href="/#products">المنتجات</a>
              <a href="/#contact">اتصل بنا</a>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>

        <footer className="app-footer">
          <div className="container">
            <h2 className="footer-title">ساعات الفخامة</h2>
            <p className="footer-desc">نقدم لكم أفضل الساعات النسائية في الجزائر. الدفع عند الاستلام والتوصيل متوفر لكل الولايات.</p>
            <div className="footer-copy">
              © {new Date().getFullYear()} ساعات الفخامة. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
