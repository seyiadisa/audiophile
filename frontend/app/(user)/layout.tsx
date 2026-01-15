import { HeaderWrapper } from "@/components/layout/header";
import AppFooter from "@/components/layout/footer";
import { CartProvider } from "@/providers/cart-provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="body">
        <HeaderWrapper />
        {children}
        <AppFooter />
      </div>
    </CartProvider>
  );
}
