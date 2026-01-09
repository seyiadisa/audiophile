"use client";

import CheckoutConfirmation from "@/components/checkout/confirmation-modal";
import CheckoutForm from "@/components/checkout/form";
import CheckoutSummary from "@/components/checkout/summary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkout() {
  const router = useRouter();
  const { cart } = useCart();
  const [openModal, setOpenModal] = useState(false);

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center">
        <div className="mt-10 space-y-8 text-center">
          <h1 className="text-h4 md:text-h3">Your Cart is Empty</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mb-[97px] flex flex-col items-stretch gap-8 md:mb-[116px] xl:flex-row xl:items-start xl:justify-center xl:gap-[30px]">
      <section className="rounded-md bg-white p-6 pb-8 md:px-7 md:pt-[30px] lg:px-12 lg:pt-[54px] lg:pb-12 xl:flex-2">
        <h1 className="text-h4 md:text-h3 mb-8 md:mb-[41px]">Checkout</h1>
        <div className="w-full">
          <CheckoutForm openModal={setOpenModal} />
        </div>
      </section>
      <section className="rounded-md bg-white px-6 py-8 md:px-[33px] xl:flex-1">
        <h1 className="text-h4 mb-8">Summary</h1>
        <CheckoutSummary />
      </section>

      <CheckoutConfirmation
        open={openModal}
        onOpenChange={(open) => setOpenModal(open)}
      />
    </main>
  );
}
