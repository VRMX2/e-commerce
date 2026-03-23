import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
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
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">{product.price.toLocaleString("ar-DZ")} د.ج</p>
        <Link href={`/checkout/${product.id}`}>
          <button className="btn-primary">اطلب الآن</button>
        </Link>
      </div>
    </div>
  );
}
