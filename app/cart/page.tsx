"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";

import {
  createBooking,
} from "@/services/booking.service";

import {
  useCartStore,
} from "@/store/cart.store";

export default function CartPage() {
  const router = useRouter();

  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  // TOTAL
  const totalPrice =
    items.reduce(
      (acc, item) =>
        acc +
        item.pricePerDay *
          item.quantity,
      0
    );

  // CHECKOUT
  const handleCheckout =
    async () => {
      try {
        if (
          items.length === 0
        ) {
          toast.error(
            "Savatcha bo‘sh"
          );

          return;
        }

        for (const item of items) {
          await createBooking({
            equipmentName:
              item.name,

            customerName:
              "Customer",

            phone:
              "+998900000000",

            days:
              item.quantity,

            totalPrice:
              item.pricePerDay *
              item.quantity,

            withOperator: false,

            createdAt:
              new Date().toISOString(),
          });
        }

        toast.success(
          "Ariza yuborildi"
        );

        clearCart();

        router.push(
          "/success"
        );
      } catch (error) {
        toast.error(
          "Xatolik yuz berdi"
        );
      }
    };

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          {/* TITLE */}
          <div className="mb-10">
            <h1 className="text-5xl font-black">
              Savatcha
            </h1>

            <p className="text-white/50 mt-4">
              Tanlangan
              texnikalaringiz
            </p>
          </div>

          {/* EMPTY */}
          {items.length ===
          0 ? (
            <div className="bg-[#102E1C] border border-white/10 rounded-[40px] p-16 text-center">
              <h2 className="text-4xl font-black">
                Savatcha bo‘sh
              </h2>

              <p className="text-white/50 mt-4">
                Texnikalarni
                savatchaga
                qo‘shing
              </p>

              <Link
                href="/equipment"
              >
                <Button className="mt-8">
                  Texnikalarni
                  ko‘rish
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* ITEMS */}
              <div className="lg:col-span-2 space-y-6">
                {items.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className="bg-[#102E1C] border border-white/10 rounded-[32px] p-5 flex flex-col md:flex-row gap-5"
                    >
                      {/* IMAGE */}
                      <Image
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                        width={300}
                        height={300}
                        className="rounded-3xl object-cover w-full md:w-44 h-40"
                      />

                      {/* CONTENT */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-3xl font-black">
                            {
                              item.name
                            }
                          </h2>

                          <p className="text-white/50 mt-2">
                            Soatlik
                            narx
                          </p>

                          <p className="text-green-400 text-2xl font-black mt-1">
                            {item.pricePerHour.toLocaleString()}{" "}
                            so‘m
                          </p>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-4 mt-6">
                          <Button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            className="w-12 h-12"
                          >
                            -
                          </Button>

                          <span className="text-2xl font-black min-w-[40px] text-center">
                            {
                              item.quantity
                            }
                          </span>

                          <Button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            className="w-12 h-12"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* DELETE */}
                      <Button
                        className="bg-red-500 hover:bg-red-600 h-fit"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        O‘chirish
                      </Button>
                    </div>
                  )
                )}
              </div>

              {/* SUMMARY */}
              <div className="bg-[#102E1C] border border-white/10 rounded-[32px] p-8 h-fit sticky top-28">
                <h2 className="text-4xl font-black">
                  Buyurtma
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-white/60">
                      Texnikalar
                    </span>

                    <span className="font-bold">
                      {
                        items.length
                      }
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-lg">
                    <span className="text-white/60">
                      Jami summa
                    </span>

                    <span className="text-green-400 text-3xl font-black">
                      {totalPrice.toLocaleString()}{" "}
                      so‘m
                    </span>
                  </div>
                </div>

                <Button
                  onClick={
                    handleCheckout
                  }
                  className="w-full mt-10"
                >
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