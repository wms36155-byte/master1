"use client";

import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";

import CreateEquipmentModal from "./CreateEquipmentModal";

import type { Equipment } from "@/types/equipment.types";

import {
  getEquipments,
  deleteEquipment,
} from "@/services/equipment.service";

export default function EquipmentTable() {
  const [equipments, setEquipments] = useState<
    Equipment[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  // FETCH
  const fetchData = async () => {
    try {
      const data = await getEquipments();

      setEquipments(data);
    } catch (error) {
      toast.error(
        "Ma’lumotlarni olishda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (
    id: number
  ) => {
    try {
      await deleteEquipment(id);

      toast.success(
        "Texnika o‘chirildi"
      );

      fetchData();
    } catch (error) {
      toast.error(
        "O‘chirishda xatolik"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#102E1C] rounded-3xl p-10 mt-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black">
          Texnikalar
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 transition-all px-5 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={18} />

          Qo‘shish
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#102E1C] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-5">
                  Texnika
                </th>

                <th className="text-left p-5">
                  Kategoriya
                </th>

                <th className="text-left p-5">
                  Narx
                </th>

                <th className="text-left p-5">
                  Reyting
                </th>

                <th className="text-left p-5">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {equipments.map(
                (equipment) => (
                  <tr
                    key={equipment.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-5 font-bold">
                      {equipment.name}
                    </td>

                    <td className="p-5 text-white/60">
                      {equipment.category}
                    </td>

                    <td className="p-5 text-green-400 font-semibold">
                      {equipment.pricePerDay.toLocaleString()}{" "}
                      so‘m
                    </td>

                    <td className="p-5">
                      ⭐ {equipment.rating}
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        {/* EDIT */}
                        <button className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 transition-all flex items-center justify-center">
                          <Pencil
                            size={18}
                            className="text-blue-400"
                          />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(
                              equipment.id
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all flex items-center justify-center"
                        >
                          <Trash2
                            size={18}
                            className="text-red-400"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {equipments.length === 0 && (
            <div className="p-10 text-center text-white/50">
              Texnikalar mavjud emas
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <CreateEquipmentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        refetch={fetchData}
      />
    </>
  );
}