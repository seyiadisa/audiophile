"use client";

import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useCart } from "@/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Check } from "lucide-react";

export default function CheckoutConfirmation({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { cart, totalPrice } = useCart();
  const item = cart[0];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="bg-primary flex w-fit items-center justify-center rounded-full p-4">
          <Check className="w-[22px] stroke-4 text-white" />
        </div>
        <AlertDialogTitle className="text-h3! md:w-3/5">
          THANK YOU FOR YOUR ORDER
        </AlertDialogTitle>
        <AlertDialogDescription className="opacity-50">
          You will receive an email confirmation shortly.
        </AlertDialogDescription>

        <div className="bg-muted flex flex-col rounded-md *:p-6 md:flex-row md:items-center">
          <div className="md:flex-[1.5]">
            <div className="flex items-center justify-between">
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
            </div>
            {cart.length > 1 && (
              <>
                <Separator className="my-3" />
                <p className="text-center text-xs font-bold tracking-[-0.21px] opacity-50">
                  and {cart.length - 1} other item(s)
                </p>
              </>
            )}
          </div>
          <div className="space-y-2 rounded-b-md bg-black text-white md:flex md:h-full md:flex-1 md:flex-col md:justify-center md:rounded-l-none md:rounded-r-md">
            <p className="uppercase opacity-50">Grand Total</p>
            <p className="text-lg font-bold">{formatPrice(totalPrice)}</p>
          </div>
        </div>

        <Link href="/">
          <Button asChild className="w-full">
            Back to Home
          </Button>
        </Link>
      </AlertDialogContent>
    </AlertDialog>
  );
}
