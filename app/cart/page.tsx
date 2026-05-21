"use client";

import Image from "next/image";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";

import { useCartStore } from "@/store/cart.store";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const totalPrice = items.reduce(
    (acc, item) =>
      acc + item.pricePerHour * item.quantity,
    0
  );

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <h1 className="text-5xl font-black mb-10">
            Savatcha
          </h1>

          {items.length === 0 ? (
            <div className="bg-[#102E1C] rounded-3xl p-10 text-center">
              <h2 className="text-2xl font-bold">
                Savatcha bo‘sh
              </h2>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#102E1C] rounded-3xl p-5 flex gap-5"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="rounded-2xl object-cover w-40 h-32"
                    />

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-green-400 mt-2">
                        {item.pricePerHour.toLocaleString()} so‘m
                      </p>

                      <div className="flex items-center gap-3 mt-6">
                        <Button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          -
                        </Button>

                        <span className="text-xl">
                          {item.quantity}
                        </span>

                        <Button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      O‘chirish
                    </Button>
                  </div>
                ))}
              </div>

              <div className="bg-[#102E1C] rounded-3xl p-6 h-fit sticky top-28">
                <h2 className="text-3xl font-black">
                  Buyurtma
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Texnikalar</span>

                    <span>{items.length}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Jami</span>

                    <span className="text-green-400 text-2xl font-black">
                      {totalPrice.toLocaleString()} so‘m
                    </span>
                  </div>
                </div>

                <Button className="w-full mt-8">
                  Ariza yuborish
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}