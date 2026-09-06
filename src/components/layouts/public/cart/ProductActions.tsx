'use client';

import { useState } from 'react';
import { Heart, Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/services/cart.service';
import { createWishlist } from '@/services/wishlist.service';
import { useCartStore } from '@/store/cart.store';
import { IProduct } from '@/types/products.type';
import { getUser } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useOrderStore } from '@/store/order.store';

import { useProductStore } from '@/store/product.store';

type Props = {
  productId: string;
  product: IProduct;
};

const ProductActions = ({ productId, product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const user = getUser();

  const router = useRouter();
  const pathname = usePathname();

  const increase = useCartStore(state => state.increase);

  // LOGIN CHECK
  const handleRequireLogin = () => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return false;
    }

    return true;
  };

  const currentPrice = product.specialPrice ?? product.price;

  const originalPrice =
    product.specialPrice != null && product.specialPrice < product.price
      ? product.price
      : product.discount && product.discount > 0
        ? Math.round(product.price / (1 - product.discount / 100))
        : null;

  const setSelectedProduct = useOrderStore(state => state.setSelectedProduct);
  // const selectedSize = useOrderStore(state => state.selectedSize);
  // const selectedColor = useProductStore(state => state.selectedColor);

  const handleBuyNow = () => {
    // if (product.colorVariants?.length > 0 && !selectedColor) {
    //   toast.error('দয়া করে একটি কালার নির্বাচন করুন।');
    //   return;
    // }
    // if (product.colorVariants?.length > 0 && !selectedSize) {
    //   toast.error('দয়া করে একটি সাইজ নির্বাচন করুন।');
    //   return;
    // }

    setSelectedProduct(product);

    router.push('/order-now');
  };

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!handleRequireLogin()) return;
    try {
      setLoading(true);

      await addToCart(productId, quantity);

      increase(quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Products Add Failed!');
    } finally {
      setLoading(false);
    }
  };

  // ADD TO WISHLIST
  const handleAddWishlist = async () => {
    if (!handleRequireLogin()) return;

    try {
      setWishlistLoading(true);

      await createWishlist({
        productId,
      });

      toast.success('Added to wishlist!');

      setWishlistLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to add wishlist';
      toast.error(message);

      setWishlistLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Product Name */}

      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-1 ms:hidden">
        {product.name}
      </h1>

      <div className="flex items-center justify-between gap-3">
        {/* Quantity */}
        <div>
          <span className="text-sm text-gray-600 block mb-2">Quantity</span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-9 h-9 border rounded-sm flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="w-12 text-center font-semibold text-lg">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-9 h-9 border rounded-sm flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* PRICE */}
        <div className=" rounded-sm p-4 mt-5 sm:hidden">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xl font-bold text-title">
              ৳{currentPrice.toLocaleString()}
            </span>

            {originalPrice && originalPrice > currentPrice && (
              <span className="text-lg text-gray-400 line-through">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}

            {product.discount && product.discount > 0 && (
              <span className="text-sm text-green-600 font-semibold">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-3">
        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          disabled={loading || wishlistLoading}
          className="flex-1 border-2 border-primary-light text-title py-3 rounded-sm font-semibold hover:bg-button-hover-1 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}

          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
        {/* Buy Now */}

        <button
          onClick={handleBuyNow}
          disabled={loading || wishlistLoading}
          className="flex-1 bg-button text-button-text py-3 rounded-sm font-semibold hover:bg-button-hover transition-colors disabled:opacity-50 cursor-pointer"
        >
          অর্ডার করুন
        </button>

        {/* Wishlist */}
        <button
          onClick={handleAddWishlist}
          disabled={wishlistLoading || loading}
          className="w-14 border-2 border-primary-light text-title rounded-sm flex items-center justify-center hover:bg-button-hover-1 transition disabled:opacity-50"
        >
          {wishlistLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
