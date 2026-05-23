"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "@/components/admin/AdminSidebar";
import CreateEquipmentModal from "@/components/admin/CreateEquipmentModal";

import {
  deleteEquipment,
  getEquipments,
} from "@/services/equipment.service";

import { Equipment } from "@/types/equipment.types";

type Operator = {
  id: number;
  name: string;
  status: "available" | "busy";
};

export default function AdminEquipmentsPage() {

  const [equipments, setEquipments] =
    useState<Equipment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openCreate, setOpenCreate] =
    useState(false);

  // OPERATORS
  const [operators] = useState<
    Operator[]
  >([
    {
      id: 1,
      name: "Ali Valiyev",
      status: "available",
    },

    {
      id: 2,
      name: "Bekzod Karimov",
      status: "busy",
    },

    {
      id: 3,
      name: "Jasur Xasanov",
      status: "available",
    },
  ]);

  // FETCH
  const fetchEquipments =
    async () => {
      try {

        setLoading(true);

        const data =
          await getEquipments();

        setEquipments(data);

      } catch (error) {

        toast.error(
          "Texnikalarni yuklab bo‘lmadi"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // DELETE
  const handleDelete =
    async (id: number) => {

      try {

        await deleteEquipment(id);

        toast.success(
          "Texnika o‘chirildi"
        );

        fetchEquipments();

      } catch (error) {

        toast.error(
          "Delete ishlamadi"
        );

      }
    };

  // ASSIGN OPERATOR
  const handleAssignOperator = (
    equipmentId: number,
    operatorId: number
  ) => {

    const updated =
      equipments.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              operatorId,
            }
          : item
      );

    setEquipments(updated);

    localStorage.setItem(
      "equipments",
      JSON.stringify(updated)
    );

    toast.success(
      "Operator biriktirildi"
    );
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
            onClick={() =>
              setOpenCreate(true)
            }
            className="bg-green-500 hover:bg-green-600 active:scale-[0.98] transition px-7 py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20"
          >
            + Add Equipment
          </button>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-white/40">
              Total Equipments
            </p>

            <h2 className="text-4xl font-black mt-3">
              {equipments.length}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-white/40">
              Operators
            </p>

            <h2 className="text-4xl font-black mt-3">
              {operators.length}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-white/40">
              Available
            </p>

            <h2 className="text-4xl font-black mt-3 text-green-400">
              {
                operators.filter(
                  (o) =>
                    o.status ===
                    "available"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* LIST */}
        {loading ? (

          <div className="flex items-center justify-center h-[400px] text-white/40 text-xl">
            Yuklanmoqda...
          </div>

        ) : equipments.length === 0 ? (

          <div className="border border-white/10 bg-white/5 rounded-3xl p-16 text-center text-white/40 text-lg">
            Hozircha texnika yo‘q
          </div>

        ) : (

          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-7">

            {equipments.map((item) => {

              const assignedOperator =
                operators.find(
                  (o) =>
                    o.id ===
                    item.operatorId
                );

              return (

                <div
                  key={item.id}
                  className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:border-green-500/30 hover:bg-white/[0.07] transition duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-sm font-semibold text-green-400">
                      ⭐ {item.rating}
                    </div>

                  </div>

                  {/* BODY */}
                  <div className="p-6">

                    {/* TITLE */}
                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h2 className="text-2xl font-black">
                          {item.name}
                        </h2>

                        <p className="text-white/40 mt-1">
                          {item.category}
                        </p>

                      </div>

                    </div>

                    {/* PRICES */}
                    <div className="grid grid-cols-3 gap-3 mt-6">

                      <div className="bg-black/20 rounded-2xl p-3 text-center">

                        <p className="text-white/40 text-xs">
                          Hour
                        </p>

                        <p className="font-bold text-green-400 mt-1">
                          ${item.pricePerHour}
                        </p>

                      </div>

                      <div className="bg-black/20 rounded-2xl p-3 text-center">

                        <p className="text-white/40 text-xs">
                          Day
                        </p>

                        <p className="font-bold text-green-400 mt-1">
                          ${item.pricePerDay}
                        </p>

                      </div>

                      <div className="bg-black/20 rounded-2xl p-3 text-center">

                        <p className="text-white/40 text-xs">
                          Month
                        </p>

                        <p className="font-bold text-green-400 mt-1">
                          ${item.pricePerMonth}
                        </p>

                      </div>

                    </div>

                    {/* INFO */}
                    <div className="mt-6 space-y-3">

                      <p className="text-white/50 text-sm">
                        📍 {item.location}
                      </p>

                      <p className="text-white/50 text-sm">
                        👷 Operator mavjud:{" "}
                        {item.operatorAvailable
                          ? "Ha"
                          : "Yo‘q"}
                      </p>

                    </div>

                    {/* OPERATOR */}
                    <div className="mt-6">

                      <p className="text-sm text-white/40 mb-2">
                        Operator biriktirish
                      </p>

                      <select
                        value={
                          item.operatorId ||
                          ""
                        }
                        onChange={(e) =>
                          handleAssignOperator(
                            item.id,
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
                      >

                        <option value="">
                          Operator tanlang
                        </option>

                        {operators.map(
                          (operator) => (

                            <option
                              key={
                                operator.id
                              }
                              value={
                                operator.id
                              }
                            >
                              {
                                operator.name
                              }
                            </option>

                          )
                        )}

                      </select>

                    </div>

                    {/* ASSIGNED */}
                    {assignedOperator && (

                      <div className="mt-5 inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-2xl text-sm">

                        👷{" "}
                        {
                          assignedOperator.name
                        }

                      </div>

                    )}

                    {/* DESCRIPTION */}
                    <p className="text-white/40 text-sm mt-5 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-7">

                      <button
                        className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-2xl transition font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-2xl transition font-semibold"
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
        onClose={() =>
          setOpenCreate(false)
        }
        refetch={fetchEquipments}
      />

    </div>
  );
}