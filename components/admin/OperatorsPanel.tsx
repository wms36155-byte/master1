"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getOperators,
  createOperator,
  deleteOperator,
} from "@/services/operator.service";

import type { Operator, CreateOperatorDTO } from "@/types/operator.types";

type FormState = {
  name: string;
  phone: string;
  experience: string;
  location: string;
};

export default function OperatorsPanel() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    experience: "",
    location: "",
  });

  // ======================
  // GET OPERATORS
  // ======================
  useEffect(() => {
    const loadOperators = async () => {
      try {
        setLoading(true);
        const data = await getOperators();
        setOperators(data);
      } catch (err) {
        console.error(err);
        toast.error("Operatorlarni yuklab bo‘lmadi");
      } finally {
        setLoading(false);
      }
    };

    loadOperators();
  }, []);

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================
  // ADD OPERATOR
  // ======================
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, phone, experience, location } = form;

    if (!name || !phone || !location) {
      toast.error("Barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      const payload: CreateOperatorDTO = {
        name,
        phone,
        experience: Number(experience) || 0,
        location,
        available: true,
      };

      const newOperator = await createOperator(payload);

      setOperators((prev) => [newOperator, ...prev]);

      setForm({
        name: "",
        phone: "",
        experience: "",
        location: "",
      });

      toast.success("Operator qo‘shildi");
    } catch (err) {
      console.error(err);
      toast.error("Operator qo‘shilmadi");
    }
  };

  // ======================
  // DELETE OPERATOR
  // ======================
  const handleDelete = async (id: number) => {
    try {
      await deleteOperator(id);

      setOperators((prev) => prev.filter((op) => op.id !== id));

      toast.success("Operator o‘chirildi");
    } catch (err) {
      console.error(err);
      toast.error("O‘chirishda xatolik");
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">👷 Operators</h2>

      {/* FORM */}
      <form
        onSubmit={handleAdd}
        className="grid md:grid-cols-4 gap-4 bg-[#102E1C] p-6 rounded-2xl mb-6"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-3 rounded-xl bg-black/20 outline-none"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-3 rounded-xl bg-black/20 outline-none"
        />

        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          type="number"
          placeholder="Experience"
          className="p-3 rounded-xl bg-black/20 outline-none"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-3 rounded-xl bg-black/20 outline-none"
        />

        <button
          type="submit"
          className="md:col-span-4 bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-bold"
        >
          Add Operator
        </button>
      </form>

      {/* LIST */}
      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {operators.map((op) => (
            <div
              key={op.id}
              className="p-5 bg-[#102E1C] rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold">{op.name}</h3>
              <p className="text-white/60">{op.phone}</p>
              <p className="text-white/60">{op.location}</p>

              <p className="text-white/40 mt-2">
                {op.experience} years experience
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(op.id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}