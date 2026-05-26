"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

import CreateEquipmentModal from "./CreateEquipmentModal";
import EditEquipmentModal from "./EditEquipmentModal";

import type { Equipment } from "@/types/equipment.types";

import {
  getEquipments,
  deleteEquipment,
} from "@/services/equipment.service";

export default function EquipmentTable() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getEquipments();
      setEquipments(data);
    } catch {
      toast.error("Ma’lumotlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    try {
      await deleteEquipment(id);
      toast.success("Texnika o‘chirildi");
      fetchData();
    } catch {
      toast.error("O‘chirishda xatolik");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 IMPORTANT FIX: edit open handler
  const handleEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setEditOpen(true);
  };

  // 🔥 IMPORTANT FIX: close modal cleanup
  const handleCloseEdit = () => {
    setEditOpen(false);

    // small delay so form reset properly
    setTimeout(() => {
      setSelectedEquipment(null);
    }, 200);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black">Texnikalar</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 transition-all px-5 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={18} />
          Qo‘shish
        </button>
      </div>

      {/* EMPTY */}
      {equipments.length === 0 ? (
        <div className="bg-[#102E1C] border border-white/10 rounded-3xl p-10 text-center text-white/50">
          Texnikalar mavjud emas
        </div>
      ) : (
        <div className="bg-[#102E1C] border border-white/10 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left p-5">Texnika</th>
                  <th className="text-left p-5">Kategoriya</th>
                  <th className="text-left p-5">Narx</th>
                  <th className="text-left p-5">Reyting</th>
                  <th className="text-left p-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {equipments.map((equipment) => (
                  <tr
                    key={equipment.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-5 font-bold">{equipment.name}</td>

                    <td className="p-5 text-white/60">
                      {equipment.category}
                    </td>

                    <td className="p-5 text-green-400 font-semibold">
                      {equipment.pricePerDay.toLocaleString()} so‘m
                    </td>

                    <td className="p-5">⭐ {equipment.rating}</td>

                    <td className="p-5">
                      <div className="flex items-center gap-3">

                        {/* EDIT FIX */}
                        <button
                          onClick={() => handleEdit(equipment)}
                          className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center"
                        >
                          <Pencil size={18} className="text-blue-400" />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(equipment.id)}
                          className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center"
                        >
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODALS */}
      <EditEquipmentModal
        isOpen={editOpen}
        onClose={handleCloseEdit}
        equipment={selectedEquipment}
        refetch={fetchData}
      />

      <CreateEquipmentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        refetch={fetchData}
      />
    </>
  );
}