"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";
import CreateEquipmentModal from "@/components/admin/CreateEquipmentModal";

import {
  deleteEquipment,
  getEquipments,
} from "@/services/equipment.service";

import type { Equipment } from "@/types/equipment.types";

type Operator = {
  id: number;
  name: string;
  status: "available" | "busy";
};

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

  const [operators] = useState<Operator[]>([
    { id: 1, name: "Ali Valiyev", status: "available" },
    { id: 2, name: "Bekzod Karimov", status: "busy" },
    { id: 3, name: "Jasur Xasanov", status: "available" },
  ]);

  // =========================
  // FETCH
  // =========================
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const data = await getEquipments();
      setEquipments(data);
    } catch (error) {
      toast.error("Texnikalarni yuklab bo‘lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    try {
      await deleteEquipment(id);

      toast.success("Texnika o‘chirildi");
      fetchEquipments();
    } catch (error) {
      toast.error("Delete ishlamadi");
    }
  };

  // =========================
  // ASSIGN OPERATOR
  // =========================
  const handleAssignOperator = (
    equipmentId: string,
    operatorId: number
  ) => {
    const updated = equipments.map((item) =>
      item.id === equipmentId
        ? { ...item, operatorId }
        : item
    );

    setEquipments(updated);

    toast.success("Operator biriktirildi");
  };

  return (
    <div className="flex min-h-screen bg-[#07130d] text-white overflow-hidden">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              🚜 Equipments
            </h1>
            <p className="text-white/40 mt-2 text-lg">
              Texnikalarni boshqarish paneli
            </p>
          </div>

          <button
            onClick={() => setOpenCreate(true)}
            className="bg-green-500 hover:bg-green-600 transition px-7 py-4 rounded-2xl font-bold"
          >
            + Add Equipment
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-white/40">Total Equipments</p>
            <h2 className="text-4xl font-black mt-3">
              {equipments.length}
            </h2>
          </div>
        </div>

        {/* LIST */}
        {loading ? (
          <div className="h-[400px] flex items-center justify-center text-white/40">
            Yuklanmoqda...
          </div>
        ) : equipments.length === 0 ? (
          <div className="p-10 text-center text-white/40">
            Hozircha texnika yo‘q
          </div>
        ) : (
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-7">
            {equipments.map((item) => {
              const assignedOperator = operators.find(
                (o) => o.id === item.operatorId
              );

              return (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    className="h-64 w-full object-cover"
                    alt={item.name}
                  />

                  {/* BODY */}
                  <div className="p-6">
                    <h2 className="text-2xl font-black">
                      {item.name}
                    </h2>

                    <p className="text-white/40">
                      {item.category}
                    </p>

                    {/* OPERATOR */}
                    <select
                      value={item.operatorId || ""}
                      onChange={(e) =>
                        handleAssignOperator(
                          item.id,
                          Number(e.target.value)
                        )
                      }
                      className="w-full mt-4 bg-black/20 border border-white/10 rounded-2xl px-4 py-3"
                    >
                      <option value="">
                        Operator tanlang
                      </option>

                      {operators.map((op) => (
                        <option key={op.id} value={op.id}>
                          {op.name}
                        </option>
                      ))}
                    </select>

                    {/* ASSIGNED */}
                    {assignedOperator && (
                      <div className="mt-4 text-green-400">
                        👷 {assignedOperator.name}
                      </div>
                    )}

                    {/* ACTION */}
                    <div className="flex gap-3 mt-6">
                      <button className="flex-1 bg-blue-500/20 py-2 rounded-xl">
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-500/20 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* MODAL */}
      <CreateEquipmentModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        refetch={fetchEquipments}
      />
    </div>
  );
}