import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.price > 5000 && <div className="card-badge">✨ حصري</div>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description || 'ساعة فاخرة ومميزة تناسب جميع الأذواق والمناسبات.'}</p>
        <div className="card-footer">
          <p className="card-price">{product.price.toLocaleString("ar-DZ")} د.ج</p>
        </div>
        <Link href={`/checkout/${product.id}`} style={{ marginTop: '1rem' }}>
          <button className="btn-primary">اطلب الآن</button>
        </Link>
      </div>
    </div>
  );
}
