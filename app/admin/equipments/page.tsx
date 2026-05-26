"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";
import CreateEquipmentModal from "@/components/admin/CreateEquipmentModal";
import EditEquipmentModal from "@/components/admin/EditEquipmentModal";

import {
  deleteEquipment,
  getEquipments,
} from "@/services/equipment.service";

import { getOperators } from "@/services/operator.service";

import type { Equipment } from "@/types/equipment.types";
import type { Operator } from "@/types/operator.types";

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null);

  // =========================
  // FETCH ALL DATA
  // =========================
  const fetchData = async () => {
    try {
      setLoading(true);

      const [equipmentsData, operatorsData] = await Promise.all([
        getEquipments(),
        getOperators(),
      ]);

      setEquipments(equipmentsData);
      setOperators(operatorsData);
    } catch (err) {
      console.error(err);
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // DELETE EQUIPMENT
  // =========================
  const handleDelete = async (id: string) => {
    try {
      await deleteEquipment(id);
      toast.success("Texnika o‘chirildi");
      fetchData();
    } catch {
      toast.error("Delete ishlamadi");
    }
  };

  // =========================
  // ASSIGN OPERATOR (FIXED + SAFE)
  // =========================
  const handleAssignOperator = (
    equipmentId: string,
    operatorValue: string
  ) => {
    const operatorId =
      operatorValue === "" ? undefined : Number(operatorValue);

    const updated = equipments.map((item) =>
      item.id === equipmentId
        ? { ...item, operatorId }
        : item
    );

    setEquipments(updated);

    toast.success(
      operatorId
        ? "Operator biriktirildi"
        : "Operator olib tashlandi"
    );
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedEquipment(null);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="flex min-h-screen bg-[#07130d] text-white overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-black">🚜 Equipments</h1>
            <p className="text-white/40 mt-2 text-lg">
              Texnikalarni boshqarish paneli
            </p>
          </div>

          <button
            onClick={() => setOpenCreate(true)}
            className="bg-green-500 hover:bg-green-600 px-7 py-4 rounded-2xl font-bold"
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
                  {item.image ? (
                    <img
                      src={item.image}
                      className="h-64 w-full object-cover"
                      alt={item.name}
                    />
                  ) : (
                    <div className="h-64 w-full flex items-center justify-center bg-white/5 text-white/30">
                      No Image
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-2xl font-black">
                      {item.name}
                    </h2>

                    <p className="text-white/40">
                      {item.category}
                    </p>

                    {/* OPERATOR SELECT (FIXED) */}
                    <select
                      value={
                        item.operatorId
                          ? String(item.operatorId)
                          : ""
                      }
                      onChange={(e) =>
                        handleAssignOperator(
                          item.id,
                          e.target.value
                        )
                      }
                      className="w-full mt-4 bg-black/20 border border-white/10 rounded-2xl px-4 py-3"
                    >
                      <option value="">
                        Operator tanlang
                      </option>

                      {operators.map((op) => (
                        <option
                          key={op.id}
                          value={String(op.id)}
                        >
                          {op.name}
                        </option>
                      ))}
                    </select>

                    {/* ASSIGNED OPERATOR */}
                    {assignedOperator && (
                      <div className="mt-4 text-green-400">
                        👷 {assignedOperator.name}
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 bg-blue-500/20 py-2 rounded-xl hover:bg-blue-500/30"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-500/20 py-2 rounded-xl hover:bg-red-500/30"
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

      {/* MODALS */}
      <CreateEquipmentModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        refetch={fetchData}
      />

      <EditEquipmentModal
        isOpen={editOpen}
        onClose={handleCloseEdit}
        equipment={selectedEquipment}
        refetch={fetchData}
      />
    </div>
  );
}