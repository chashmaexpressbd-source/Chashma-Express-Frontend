'use client';

import { IProduct } from '@/types/products.type';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCard1Props {
  product: IProduct;
  isFeatured?: boolean;
}

const ProductCard1 = ({ product, isFeatured }: ProductCard1Props) => {
  const salePrice = product.specialPrice ?? product.price;

  const hasDiscount =
    (product.discount && product.discount > 0) ||
    (product.specialPrice != null && product.specialPrice < product.price);

  const discountPercent =
    product.discount && product.discount > 0
      ? product.discount
      : product.specialPrice && product.price
        ? Math.round(
            ((product.price - product.specialPrice) / product.price) * 100,
          )
        : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        {/* IMAGE */}
        <div className="relative w-full overflow-hidden bg-white">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              width={800}
              height={800}
              className="block h-auto w-full object-contain object-center p-0 m-0"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center">
              <span className="text-xs text-gray-400">No Image</span>
            </div>
          )}

          {/* DISCOUNT */}
          {hasDiscount && discountPercent > 0 && (
            <span className="absolute right-2 top-2 rounded-full bg-[#e91e63] px-2 py-1 text-[10px] font-bold text-white">
              -{discountPercent}%
            </span>
          )}

          {/* FEATURED */}
          {isFeatured && (
            <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-3">
          <div>
            {/* CATEGORY */}
            <div className="mb-1.5 flex items-center gap-1.5">
              {product.category?.name && (
                <span className="max-w-[70%] truncate rounded-full bg-gray-100 px-2 py-1 text-[9px] font-medium text-gray-500 sm:text-[10px]">
                  {product.category.name}
                </span>
              )}

              {product.brand && (
                <span className="rounded-full bg-pink-50 px-2 py-1 text-[9px] font-semibold text-pink-500 sm:text-[10px]">
                  {product.brand}
                </span>
              )}
            </div>

            {/* NAME */}
            <h3 className="line-clamp-2 text-[12px] font-semibold leading-[1.4] text-gray-800 group-hover:text-red-600 sm:text-sm">
              {product.name}
            </h3>

            {/* PRICE */}
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-gray-900 sm:text-base">
                ৳{salePrice.toLocaleString()}
              </span>

              {hasDiscount && product.price > salePrice && (
                <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-2.5">
            {/* ORDER BUTTON */}
            <div className="w-full rounded-md bg-[#d90000] px-3 py-2 text-center text-[12px] font-bold text-white transition group-hover:bg-[#b80000] sm:py-2.5 sm:text-sm">
              অর্ডার করুন
            </div>

            {/* ACTIONS */}
            <div className="mt-2 flex items-center justify-between px-1">
              {/* SAVE */}
              <div className="flex items-center gap-1 text-[10px] text-gray-500 transition group-hover:text-red-500 sm:text-[11px]">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7C3.2 5.9 5.2 4 7.8 4c1.5 0 2.9.7 4.2 2 1.3-1.3 2.7-2 4.2-2 2.6 0 4.6 1.9 4.6 4.7Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Save
              </div>

              {/* QUICK VIEW */}
              <div className="flex items-center gap-1 text-[10px] text-gray-500 transition group-hover:text-gray-800 sm:text-[11px]">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="2.5" stroke="currentColor" />
                </svg>
                Quick View
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ProductCard1 };
