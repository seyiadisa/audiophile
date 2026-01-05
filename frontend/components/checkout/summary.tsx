"use client";

import { formatPrice } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import CheckoutConfirmation from "./confirmation-modal";

export default function CheckoutSummary() {
  const { cart } = useCart();
  const [openModal, setOpenModal] = useState(false);

  const shipping = 50;
  const vat = 1079;
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalPrice = totalCartPrice + shipping + vat;

  return (
    <>
      <div>
        <ul className="space-y-6">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-muted size-16 rounded-md p-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="size-auto object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">
                    {item.shortName || item.id.toUpperCase()}
                  </p>
                  <p className="text-sm font-bold opacity-50">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-bold opacity-50">x{item.quantity}</p>
                <p className="invisible" aria-hidden>
                  &shy;
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="my-8 space-y-2 *:flex *:items-center *:justify-between [&_span]:first-of-type:uppercase [&_span]:first-of-type:opacity-50 [&_span]:last-of-type:text-lg [&_span]:last-of-type:font-bold">
          <div>
            <span>Total</span>
            <span>{formatPrice(totalCartPrice)}</span>
          </div>
          <div>
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div>
            <span>Vat (included)</span>
            <span>{formatPrice(vat)}</span>
          </div>
          <div className="mt-6">
            <span>Grand total</span>
            <span className="text-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <Button className="w-full" onClick={() => setOpenModal(!openModal)}>
          Continue & Pay
        </Button>
      </div>

      <CheckoutConfirmation
        totalPrice={totalCartPrice}
        open={openModal}
        onOpenChange={(open) => setOpenModal(open)}
      />
    </>
  );
}
