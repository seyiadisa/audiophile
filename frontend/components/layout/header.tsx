"use client";

import { useEffect, useState } from "react";
import { useIsTablet } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import CartDropdown from "../cart/cart";
import ProductSections from "../landing/product-sections";
import { useCart } from "@/providers/cart-provider";

export const HeaderWrapper = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <AppHeader />;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/headphones", label: "Headphones" },
  { href: "/speakers", label: "Speakers" },
  { href: "/earphones", label: "Earphones" },
];

export default function AppHeader({ className }: { className?: string }) {
  const pathname = usePathname();
  const { cart } = useCart();
  const isTabOrMobile = useIsTablet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsMenuOpen(false);
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className={cn("bg-foreground w-screen", className)}>
      {isTabOrMobile ? (
        <>
          <header className="flex items-center justify-between gap-[42px] border-b border-white/[.104] px-6 py-8 md:mx-10 md:justify-start md:px-0 lg:py-9">
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={cn("flex items-center md:flex-1")}>
              <Link href="/" className="">
                <Image
                  src="/svg/audiophile.svg"
                  width={143}
                  height={25}
                  alt="Audiophile"
                />
              </Link>
            </div>
            <CartDropdown>
              <div className="relative flex items-center">
                {cart.length > 0 && (
                  <span
                    className="bg-primary absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full px-1.5 py-0.5 text-xs text-white"
                    aria-label={`${cart.length} items in cart`}
                  >
                    {cart.length}
                  </span>
                )}
                <Image
                  src="/svg/shopping-cart.svg"
                  width={23}
                  height={20}
                  alt="My Cart"
                />
              </div>
            </CartDropdown>
          </header>
          {/* Mobile menu */}
          <div
            className={cn(
              "invisible fixed inset-x-0 top-[90px] z-100 h-[calc(100vh-90px)] overflow-y-auto bg-black/40 opacity-0 transition-opacity duration-300 ease-in-out",
              isMenuOpen ? "visible opacity-100" : "pointer-events-none"
            )}
          >
            <nav className="rounded-b-md bg-white px-6 pt-8 pb-9 md:px-10 md:pt-14 md:pb-16">
              <ProductSections />
            </nav>
          </div>
        </>
      ) : (
        <header className="mx-[165px] flex items-center justify-between border-b border-white/20 py-9">
          <Link href="/" className="">
            <Image
              src="/svg/audiophile.svg"
              width={143}
              height={25}
              alt="Audiophile"
            />
          </Link>
          <nav>
            <ul className="text-background text-subtitle *:hover:text-primary flex items-center gap-8 tracking-[2px]">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <CartDropdown>
            <div className="relative flex items-center">
              {cart.length > 0 && (
                <span
                  className="bg-primary absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full px-1.5 py-0.5 text-xs text-white"
                  aria-label={`${cart.length} items in cart`}
                >
                  {cart.length}
                </span>
              )}
              <Image
                src="/svg/shopping-cart.svg"
                width={23}
                height={20}
                alt="My Cart"
              />
            </div>
          </CartDropdown>
        </header>
      )}
    </div>
  );
}
