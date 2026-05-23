"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";

type Operator = {
  id: number;
  name: string;
  phone: string;
  experience: number;
  location: string;
  available: boolean;
};

export default function OperatorsPage() {

  const [operators, setOperators] =
    useState<Operator[]>([
      {
        id: 1,
        name: "Ali Valiyev",
        phone: "+998 90 123 45 67",
        experience: 5,
        location: "Tashkent",
        available: true,
      },

      {
        id: 2,
        name: "Bekzod Karimov",
        phone: "+998 91 777 88 99",
        experience: 3,
        location: "Samarkand",
        available: false,
      },
    ]);

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      experience: "",
      location: "",
    });

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // ADD OPERATOR
  const handleAddOperator = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.location
    ) {
      toast.error(
        "Barcha maydonlarni to‘ldiring"
      );

      return;
    }

    const newOperator: Operator = {
      id: Date.now(),

      name: form.name,

      phone: form.phone,

      experience:
        Number(form.experience) || 0,

      location: form.location,

      available: true,
    };

    setOperators([
      newOperator,
      ...operators,
    ]);

    setForm({
      name: "",
      phone: "",
      experience: "",
      location: "",
    });

    toast.success(
      "Operator qo‘shildi"
    );
  };

  // DELETE
  const handleDelete = (
    id: number
  ) => {

    setOperators(
      operators.filter(
        (item) =>
          item.id !== id
      )
    );

    toast.success(
      "Operator o‘chirildi"
    );
  };

  // TOGGLE STATUS
  const toggleAvailability = (
    id: number
  ) => {

    setOperators(
      operators.map((item) =>
        item.id === id
          ? {
              ...item,
              available:
                !item.available,
            }
          : item
      )
    );
  };

  return (
    <main className="min-h-screen flex bg-[#08140D] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-black">
              👷 Operators
            </h1>

            <p className="text-white/40 mt-2">
              Operator management panel
            </p>

          </div>

          <div className="bg-green-500/20 text-green-400 px-5 py-3 rounded-2xl font-semibold">
            {operators.length} Operators
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleAddOperator
          }
          className="grid md:grid-cols-4 gap-4 bg-[#102E1C] border border-white/10 rounded-3xl p-6 mb-10"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Operator name"
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            type="number"
            placeholder="Experience"
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            type="submit"
            className="md:col-span-4 bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl font-bold"
          >
            + Add Operator
          </button>

        </form>

        {/* LIST */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {operators.map((item) => (

            <div
              key={item.id}
              className="bg-[#102E1C] border border-white/10 rounded-3xl p-6 hover:bg-[#143823] transition"
            >

              {/* TOP */}
              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-white/40 mt-1">
                    {item.phone}
                  </p>

                </div>

                <div
                  className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                    item.available
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.available
                    ? "Available"
                    : "Busy"}
                </div>

              </div>

              {/* INFO */}
              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-sm">

                  <span className="text-white/40">
                    Experience
                  </span>

                  <span className="font-semibold">
                    {item.experience} years
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-white/40">
                    Location
                  </span>

                  <span className="font-semibold">
                    {item.location}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-8">

                <button
                  onClick={() =>
                    toggleAvailability(
                      item.id
                    )
                  }
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-2xl transition"
                >
                  Toggle
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      item.id
                    )
                  }
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-2xl transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}