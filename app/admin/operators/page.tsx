"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";

import {
  getOperators,
  createOperator,
  updateOperator,
  deleteOperator,
} from "@/services/operator.service";

import type {
  Operator,
  OperatorFormState,
} from "@/types/operator.types";

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<OperatorFormState>({
    name: "",
    phone: "",
    experience: "",
    location: "",
  });

  useEffect(() => {
    loadOperators();
  }, []);

  const loadOperators = async () => {
    try {
      setLoading(true);
      const data = await getOperators();
      setOperators(data);
    } catch (error) {
      console.error(error);
      toast.error("Operatorlarni yuklab bo‘lmadi");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      phone: "",
      experience: "",
      location: "",
    });

    setEditingId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (operator: Operator) => {
    setEditingId(operator.id);

    setForm({
      name: operator.name,
      phone: operator.phone,
      experience: String(operator.experience),
      location: operator.location,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const {
      name,
      phone,
      experience,
      location,
    } = form;

    if (!name || !phone || !location) {
      toast.error("Barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name,
        phone,
        experience:
          Number(experience) || 0,
        location,
      };

      if (editingId) {
        const updatedOperator =
          await updateOperator(
            editingId,
            payload
          );

        setOperators((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? updatedOperator
              : item
          )
        );

        toast.success(
          "Operator yangilandi"
        );
      } else {
        const newOperator =
          await createOperator(payload);

        setOperators((prev) => [
          newOperator,
          ...prev,
        ]);

        toast.success(
          "Operator qo‘shildi"
        );
      }

      clearForm();
    } catch (error) {
      console.error(error);

      toast.error(
        editingId
          ? "Operator yangilanmadi"
          : "Operator qo‘shilmadi"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Operatorni o‘chirmoqchimisiz?"
    );

    if (!confirmed) return;

    try {
      await deleteOperator(id);

      setOperators((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

      toast.success(
        "Operator o‘chirildi"
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "O‘chirishda xatolik"
      );
    }
  };

  return (
    <main className="min-h-screen flex bg-[#08140D] text-white">
      <AdminSidebar />

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
          onSubmit={handleSubmit}
          className="bg-[#102E1C] border border-white/10 rounded-3xl p-6 mb-10"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              {editingId
                ? "✏️ Edit Operator"
                : "➕ Add Operator"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
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
              disabled={submitting}
              className="md:col-span-4 bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl font-bold disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : editingId
                ? "Update Operator"
                : "+ Add Operator"}
            </button>
          </div>
        </form>

        {/* LIST */}
        {loading ? (
          <p className="text-white/50">
            Loading...
          </p>
        ) : operators.length === 0 ? (
          <p className="text-white/40">
            No operators found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {operators.map((item) => (
              <div
                key={item.id}
                className="bg-[#102E1C] border border-white/10 rounded-3xl p-6 hover:bg-[#143823] transition"
              >
                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-white/40 mt-2">
                  📞 {item.phone}
                </p>

                <p className="text-white/40">
                  📍 {item.location}
                </p>

                <p className="text-white/30 mt-2 text-sm">
                  {item.experience} years
                  experience
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="flex-1 bg-blue-500/20 text-blue-300 py-3 rounded-2xl hover:bg-blue-500/30 transition"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="flex-1 bg-red-500/20 text-red-300 py-3 rounded-2xl hover:bg-red-500/30 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}