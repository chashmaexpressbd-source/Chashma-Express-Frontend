import React from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Smile,
  Phone,
  Mail,
  Glasses,
  Sun,
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Glasses,
      title: 'Stylish Eyewear Collection',
      description:
        'Discover a carefully selected collection of stylish sunglasses, power glasses, blue-cut glasses, and everyday eyewear designed to match your style and lifestyle.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality You Can Trust',
      description:
        'We carefully source our eyewear from trusted manufacturers and suppliers to ensure you receive products that offer reliable quality, comfort, and durability.',
    },
    {
      icon: Sun,
      title: 'Protection & Comfort',
      description:
        'Our sunglasses and blue-cut eyewear are selected with your everyday comfort in mind, helping you enjoy clear vision and comfortable wear throughout the day.',
    },
    {
      icon: Lock,
      title: 'Safe & Secure Shopping',
      description:
        'Your privacy and security matter to us. We use secure technologies to protect your personal information and provide you with a safe online shopping experience.',
    },
    {
      icon: CheckCircle2,
      title: 'Authentic Products',
      description:
        'We focus on providing genuine and carefully selected eyewear products. Every product is checked before reaching our customers.',
    },
    {
      icon: Smile,
      title: 'Customer Satisfaction',
      description:
        'Your satisfaction is our priority. From product selection to delivery, we aim to provide a smooth, honest, and reliable shopping experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-accent/40 border-b border-border py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-primary">
            Stylish Eyewear • Trusted Quality
          </span>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-title sm:text-5xl">
            About Chashma Express
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Your trusted online destination in Bangladesh for stylish
            sunglasses, power glasses, blue-cut glasses, and everyday eyewear.
            We bring carefully selected eyewear products to your doorstep at
            affordable prices.
          </p>
        </div>
      </section>

      {/* Main Mission Section */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-md border border-border bg-card p-8 shadow-sm md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-subtitle">
            Welcome to Chashma Express
          </h2>

          <div className="space-y-4 text-base leading-relaxed text-body md:text-lg">
            <p>
              At Chashma Express, we believe that eyewear is more than just
              something you wear — it is a part of your style, confidence, and
              everyday lifestyle.
            </p>

            <p>
              We offer a growing collection of sunglasses, power glasses,
              blue-cut glasses, and stylish eyewear designed for different needs
              and preferences. Our goal is to make quality and stylish eyewear
              easily accessible to customers across Bangladesh.
            </p>

            <p>
              From choosing the right frame to receiving your order at your
              doorstep, we focus on providing a simple, convenient, and
              trustworthy shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-title">
              Why Choose Chashma Express?
            </h2>

            <p className="mt-2 text-muted-foreground">
              Quality eyewear, honest service, and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;

              return (
                <div
                  key={idx}
                  className="rounded-md border border-border bg-card p-6 transition-all hover:border-primary/50"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-md bg-gradient-primary p-8 text-primary-foreground shadow-lg md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Contact Content */}
            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Need Help Choosing Your Eyewear?
              </h2>

              <p className="leading-relaxed text-primary-foreground/90">
                Have a question about our sunglasses, power glasses, or blue-cut
                glasses? Our team is here to help. Feel free to reach out to us
                anytime.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 rounded-md border border-primary-foreground/20 bg-background/10 p-6 backdrop-blur-md">
              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary-foreground/10 p-3">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase text-primary-foreground/70">
                    Call Us
                  </div>

                  <a
                    href="tel:01307444883"
                    className="text-lg font-bold hover:underline"
                  >
                    01307444883
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary-foreground/10 p-3">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase text-primary-foreground/70">
                    Email Us
                  </div>

                  <a
                    href="mailto:chashmaexpressbd@gmail.com"
                    className="text-lg font-bold hover:underline"
                  >
                    chashmaexpressbd@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
