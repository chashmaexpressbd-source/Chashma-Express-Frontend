import {
  ChevronRight,
  PhoneCall,
  Truck,
  Banknote,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Category = () => {
  const benefits = [
    {
      icon: PhoneCall,
      title: 'Easy Ordering',
      description: 'Call us to place your order',
      value: '01302-596174',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Delivery across Bangladesh',
    },
    {
      icon: Banknote,
      title: 'Cash on Delivery',
      description: 'Pay when your order arrives',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assured',
      description: 'Carefully selected eyewear',
    },
  ];

  return (
    <section className="w-full border-y border-color-card-foreground bg-white ">
      <div className="container mx-auto px-4 pt-5">
        {/* Header */}
        <div className="flex items-center justify-between py-6 sm:py-7">
          <div>
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl lg:text-3xl">
              Why Shop With Us?
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              A simple and reliable eyewear shopping experience
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-title transition-colors hover:text-hover-text sm:gap-1 sm:text-sm md:text-base"
          >
            <span>Shop Now</span>

            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 border-t border-color-card-foreground lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`
                  flex items-center gap-3 py-5 pr-4
                  ${index % 2 !== 0 ? 'pl-4' : ''}
                  lg:border-r lg:border-color-card-foreground lg:px-6
                  ${index >= 2 ? 'border-t border-color-card-foreground lg:border-t-0' : ''}
                  ${index === 3 ? 'lg:border-r-0' : ''}
                `}
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-700">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                    {benefit.title}
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-4 text-gray-500 sm:text-xs">
                    {benefit.description}
                  </p>

                  {benefit.value && (
                    <a
                      href={`tel:${benefit.value.replace(/-/g, '')}`}
                      className="mt-0.5 block text-xs font-semibold text-primary hover:underline"
                    >
                      {benefit.value}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
