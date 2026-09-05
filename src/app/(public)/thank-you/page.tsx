import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  MapPin,
  Phone,
  Truck,
  Package,
  Calendar,
  Clock,
  ArrowLeft,
  FileText,
  User,
  Hash,
} from 'lucide-react';

import DownloadOrderButton from '@/components/layouts/public/Thankyou/DownloadOrderButton';

interface PageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  size?: string;
  color?: string;
  product: {
    thumbnail: string;
    category?: string;
    brand?: string;
    variant?: string;
  };
}

interface Order {
  id: string;
  userId?: string;
  total: number;
  status: string;
  name: string;
  phone: string;
  district: string;
  thana: string;
  address: string;
  note: string | null;
  isInsideDhaka: boolean;
  shippingFee: number;
  createdAt: string;
  items: OrderItem[];
}

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

const getSingleOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return null;
  }
};

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const { orderId } = await searchParams;

  /* -------------------------------------------------
     NO ORDER ID
  ------------------------------------------------- */

  if (!orderId) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Package className="h-8 w-8 text-slate-400" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            অর্ডারের তথ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            দুঃখিত, কোনো অর্ডার আইডি প্রদান করা হয়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------
     FETCH ORDER
  ------------------------------------------------- */

  const order = await getSingleOrder(orderId);

  /* -------------------------------------------------
     ORDER NOT FOUND
  ------------------------------------------------- */

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
            <Package className="h-8 w-8 text-amber-500" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            অর্ডার খুঁজে পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            আপনার প্রদানকৃত অর্ডার আইডি দিয়ে কোনো রেকর্ড পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------
     CALCULATIONS
  ------------------------------------------------- */

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const formattedDate = new Date(order.createdAt).toLocaleString('en-BD', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto w-full px-2 sm:px-6">
        {/* =================================================
            SUCCESS HEADER
        ================================================= */}

        {/* =================================================
            ORDER CARD
        ================================================= */}

        <div
          id="order-receipt"
          className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm"
        >
          {/* SUCCESS HEADER */}
          <section className="mb-8 text-center sm:mb-10">
            {/* Success Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/70">
              <CheckCircle2
                className="h-9 w-9 text-emerald-600"
                strokeWidth={2.5}
              />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              ধন্যবাদ! অর্ডারটি সফল হয়েছে
            </h1>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের
              প্রতিনিধি আপনাকে ফোন করবেন।
            </p>

            {/* Confirmation Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              অর্ডার নিশ্চিত হয়েছে
            </div>
          </section>
          {/* -------------------------------------------------
              CARD HEADER
          ------------------------------------------------- */}

          <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Order Confirmation
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <Hash className="h-4 w-4 text-slate-400" />

                  <h2 className="break-all text-sm font-bold text-slate-900 sm:text-base">
                    {order.id}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {formattedDate}
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold capitalize text-amber-700">
                  <Clock className="h-3.5 w-3.5" />
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------
              CUSTOMER INFORMATION
          ------------------------------------------------- */}

          <div className="grid grid-cols-1 divide-y divide-slate-200 border-b border-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {/* CUSTOMER */}

            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                  <User className="h-4 w-4 text-slate-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    গ্রাহকের তথ্য
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-base font-semibold text-slate-900">
                  {order.name}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>{order.phone}</span>
                </div>
              </div>
            </div>

            {/* ADDRESS */}

            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                  <MapPin className="h-4 w-4 text-slate-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Delivery
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    ডেলিভারি ঠিকানা
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium leading-6 text-slate-800">
                  {order.address}
                </p>

                <p className="text-sm text-slate-500">
                  {order.thana}, {order.district}
                </p>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <Truck className="h-3.5 w-3.5" />

                    {order.isInsideDhaka
                      ? 'ঢাকার ভেতরে · ৳৯০'
                      : 'ঢাকার বাইরে · ৳১৩০'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="border-b border-slate-200 px-5 py-6 sm:px-8 sm:py-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Order Items
                </p>

                <h3 className="mt-1 text-base font-bold text-slate-900">
                  অর্ডারের পণ্যসমূহ
                </h3>
              </div>

              <span className="text-xs font-medium text-slate-400">
                {order.items.length} টি পণ্য
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0 sm:gap-5"
                >
                  {/* IMAGE */}

                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-20 sm:w-20">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  {/* DETAILS */}

                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900 sm:text-base">
                      {item.name}
                    </h4>

                    {/* VARIANTS */}

                    {(item.size || item.color) && (
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {item.size && (
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            Size: {item.size}
                          </span>
                        )}

                        {item.color && (
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            Color: {item.color}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                      ৳{item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>

                  {/* PRICE */}

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-slate-900 sm:text-base">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              ORDER NOTE
          ================================================= */}

          {order.note && (
            <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />

                  <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    Customer Note
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {order.note}
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="ml-auto w-full max-w-sm space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">পণ্যের সাবটোটাল</span>

                <span className="font-medium text-slate-800">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">ডেলিভারি চার্জ</span>

                <span className="font-medium text-slate-800">
                  ৳{order.shippingFee.toLocaleString()}
                </span>
              </div>

              <div className="my-4 border-t border-dashed border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">
                  সর্বমোট
                </span>

                <span className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                  ৳{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-6 flex flex-col items-center gap-4 print:hidden sm:mt-8">
          <DownloadOrderButton />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* =================================================
            FOOTER MESSAGE
        ================================================= */}

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          আপনার অর্ডার সম্পর্কিত যেকোনো সমস্যার জন্য আমাদের কাস্টমার সাপোর্টে
          যোগাযোগ করুন।
        </p>
      </div>
    </main>
  );
};

export default ThankYouPage;
